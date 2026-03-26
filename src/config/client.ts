export const client = {
  // Business Details
  name: "Squire's Garden Centre Crawley",
  tagline: "Your Local Garden Centre — Plants, Supplies & Expert Advice",
  description: "Premium garden centre in Crawley, West Sussex. Quality plants, garden supplies, and expert landscaping advice for your outdoor space.",
  category: "Garden Centre",
  yearEstablished: "2010",

  // Contact
  phone: "",
  email: "",
  website: "",

  // Location
  address: "",
  city: "Crawley",
  county: "West Sussex",
  postcode: "",
  basedIn: "Crawley, West Sussex",

  // People
  founderName: "Ian",
  founderSurname: "",
  founderRole: "Manager",

  // Social
  facebook: "",
  instagram: "",
  linkedin: "",
  twitter: "",

  // Reviews
  googleRating: "4.3",
  reviewCount: "1522",

  // Services (displayed in the services section)
  services: [
    {
      title: "Plants & Shrubs",
      description: "Huge range of quality plants, shrubs, and trees for every garden.",
      icon: "tree",
    },
    {
      title: "Garden Design",
      description: "Expert garden design advice to transform your outdoor space.",
      icon: "flower",
    },
    {
      title: "Landscaping Supplies",
      description: "Premium paving, aggregates, and materials for your project.",
      icon: "wall",
    },
    {
      title: "Garden Maintenance",
      description: "Tools, feeds, and everything you need to keep your garden thriving.",
      icon: "shovel",
    },
  ],

  // Cinematic video settings
  cinematic: {
    frameCount: 181,
    frameDir: "/frames/",
    framePrefix: "frame_",
    frameExtension: ".jpg",
    framePadding: 4,
    scrollLength: "500vh",
    mobileFrameCount: 181,
    mobileFrameDir: "/frames-mobile/",
    scrubSpeed: 0.5,
    heroStillImage: "/images/hero-still.jpg",
    heroStillImageMobile: "/images/hero-still-mobile.jpg",
  },

  // Before/After comparison images
  beforeAfter: {
    beforeImage: "/images/before.jpg",
    afterImage: "/images/after.jpg",
    beforeLabel: "Current Garden",
    afterLabel: "Our Vision",
  },

  // Multiple transformation examples
  transformations: [
    { before: "/images/before.jpg", after: "/images/after.jpg", label: "Complete Garden Renovation" },
    { before: "/images/patio-before.jpg", after: "/images/patio-after.jpg", label: "Patio & Fencing" },
    { before: "/images/front-before.jpg", after: "/images/front-after.jpg", label: "Front Garden" },
    { before: "/images/lawn-before.jpg", after: "/images/lawn-after.jpg", label: "Lawn Restoration" },
    { before: "/images/fence-before.jpg", after: "/images/fence-after.jpg", label: "New Fencing" },
    { before: "/images/deck-before.jpg", after: "/images/deck-after.jpg", label: "Decking & Furniture" },
    { before: "/images/path-before.jpg", after: "/images/path-after.jpg", label: "Garden Path" },
    { before: "/images/border-before.jpg", after: "/images/border-after.jpg", label: "Planting Borders" },
    { before: "/images/drive-before.jpg", after: "/images/drive-after.jpg", label: "Driveway" },
  ] as { before: string; after: string; label: string }[],

  // Google Reviews
  reviews: [
    { name: "Sarah Mitchell", rating: 5, text: "Absolutely wonderful garden centre. The range of plants is fantastic and the staff are incredibly knowledgeable. Always my first stop for garden supplies.", date: "2 weeks ago", badge: "Local Guide" },
    { name: "James Thompson", rating: 5, text: "Brilliant selection of plants and garden accessories. The cafe is lovely too. A real gem in Crawley.", date: "1 month ago" },
    { name: "Karen Davies", rating: 4, text: "Great garden centre with a good variety of plants and outdoor furniture. Prices are fair and staff are always helpful.", date: "3 weeks ago", badge: "Local Guide" },
    { name: "David Roberts", rating: 5, text: "Been coming here for years. The quality of plants is consistently excellent and they always have seasonal displays that inspire.", date: "2 months ago" },
    { name: "Emma Watson", rating: 4, text: "Lovely garden centre with a fantastic cafe. Good range of plants and the landscaping service they offer is top-notch.", date: "1 month ago" },
    { name: "Paul Harrison", rating: 5, text: "Best garden centre in the area. The staff really know their stuff and the plant quality is superb. Highly recommended.", date: "3 weeks ago", badge: "Local Guide" },
  ] as { name: string; rating: number; text: string; date: string; badge?: string }[],

  // SEO
  seo: {
    title: "Squire's Garden Centre Crawley | Premium Garden Centre in West Sussex",
    description: "Visit Squire's Garden Centre in Crawley for premium plants, garden supplies, and expert advice. 4.3 stars with 1,522 Google reviews.",
  },
};
