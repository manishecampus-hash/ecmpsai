import { MongoClient, Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient | null = null;

export async function getDb(): Promise<Db> {
  if (!client) {
    const MONGODB_URI =
      process.env.MONGODB_URI ||
      "mongodb+srv://ab_db_user:Thegreat123@cluster0.8uk6wfy.mongodb.net/?appName=Cluster0";

    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClient) {
        global._mongoClient = new MongoClient(MONGODB_URI);
      }
      client = global._mongoClient;
    } else {
      client = new MongoClient(MONGODB_URI);
    }
  }

  await client.connect();
  return client.db("ecampus");
}
