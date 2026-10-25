// scripts/migrate-web-users.js
const { MongoClient } = require("mongodb");
const { randomUUID } = require("crypto");
const fs = require("fs");

if (fs.existsSync(".env")) {
  const content = fs.readFileSync(".env", "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://ab_db_user:Thegreat123@cluster0.8uk6wfy.mongodb.net/?appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB.");

    const db = client.db("ecampus");
    const webUsersCol = db.collection("web_users");
    const usersCol = db.collection("users");
    const leadsCol = db.collection("leads");

    const webUsersCount = await webUsersCol.countDocuments();
    console.log(`Found ${webUsersCount} records in 'web_users'.`);

    if (webUsersCount === 0) {
      console.log("No web_users to migrate.");
      return;
    }

    const cursor = webUsersCol.find({});
    let usersInserted = 0;
    let usersUpdated = 0;
    let leadsInserted = 0;

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      if (!doc) continue;

      const phone = (doc.phone || "").toString().trim();
      const email = (doc.email || "").toString().trim().toLowerCase();
      const name = (doc.name || "").toString().trim();
      const courses = doc.coursesInterested || (doc.course ? [doc.course] : []);
      const course = doc.course || courses[0] || "";
      const state = doc.state || "";
      const now = new Date();
      const createdAt = doc.createdAt ? new Date(doc.createdAt) : now;

      // 1. Backfill into 'users' collection if not present
      const userFilter =
        phone && email
          ? { $or: [{ phone_e164: phone }, { email }] }
          : phone
          ? { phone_e164: phone }
          : email
          ? { email }
          : null;

      if (userFilter) {
        const existingUser = await usersCol.findOne(userFilter);
        if (!existingUser) {
          await usersCol.insertOne({
            id: randomUUID(),
            phone_e164: phone || null,
            phone_verified_at: doc.phoneVerified ? createdAt : null,
            email: email || null,
            email_verified_at: email ? createdAt : null,
            password_hash: null,
            full_name: name,
            status: phone ? "ACTIVE" : "PENDING_PHONE_VERIFICATION",
            failed_login_attempts: 0,
            locked_until: null,
            last_login_at: createdAt,
            created_at: createdAt,
            updated_at: now,
            state,
            coursesInterested: courses,
            course_interested: courses,
            course,
            advisorProfile: doc.advisorProfile || undefined,
            spinReward: doc.spinReward || undefined,
            spinSkipped: Boolean(doc.spinSkipped) || undefined,
          });
          usersInserted++;
        } else {
          // Update profile fields if missing in existingUser
          const updateFields = {};
          if (!existingUser.full_name && name) updateFields.full_name = name;
          if (!existingUser.state && state) updateFields.state = state;
          if ((!existingUser.coursesInterested || existingUser.coursesInterested.length === 0) && courses.length > 0) {
            updateFields.coursesInterested = courses;
            updateFields.course_interested = courses;
          }
          if (!existingUser.advisorProfile && doc.advisorProfile) updateFields.advisorProfile = doc.advisorProfile;
          if (!existingUser.spinReward && doc.spinReward) updateFields.spinReward = doc.spinReward;

          if (Object.keys(updateFields).length > 0) {
            updateFields.updated_at = now;
            await usersCol.updateOne({ id: existingUser.id }, { $set: updateFields });
            usersUpdated++;
          }
        }
      }

      // 2. Backfill into 'leads' collection
      const leadFilter =
        phone && email
          ? { $or: [{ phone }, { email }] }
          : phone
          ? { phone }
          : email
          ? { email }
          : null;

      if (leadFilter) {
        const existingLead = await leadsCol.findOne(leadFilter);
        if (!existingLead) {
          await leadsCol.insertOne({
            id: randomUUID(),
            name,
            email,
            phone,
            course,
            coursesInterested: courses,
            state,
            source: doc.source || "Website Signup / Migration",
            referralCode: doc.referralCode || "",
            whatsappOptIn: Boolean(doc.whatsappOptIn),
            advisorProfile: doc.advisorProfile || undefined,
            status: "new",
            created_at: createdAt,
            updated_at: now,
          });
          leadsInserted++;
        }
      }
    }

    console.log(`\nMigration completed successfully:`);
    console.log(`- New users inserted into 'users': ${usersInserted}`);
    console.log(`- Existing users updated in 'users': ${usersUpdated}`);
    console.log(`- Leads inserted into 'leads': ${leadsInserted}`);
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await client.close();
  }
}

run();
