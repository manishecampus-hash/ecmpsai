// Student video testimonials for the home page "What Our Students Say" section.
// The first three cards are eCampus counsellors with their own photos and videos (public/counselor, public/videos/stories).
// PLACEHOLDER CONTENT: the other names, and all quotes and ratings, are samples, and the other cards play the same
// free stock clip from Mixkit (mixkit.co, Mixkit License). Replace each entry with real details before launch.

export type StudentStoryTag = { emoji: string; label: string };

export type StudentStoryT = {
  id: string;
  name: string;
  program: string;
  photo: string;
  /** Not shown on counsellor cards */
  rating?: number;
  tags: StudentStoryTag[];
  quote: string;
  videoSrc: string;
  /** CSS object-position that keeps the speaker in frame when the video is cropped to portrait */
  videoPosition?: string;
  /** Still from the video: shown before it plays and, blurred, behind a portrait video in the wide player */
  videoPoster?: string;
  /** Counsellor cards get a counsellor seal and label instead of the student ones */
  kind?: "student" | "counsellor";
  /** Shown on counsellor cards in place of the programme, rating and tags */
  experience?: string;
};

const SAMPLE_CLIPS = [{ videoSrc: "/videos/student-story-classroom.mp4", videoPosition: "50% 50%" }];
const PHOTOS = ["/graduates/priyanshu-mishra.png", "/graduates/priya.png", "/graduates/marcus.png"];

const photo = (i: number) => PHOTOS[i % PHOTOS.length];
const clip = (i: number) => SAMPLE_CLIPS[i % SAMPLE_CLIPS.length];

// TODO: the quotes on the three counsellor cards are placeholders — replace them with lines from their videos.
export const STUDENT_STORIES: StudentStoryT[] = [
  {
    id: "rohini-tripathi",
    name: "Rohini Tripathi",
    kind: "counsellor",
    program: "Admission Counsellor",
    experience: "2.5 years experience",
    photo: "/counselor/cards/rohini.webp",
    tags: [],
    quote:
      "Tell me what you want from your career and I'll help you compare approvals, fees and support across universities before you decide.",
    videoSrc: "/videos/stories/rohini.mp4",
    videoPoster: "/videos/stories/rohini.jpg",
  },
  {
    id: "swati-pal",
    name: "Swati Pal",
    kind: "counsellor",
    program: "Admission Counsellor",
    experience: "2 years experience",
    photo: "/counselor/cards/swati.webp",
    tags: [],
    quote:
      "My job is to make the choice simple: which universities are UGC-entitled, what fits your budget, and how to apply without any stress.",
    videoSrc: "/videos/stories/swati.mp4",
    videoPoster: "/videos/stories/swati.jpg",
  },
  {
    id: "abdul-umair-khan",
    name: "Abdul Umair Khan",
    kind: "counsellor",
    program: "Admission Counsellor",
    experience: "1 year experience",
    photo: "/counselor/cards/umair.webp",
    tags: [],
    quote:
      "I stay with you from the first call to admission, answering every question about documents, exams and fees along the way.",
    videoSrc: "/videos/stories/umair.mp4",
    videoPoster: "/videos/stories/umair.jpg",
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
