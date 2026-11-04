// Video stories for the home page "What Our Students Say" section.
// For now these are the five eCampus counsellors, with their own photos and videos (public/counselor,
// public/videos/stories). Student stories can be added back to this list later.

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
  /** Still from the video, shown before it plays */
  videoPoster?: string;
  /** Pre-blurred copy of the still that fills the sides behind a portrait video (a file, not a CSS blur,
      so nothing has to be re-blurred while the video plays) */
  videoBackdrop?: string;
  /** Counsellor cards get a counsellor seal and label instead of the student ones */
  kind?: "student" | "counsellor";
  /** Shown on counsellor cards in place of the programme, rating and tags */
  experience?: string;
};


// TODO: the quotes on the five counsellor cards are placeholders — replace them with lines from their videos.
export const STUDENT_STORIES: StudentStoryT[] = [
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
    videoBackdrop: "/videos/stories/swati-bg.jpg",
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
    videoBackdrop: "/videos/stories/umair-bg.jpg",
  },
  {
    id: "anita",
    name: "Anita Rawat",
    kind: "counsellor",
    program: "Admission Counsellor",
    experience: "5+ years experience",
    photo: "/counselor/cards/anita.webp",
    tags: [],
    quote:
      "From comparing universities to finishing your application, I walk you through each step so you always know what comes next.",
    videoSrc: "/videos/stories/anita.mp4",
    videoPoster: "/videos/stories/anita.jpg",
    videoBackdrop: "/videos/stories/anita-bg.jpg",
  },
  {
    id: "abhishek",
    name: "Abhishek Raj",
    kind: "counsellor",
    program: "Admission Counsellor",
    experience: "6+ years experience",
    photo: "/counselor/cards/abhishek.webp",
    tags: [],
    quote:
      "I look at your background, budget and goals first, then shortlist the online programmes that genuinely fit, with no pressure to decide.",
    videoSrc: "/videos/stories/abhishek.mp4",
    videoPoster: "/videos/stories/abhishek.jpg",
    videoBackdrop: "/videos/stories/abhishek-bg.jpg",
  },
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
    videoBackdrop: "/videos/stories/rohini-bg.jpg",
  },
];
