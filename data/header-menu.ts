import {
  FileBadge,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Layers3,
  Landmark,
} from "lucide-react";

export const categories = [
  {
    id: "iim",
    label: "IIM Certification Courses",
    Icon: FileBadge,
    courses: [
      {
        tag: "Certification",
        href: "/programs/certification/iim-k-hr",
        name: "IIM K – HR Management & Analytics",
        duration: "8 Months",
      },
      {
        tag: "Certification",
        href: "/programs/certification/iim-k-ai",
        name: "IIM K – AI Professional Certificate",
        duration: "6 Months",
      },
    ],
  },
  {
    id: "dba",
    label: "Online Doctorate (DBA)",
    Icon: GraduationCap,
    courses: [
      {
        tag: "Doctorate",
        href: "/programs/doctorate/birchwood",
        name: "Birchwood University",
        duration: "3 Years",
        image: "/doctorate/birchwood-logo.webp",
      },
      {
        tag: "Doctorate",
        name: "EIMT",
        duration: "3 Years",
        href: "/programs/doctorate/eimt",
        image: "/doctorate/eimt_logo.webp",
      },
      {
        tag: "Doctorate",
        name: "Swiss School of Business and Management",
        duration: "3 Years",
        href: "/programs/doctorate/ssbm",
        image: "/doctorate/Logo 56x56_SSBM.svg",
      },
      {
        tag: "Doctorate",
        name: "Ecole de Commerce International (ESGCI)",
        duration: "3 Years",
        href: "/programs/doctorate/esgci",
        image: "/doctorate/ESGCI.svg",
      },
      {
        tag: "Doctorate",
        name: "Rushford Business School",
        duration: "3 Years",
        href: "/programs/doctorate/rushford",
        image: "/doctorate/Rushford.svg",
      },
      {
        tag: "Doctorate",
        name: "Edgewood",
        duration: "3 Years",
        href: "/programs/doctorate/edgewood",
        image: "/doctorate/EdgewoodUnisvgFINAL.svg",
      },
      {
        tag: "Doctorate",
        name: "Golden Gate University",
        duration: "3 Years",
        href: "/programs/doctorate/ggu",
        image: "/doctorate/GGU.svg",
      },
      {
        tag: "Doctorate",
        name: "Woolf University",
        duration: "3 Years",
        href: "/programs/doctorate/woolf",
        image: "/doctorate/woolf.png",
      },
      {
        tag: "Doctorate",
        name: "LSMT University",
        duration: "3 Years",
        href: "/programs/doctorate/lsmt",
        image: "/doctorate/lsmt_logo.webp",
      },
    ],
  },
  {
    id: "ug",
    label: "Online UG Courses",
    Icon: BookOpenCheck,
    courses: [
      {
        tag: "Undergraduate",
        name: "B.Com – Accounting & Finance",
        duration: "3 Years",
        href: "/programs/bcom",
        image: "/header-courses/accounting.png",
      },
      {
        tag: "Undergraduate",
        name: "BBA – Business Administration",
        duration: "3 Years",
        href: "/programs/bba",
        image: "/header-courses/businessman.png",
      },
      {
        tag: "Undergraduate",
        name: "B.Sc Computer Science",
        duration: "3 Years",
        href: "/programs/bsc",
        image: "/header-courses/data-science.png",
      },
      {
        tag: "Undergraduate",
        name: "BA – Psychology & Sociology",
        duration: "3 Years",
        href: "/programs/ba",
        image: "/header-courses/intelligence.png",
      },
    ],
  },
  {
    id: "pg",
    label: "Online PG Courses",
    Icon: Layers3,
    courses: [
      {
        tag: "Postgraduate",
        name: "MBA",
        duration: "2 Years",
        href: "/programs/mba",
      },
      {
        tag: "Postgraduate",
        name: "M.Com",
        duration: "2 Years",
        href: "/programs/mcom",
      },
      {
        tag: "Postgraduate",
        name: "MCA",
        duration: "2 Years",
        href: "/programs/mca",
      },
      {
        tag: "Postgraduate",
        name: "MA",
        duration: "2 Years",
        href: "/programs/ma-hr-organisational-psychology",
      },
      {
        tag: "Postgraduate",
        name: "M.Sc",
        duration: "2 Years",
        href: "/programs/msc-data-science",
      },
    ],
  },
  {
    id: "offline",
    label: "Offline Certification Courses",
    Icon: Building2,
    courses: [
      {
        tag: "Certification",
        name: "Digital Marketing & AI Course",
        duration: "6 Months",
        href: "/programs/offline-certification/digital-marketing-ai",
      },
      {
        tag: "Certification",
        name: "Ecommerce Business Course",
        duration: "4 Months",
        href: "/programs/offline-certification/ecommerce-business",
      },
    ],
  },
  {
    id: "exec",
    label: "1 Year Executive Program",
    Icon: BriefcaseBusiness,
    courses: [
      {
        tag: "Executive",
        name: "1 Year MBA from O.P. Jindal Global University",
        duration: "12 Months",
      },
      {
        tag: "Executive",
        name: "1 Year M.Sc from O.P. Jindal Global University",
        duration: "12 Months",
      },
      {
        tag: "Executive",
        name: "1.5 Year MBA From Liverpool Business School",
        duration: "12 Months",
      },
      {
        tag: "Executive",
        name: "1 Year MBA from Golden Gate University",
        duration: "12 Months",
      },
      {
        tag: "Executive",
        name: "1 Year MBA From Edgewood University",
        duration: "12 Months",
      },
      {
        tag: "Executive",
        name: "1 Year MBA in Business & Law from O.P. Jindal Global University",
        duration: "13 Months",
      },
    ],
  },
  {
    id: "uni",
    label: "Universities",
    Icon: Landmark,
    courses: [
      {
        tag: "University",
        name: "Amity University",
        duration: "Multiple",
      },
      {
        tag: "University",
        name: "Manipal University",
        duration: "Multiple",
      },
      {
        tag: "University",
        name: "Jain University",
        duration: "Multiple",
      },
      {
        tag: "University",
        name: "Chandigarh University",
        duration: "Multiple",
      },
      {
        tag: "University",
        name: "GLA University",
        duration: "Multiple",
      },
      {
        tag: "University",
        name: "D.Y Patil Vidyapeeth University",
        duration: "Multiple",
      },
      {
        tag: "University",
        name: "Mangalayatan University",
        duration: "Multiple",
      },
      {
        tag: "University",
        name: "Andhra University",
        duration: "Multiple",
      },
    ],
  },
];
