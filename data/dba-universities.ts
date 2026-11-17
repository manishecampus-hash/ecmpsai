/**
 * DBA partner universities, in display order. Used by the "Top Online Universities"
 * cards and the "Top Global University Partners" logo strip on the DBA landing page.
 */
export interface DbaUniversity {
  slug: string;
  name: string;
  location: string;
  usp: string;
  accreditation: string;
  logo: string;
  artwork: string;
}

export const DBA_UNIVERSITIES: DbaUniversity[] = [
  {
    slug: "golden-gate-university",
    name: "Golden Gate University (GGU)",
    location: "California, USA",
    usp: "Industry-Experienced Faculty",
    accreditation: "AACSB Accredited",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/3.svg",
    artwork: "https://images.unsplash.com/photo-1741636371515-8ce169441e2a?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "paris-american-international-university",
    name: "Paris American International University (PAIU)",
    location: "Paris, France",
    usp: "Flexible Study Options",
    accreditation: "QUALIOPI Certified",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/4.svg",
    artwork: "https://images.unsplash.com/photo-1763615834709-cd4b196980db?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "rushford-business-school",
    name: "Rushford Business School",
    location: "Switzerland",
    usp: "Best Industry Mentorship",
    accreditation: "EDUQUA Certified",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/2.svg",
    artwork: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "london-school-of-management",
    name: "London School of Management & Technology (LSMT)",
    location: "London, UK",
    usp: "Industry-Relevant Curriculum",
    accreditation: "QAHE Accredited",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/6.svg",
    artwork: "https://images.unsplash.com/photo-1771322159307-f4ecd79d8263?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "esgci",
    name: "Ecole de Commerce International (ESGCI)",
    location: "Paris, France",
    usp: "30 Years of Educational Experience",
    accreditation: "IACBE Accredited",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/5.svg",
    artwork: "https://images.unsplash.com/photo-1777202740019-5340f67184f8?auto=format&fit=crop&w=800&q=70",
  },
];
