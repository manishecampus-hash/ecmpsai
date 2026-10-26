// Student video testimonials for the home page "What Our Students Say" section.
// PLACEHOLDER CONTENT: names, quotes and ratings below are samples, and every card plays the same free stock
// clip from Mixkit (mixkit.co, Mixkit License). Replace each entry with a
// real student's details and their own video before launch.

export type StudentStoryTag = { emoji: string; label: string };

export type StudentStoryT = {
  id: string;
  name: string;
  program: string;
  photo: string;
  rating: number;
  tags: StudentStoryTag[];
  quote: string;
  videoSrc: string;
  /** CSS object-position that keeps the speaker in frame when the video is cropped to portrait */
  videoPosition?: string;
};

const SAMPLE_CLIPS = [{ videoSrc: "/videos/student-story-classroom.mp4", videoPosition: "50% 50%" }];
const PHOTOS = ["/graduates/priyanshu-mishra.png", "/graduates/priya.png", "/graduates/marcus.png"];

const photo = (i: number) => PHOTOS[i % PHOTOS.length];
const clip = (i: number) => SAMPLE_CLIPS[i % SAMPLE_CLIPS.length];

export const STUDENT_STORIES: StudentStoryT[] = [
  {
    id: "rohit-sharma",
    name: "Rohit Sharma",
    program: "Online MBA · Batch of 2025",
    photo: photo(0),
    rating: 4.9,
    tags: [
      { emoji: "🎯", label: "Clear guidance" },
      { emoji: "💼", label: "Career growth" },
      { emoji: "⏰", label: "Flexible classes" },
    ],
    quote:
      "I was working full-time and didn't know which online MBA was actually worth it. My eCampus counsellor compared approvals, fees and placement support with me, and I enrolled the same week.",
    ...clip(0),
  },
  {
    id: "ananya-gupta",
    name: "Ananya Gupta",
    program: "Online BBA · Batch of 2025",
    photo: photo(1),
    rating: 4.8,
    tags: [
      { emoji: "🤝", label: "Honest advice" },
      { emoji: "💸", label: "Easy EMI" },
    ],
    quote:
      "Everyone told me different things about online degrees. eCampus showed me which universities are UGC-entitled and helped me pick a programme that fits my budget.",
    ...clip(1),
  },
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    program: "Online MCA · Batch of 2024",
    photo: photo(2),
    rating: 4.8,
    tags: [
      { emoji: "🚀", label: "Upskilling" },
      { emoji: "🧭", label: "Right specialisation" },
      { emoji: "✅", label: "Quick admission" },
    ],
    quote:
      "I wanted to move into AI roles. The AI Degree Finder narrowed it down to three MCA programmes and my advisor handled the whole admission process.",
    ...clip(2),
  },
  {
    id: "vikas-yadav",
    name: "Vikas Yadav",
    program: "Online M.Com · Batch of 2025",
    photo: photo(0),
    rating: 4.7,
    tags: [
      { emoji: "📚", label: "Study at my pace" },
      { emoji: "💡", label: "Clarity" },
    ],
    quote:
      "Comparing fees across universities used to take me days. Here I saw everything side by side and got my questions answered in one call.",
    ...clip(3),
  },
  {
    id: "sneha-kapoor",
    name: "Sneha Kapoor",
    program: "Online MA · Batch of 2024",
    photo: photo(1),
    rating: 4.9,
    tags: [
      { emoji: "🌟", label: "Supportive" },
      { emoji: "🏅", label: "Scholarship help" },
      { emoji: "🙌", label: "No pressure" },
    ],
    quote:
      "My counsellor never pushed a university on me. She explained the scholarship options and let me decide, which is exactly what I needed.",
    ...clip(4),
  },
  {
    id: "daniel-joseph",
    name: "Daniel Joseph",
    program: "Online MBA · Batch of 2024",
    photo: photo(2),
    rating: 4.6,
    tags: [
      { emoji: "📈", label: "Promotion" },
      { emoji: "🎓", label: "Recognised degree" },
    ],
    quote:
      "I needed a recognised degree for my next promotion. eCampus made the comparison simple and the follow-ups after admission were really helpful.",
    ...clip(5),
  },
  {
    id: "karan-malhotra",
    name: "Karan Malhotra",
    program: "Online BCA · Batch of 2025",
    photo: photo(0),
    rating: 4.8,
    tags: [
      { emoji: "💻", label: "Tech career" },
      { emoji: "🧾", label: "Transparent fees" },
      { emoji: "⚡", label: "Fast replies" },
    ],
    quote:
      "After 12th I was confused between regular and online BCA. The team explained the pros and cons honestly and I'm now in my second semester.",
    ...clip(6),
  },
  {
    id: "pooja-singh",
    name: "Pooja Singh",
    program: "Online MBA · Batch of 2025",
    photo: photo(1),
    rating: 4.9,
    tags: [
      { emoji: "👩‍💼", label: "Work + study" },
      { emoji: "🎯", label: "Goal focused" },
    ],
    quote:
      "Balancing a job and studies felt impossible until my advisor found a programme with weekend live classes. The whole process took less than a week.",
    ...clip(7),
  },
  {
    id: "rahul-verma",
    name: "Rahul Verma",
    program: "Online M.Sc · Batch of 2024",
    photo: photo(2),
    rating: 4.7,
    tags: [
      { emoji: "🔍", label: "Deep research" },
      { emoji: "🤗", label: "Friendly team" },
      { emoji: "📞", label: "Always reachable" },
    ],
    quote:
      "They answered every small doubt I had about exams, documents and fees. It felt like having a senior who has already been through it.",
    ...clip(8),
  },
  {
    id: "aman-chauhan",
    name: "Aman Chauhan",
    program: "Online BBA · Batch of 2025",
    photo: photo(0),
    rating: 4.8,
    tags: [
      { emoji: "🧠", label: "Smart choice" },
      { emoji: "💸", label: "Budget friendly" },
    ],
    quote:
      "I compared five universities in one place and found one with a scholarship I didn't even know about. Saved money and time.",
    ...clip(9),
  },
];
