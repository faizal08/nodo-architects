// All projects. Add a new object to add a new project page automatically.
export const projects = [
  {
    slug: 'cake-and-co',
    title: 'Cake & Co.',
    category: 'Interior',
    type: 'Café Interior',
    year: 'Interior',
    location: 'Café & Patisserie',
    cover: '/images/cake-co-counter.webp',
    thumb: '/images/cake-co-table.webp',
    accent: '#5f1b1a',
    lede: 'A warm and welcoming café designed with natural textures, soft lighting and comfortable seating.',
    narrative: [
      'A warm and welcoming café designed with natural textures, soft lighting and comfortable seating. The rustic stone walls, flowing ceiling fabric, rich burgundy seating and warm lights create a cosy and relaxing atmosphere.',
      'Every detail is thoughtfully designed to make the space pleasant and inviting, creating a lovely place to enjoy cakes, coffee and good moments.',
    ],
    specs: [
      ['Type', 'Café Interior'],
      ['Mood', 'Sophisticated, warm & sweet'],
      ['Palette', 'Deep burgundy & warm neutrals'],
      ['Materials', 'Rustic stone, draped fabric, velvet, marble'],
    ],
    palette: ['#edd9c9', '#bda790', '#daa190', '#5f1b1a', '#ead4bc'],
    gallery: [
      { src: '/images/cake-co-counter.webp', caption: 'The counter — burgundy fluting under a draped fabric sky' },
      { src: '/images/cake-co-overhead.webp', caption: 'From above — tables tucked along the stone wall' },
      { src: '/images/cake-co-entrance.webp', caption: 'Looking back to the street entrance' },
      { src: '/images/cake-co-table.webp', caption: 'Candlelight, daisies and marble' },
    ],
    board: '/images/cake-co-moodboard.webp',
    featured: true,
  },
  {
    slug: 'maqbool-residence',
    title: 'Maqbool Residence',
    category: 'Residential',
    type: 'Private Residence',
    year: '2023',
    location: 'Malappuram, Kerala',
    cover: '/images/maqbool-residence.webp',
    thumb: '/images/maqbool-residence.webp',
    accent: '#a4512a',
    lede: 'A home that celebrates its natural surroundings and creates a seamless connection with the outdoors.',
    narrative: [
      'A home that celebrates its natural surroundings and creates a seamless connection with the outdoors. Clean lines, minimalist furniture, and a neutral colour palette provide a sophisticated modern feel, tailored for contemporary living.',
      'Natural materials like wood and stone plastering finishes are applied throughout the exterior to ensure a cohesive, grounded look. Large windows are strategically placed to blur the lines between indoors and outdoors, bringing in abundant natural light and fostering a constant, peaceful connection with nature.',
    ],
    specs: [
      ['Location', 'Malappuram, Kerala'],
      ['Year', '2023'],
      ['Area', '2300 sq ft'],
      ['Status', 'Completed'],
    ],
    gallery: [{ src: '/images/maqbool-residence.webp', caption: 'Street elevation — stone, timber and layered volumes' }],
  },
  {
    slug: 'ayurveda-medical-college',
    title: 'Ayurveda Medical College',
    category: 'Institutional',
    type: 'Academic / Thesis',
    year: 'Thesis',
    location: 'Pantheerankavu, Calicut',
    cover: '/images/ayurveda-college.webp',
    thumb: '/images/ayurveda-college.webp',
    accent: '#a4512a',
    lede: 'Integrating ancient wisdom with contemporary clinical precision on a 19-acre campus.',
    narrative: [
      'Ayurveda is a system of medicine evolved in India around 600 BC. It eliminates toxic imbalances from the body and helps build resistance and maintain good health. It is a holistic approach where the mind and the body are viewed as a single entity.',
      'Proposed in Pantheerankavu, Calicut, the goal is to design an ayurvedic medical college which will boost local economy and tourism. The design provides improved and natural health care facilities while delivering highly skilled practitioners to society, integrating ancient wisdom with contemporary clinical precision.',
    ],
    specs: [
      ['Location', 'Pantheerankavu, Calicut'],
      ['Category', 'Academic / Thesis'],
      ['Site Area', '19 Acres'],
      ['Philosophy', 'Positive Distractions'],
    ],
    gallery: [{ src: '/images/ayurveda-college.webp', caption: 'Aerial view — courtyards and tiled roofs set into green' }],
  },
  {
    slug: 'calicut-mobility-hub',
    title: 'Calicut Mobility Hub',
    category: 'Urban',
    type: 'Transit-Oriented Development',
    year: 'Concept',
    location: 'Malaparamba, Calicut',
    cover: '/images/mobility-hub-view.webp',
    thumb: '/images/mobility-hub-plan.webp',
    accent: '#3d6b6a',
    lede: 'Linking monorail, buses, auto-taxis and bicycles into one seamless journey through the city.',
    narrative: [
      'Calicut Mobility Hub is a Transit-Oriented Development designed as a solution for existing transportation challenges. Through the redevelopment and reimagining of transit infrastructure, the project aims to create a transport-friendly environment that prioritizes public convenience.',
      'The design creates a comfortable traveling experience by seamlessly linking different modes of transport — including monorail, buses, auto-taxis, and bicycles. This integration enables safe, secure movement and improves overall accessibility throughout the city.',
    ],
    specs: [
      ['Location', 'Malaparamba, Calicut'],
      ['Category', 'Academic Design (S9)'],
      ['Focus', 'Transit Integration'],
      ['Status', 'Conceptual Design'],
    ],
    gallery: [
      { src: '/images/mobility-hub-plan.webp', caption: 'Site plan along the NH 66 bypass' },
      { src: '/images/mobility-hub-view.webp', caption: 'Elevated walkway linking terminal and platforms' },
    ],
  },
]

export const categories = ['All', ...new Set(projects.map((p) => p.category))]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
export const nextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
