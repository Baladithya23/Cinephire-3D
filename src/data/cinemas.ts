import { Cinema, Movie, ShowtimeSlot, CityOption } from '../types/cinema';

export const SUPPORTED_CITIES: CityOption[] = [
  {
    id: 'vijayawada',
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    isDefault: true,
    theatresCount: 9,
    status: 'active'
  },
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    theatresCount: 14,
    status: 'coming_soon'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    theatresCount: 42,
    status: 'coming_soon'
  },
  {
    id: 'guntur',
    name: 'Guntur',
    state: 'Andhra Pradesh',
    theatresCount: 8,
    status: 'coming_soon'
  },
  {
    id: 'tirupati',
    name: 'Tirupati',
    state: 'Andhra Pradesh',
    theatresCount: 6,
    status: 'coming_soon'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    theatresCount: 56,
    status: 'coming_soon'
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    theatresCount: 38,
    status: 'coming_soon'
  }
];

export const VIJAYAWADA_CINEMAS: Cinema[] = [
  {
    id: 'inox-laila-mall',
    name: 'INOX Laila Mall',
    shortName: 'INOX Laila',
    brand: 'INOX',
    address: '4th floor, Laila Mall, near Punnammathota, MG Road, Vijayawada 520010',
    locality: 'MG Road',
    connectedLocalities: ['MG Road', 'Punnammathota'],
    postalCode: '520010',
    floorInfo: '4th Floor',
    
    screenCount: 3,
    screenCountStatus: 'verified',
    screenCountNote: '3 auditoriums verified from multiplex launch data',

    seatingCapacity: 959,
    seatingCapacityStatus: 'verified',
    seatingCapacityNote: '959 seats in total across 3 screens',

    soundSystem: 'Dolby Atmos (All 3 Screens)',
    soundSystemStatus: 'verified',
    hasDolbyAtmos: true,
    hasImax: false,

    projectionAnd3D: 'Laser projection with Volfoni Smart Crystal Diamond 3D',
    projectionStatus: 'verified',
    has3D: true,

    recliners: {
      available: false,
      description: 'Information unavailable (no recliner count or availability verified in source)',
      verification: 'missing'
    },

    amenities: [
      'Parking',
      'Food & Beverages',
      'Digital Payments',
      'Mobile Tickets',
      'Full AC',
      'Laser Projection'
    ],
    languages: ['Telugu', 'English'],

    pricingEstimate: {
      regularRange: '₹150 – ₹250',
      reclinerRange: 'Information unavailable',
      specialReleaseRange: '₹377 – ₹495 (Peak/Blockbuster)',
      note: 'Demo sample pricing only. Slabs follow AP municipal guideline baseline; exact live ticket rates determined at checkout.'
    },

    coordinates: {
      lat: 16.5062,
      lng: 80.6480,
      isVerified: true,
      mapNotes: 'Laila Mall on MG Road near Punnammathota'
    },
    googleMapsQuery: 'INOX Laila Mall, MG Road, Punnammathota, Vijayawada',
    backgroundInfo: "INOX's third multiplex in Vijayawada, offering state-of-the-art laser projection and full Dolby Atmos sound on all screens.",
    auditNotes: 'Verified: 3 screens, 959 seats, Dolby Atmos (all screens), Volfoni 3D, Laser. Unverified/Missing: Recliner seating.',
    heroImage: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
    rating: 4.6,
    reviewCount: 3420
  },
  {
    id: 'capital-cinemas-trendset',
    name: 'Capital Cinemas, Trendset Mall',
    shortName: 'Capital Cinemas',
    brand: 'Capital Cinemas',
    address: 'Trendset Mall, MG Road, opposite HDFC Bank, Kala Nagar, Benz Circle, Vijayawada 520010',
    locality: 'Kala Nagar',
    connectedLocalities: ['Kala Nagar', 'Benz Circle', 'MG Road'],
    postalCode: '520010',
    floorInfo: 'Upper Level Entertainment Zone',

    screenCount: 6,
    screenCountStatus: 'verified',
    screenCountNote: '6-screen modern multiplex',

    seatingCapacity: null,
    seatingCapacityStatus: 'missing',
    seatingCapacityNote: 'Total seating capacity not found in official reference doc',

    soundSystem: 'Dolby Atmos',
    soundSystemStatus: 'verified',
    hasDolbyAtmos: true,
    hasImax: false, // Early construction reports hinted at IMAX, but no operational IMAX screen exists

    projectionAnd3D: '3D, crystal-clear projection',
    projectionStatus: 'verified',
    has3D: true,

    recliners: {
      available: true,
      count: 108,
      description: '108 luxury recliners with push-back mechanism',
      verification: 'verified'
    },

    amenities: [
      'Luxury Recliners',
      'Push-back Seats',
      'Free Wi-Fi',
      'Full AC',
      'Parking',
      'Food & Beverages',
      'Digital Payments',
      'Mobile Tickets'
    ],
    languages: ['Telugu', 'Hindi'],

    pricingEstimate: {
      regularRange: '₹150 – ₹250',
      reclinerRange: '₹350 – ₹495',
      specialReleaseRange: 'Up to ₹600 (Major First-Day Releases)',
      note: 'Demo sample rates. Real-time rates fetched dynamically from theatre API.'
    },

    coordinates: {
      lat: 16.5015,
      lng: 80.6558,
      isVerified: true,
      mapNotes: 'Trendset Mall, Benz Circle / Kala Nagar junction'
    },
    googleMapsQuery: 'Capital Cinemas, Trendset Mall, Benz Circle, Vijayawada',
    backgroundInfo: 'One of Vijayawada’s premier multiplexes, operating since 2015. Features 6 screens with dedicated luxury recliner rows.',
    auditNotes: 'Verified: 6 screens, Dolby Atmos, 3D, 108 luxury recliners, Free Wi-Fi. Missing: Total seat count. Note on IMAX: No IMAX confirmed; do not market as IMAX.',
    heroImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
    rating: 4.7,
    reviewCount: 5210
  },
  {
    id: 'pvr-ripples-mall',
    name: 'PVR Ripples Mall',
    shortName: 'PVR Ripples',
    brand: 'PVR',
    address: '3rd floor, Ripples Mall, MG Road, Labbipet, Vijayawada 520010',
    locality: 'Labbipet',
    connectedLocalities: ['Labbipet', 'MG Road'],
    postalCode: '520010',
    floorInfo: '3rd Floor',

    screenCount: 4,
    screenCountStatus: 'unverified',
    screenCountNote: '4 screens announced at 2013 opening; re-verification recommended',

    seatingCapacity: null,
    seatingCapacityStatus: 'missing',
    seatingCapacityNote: 'Total seat capacity not found in reference sources',

    soundSystem: 'Information unavailable',
    soundSystemStatus: 'missing',
    hasDolbyAtmos: false,
    hasImax: false,

    projectionAnd3D: 'Information unavailable',
    projectionStatus: 'missing',
    has3D: false,

    recliners: {
      available: true,
      description: 'Recliners verified in multiplex amenities list',
      verification: 'verified'
    },

    amenities: [
      'Kids Playhouse',
      'Luxury Recliners',
      'Wheelchair Friendly',
      'Parking',
      'Food & Beverages',
      'Digital Payments',
      'Mobile Tickets',
      'Ticket Cancellation',
      'Full AC'
    ],
    languages: ['Telugu', 'Hindi', 'English'],

    pricingEstimate: {
      regularRange: '₹150 – ₹250',
      reclinerRange: '₹300 – ₹450',
      note: 'Demo sample prices. Exact rates confirmed by booking partner.'
    },

    coordinates: {
      lat: 16.5050,
      lng: 80.6432,
      isVerified: true,
      mapNotes: 'Ripples Mall, MG Road in Labbipet'
    },
    googleMapsQuery: 'PVR Cinemas, Ripples Mall, Labbipet, MG Road, Vijayawada',
    backgroundInfo: 'PVR multiplex established in 2013 on MG Road Labbipet, famous for its family-friendly amenities including a dedicated kids playhouse.',
    auditNotes: 'Verified: Kids playhouse, Recliners, Wheelchair access. Unverified: 4 screens (from 2013 launch press). Missing: Total seats, Sound system details, 3D.',
    heroImage: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=1200&auto=format&fit=crop',
    rating: 4.4,
    reviewCount: 2980
  },
  {
    id: 'inox-lepl-icon',
    name: 'INOX LEPL Icon',
    shortName: 'INOX LEPL',
    brand: 'INOX',
    address: 'LEPL Icon Mall, Patamata, Vijayawada',
    locality: 'Patamata',
    connectedLocalities: ['Patamata', 'Benz Circle'],
    postalCode: '520010',
    floorInfo: 'LEPL Icon Mall Multiplex Level',

    screenCount: 4,
    screenCountStatus: 'verified',
    screenCountNote: '4 screens verified at launch (an ad snippet mentions 5 screens, needs audit)',

    seatingCapacity: 1198,
    seatingCapacityStatus: 'verified',
    seatingCapacityNote: '1,198 seats at launch; Screen 1 has 352 seats (alt listing cites 1,223)',

    soundSystem: 'Information unavailable',
    soundSystemStatus: 'missing',
    hasDolbyAtmos: false,
    hasImax: false,

    projectionAnd3D: 'Information unavailable',
    projectionStatus: 'missing',
    has3D: false,

    recliners: {
      available: false,
      description: 'Information unavailable in published records',
      verification: 'missing'
    },

    amenities: [
      'Parking',
      'Food & Beverages',
      'Digital Payments',
      'Mobile Tickets',
      'Ticket Cancellation',
      'Full AC'
    ],
    languages: ['Telugu', 'Hindi', 'English'],

    pricingEstimate: {
      regularRange: '₹140 – ₹250',
      specialReleaseRange: '₹350 – ₹450',
      note: 'Demo sample range. Exact final booking amounts come from the active ticketing backend.'
    },

    coordinates: {
      lat: 16.4952,
      lng: 80.6668,
      isVerified: true,
      mapNotes: 'LEPL Icon Mall, Patamata area'
    },
    googleMapsQuery: 'INOX LEPL Icon Mall, Patamata, Vijayawada',
    backgroundInfo: "INOX's second multiplex in Vijayawada, now operating under the combined PVR INOX network in the vibrant Patamata commercial zone.",
    auditNotes: 'Verified: 4 screens (1,198 seats), Screen 1 (352 seats). Discrepancy noted: One ad lists 5 screens / 1,223 seats. Missing: Dolby Atmos confirmation, 3D specs.',
    heroImage: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=1200&auto=format&fit=crop',
    rating: 4.5,
    reviewCount: 3810
  },
  {
    id: 'inox-urvasi-complex',
    name: 'INOX Urvasi Complex',
    shortName: 'INOX Urvasi',
    brand: 'INOX',
    address: 'Urvasi Complex, Gandhi Nagar, Vijayawada',
    locality: 'Gandhi Nagar',
    connectedLocalities: ['Gandhi Nagar'],
    postalCode: '520003',
    floorInfo: 'Urvasi Multiplex Hub',

    screenCount: 4,
    screenCountStatus: 'verified',
    screenCountNote: '4 auditoriums confirmed',

    seatingCapacity: 1103,
    seatingCapacityStatus: 'verified',
    seatingCapacityNote: '1,103 total seats confirmed',

    soundSystem: 'Information unavailable',
    soundSystemStatus: 'missing',
    hasDolbyAtmos: false,
    hasImax: false,

    projectionAnd3D: '2D and 3D screens',
    projectionStatus: 'verified',
    has3D: true,

    recliners: {
      available: false,
      description: 'Information unavailable',
      verification: 'missing'
    },

    amenities: [
      'Parking',
      'Food & Beverages',
      'Digital Payments',
      'Mobile Tickets',
      'Ticket Cancellation',
      'Full AC'
    ],
    languages: ['Hindi', 'English', 'Telugu'],

    pricingEstimate: {
      regularRange: '₹120 – ₹220',
      note: 'Demo placeholder rates. Exact price calculated at seat selection.'
    },

    coordinates: {
      lat: 16.5178,
      lng: 80.6276,
      isVerified: true,
      mapNotes: 'Historic Urvasi Complex site in Gandhi Nagar'
    },
    googleMapsQuery: 'INOX Urvasi Complex, Gandhi Nagar, Vijayawada',
    backgroundInfo: 'Built on the heritage site of the legendary Urvasi, Rambha and Tilottama theatres, modernized into a 4-screen multiplex.',
    auditNotes: 'Verified: 4 screens, 1,103 seats, 2D and 3D capabilities. Missing: Sound configuration / Dolby Atmos unconfirmed, Recliners unavailable.',
    heroImage: 'https://images.unsplash.com/photo-1543536448-d209d2d13a1c?q=80&w=1200&auto=format&fit=crop',
    rating: 4.3,
    reviewCount: 2470
  },
  {
    id: 'cinepolis-pvp-square',
    name: 'Cinépolis PVP Square',
    shortName: 'Cinépolis PVP',
    brand: 'Cinépolis',
    address: 'PVP Square Mall, MG Road, Mogalrajapuram, Vijayawada',
    locality: 'Mogalrajapuram',
    connectedLocalities: ['Mogalrajapuram', 'MG Road'],
    postalCode: '520010',
    floorInfo: 'PVP Square Top Level',

    screenCount: 6,
    screenCountStatus: 'verified',
    screenCountNote: '6 modern digital screens',

    seatingCapacity: null,
    seatingCapacityStatus: 'missing',
    seatingCapacityNote: 'Seating capacity not found in reference document',

    soundSystem: 'Information unavailable',
    soundSystemStatus: 'missing',
    hasDolbyAtmos: false,
    hasImax: false,

    projectionAnd3D: 'Information unavailable',
    projectionStatus: 'missing',
    has3D: false,

    recliners: {
      available: true,
      description: 'Luxury recliners available in premium rows',
      verification: 'verified'
    },

    amenities: [
      'Luxury Recliners',
      'Wheelchair Friendly',
      'Parking',
      'Food & Beverages',
      'Digital Payments',
      'Mobile Tickets',
      'Full AC'
    ],
    languages: ['Telugu', 'Hindi', 'English'],

    pricingEstimate: {
      regularRange: '₹150 – ₹250',
      reclinerRange: '₹350 – ₹480',
      note: 'Demo sample pricing. Live seat price applies at payment gateway.'
    },

    coordinates: {
      lat: 16.5029,
      lng: 80.6472,
      isVerified: true,
      mapNotes: 'PVP Square Mall in Mogalrajapuram on MG Road corridor'
    },
    googleMapsQuery: 'Cinepolis, PVP Square Mall, Mogalrajapuram, Vijayawada',
    backgroundInfo: 'Flagship Cinépolis multiplex located inside PVP Square, offering world-class ambience, coffee lounge, and recliner seating.',
    auditNotes: 'Verified: 6 screens, Recliners, Wheelchair access. Missing: Total seats, Sound system (Dolby Atmos not confirmed), 3D formats.',
    heroImage: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=1200&auto=format&fit=crop',
    rating: 4.6,
    reviewCount: 4680
  },
  {
    id: 'cinepolis-power-one-mall',
    name: 'Cinépolis Power One Mall',
    shortName: 'Cinépolis Power One',
    brand: 'Cinépolis',
    address: 'Power One Mall, Bunder Road, Vijayawada',
    locality: 'Bunder Road',
    connectedLocalities: ['Bunder Road'],
    postalCode: '520010',
    floorInfo: 'Power One Multiplex Floor',

    screenCount: 4,
    screenCountStatus: 'verified',
    screenCountNote: '4 auditoriums confirmed',

    seatingCapacity: null,
    seatingCapacityStatus: 'missing',
    seatingCapacityNote: 'Total seat count not found in source records',

    soundSystem: 'Information unavailable',
    soundSystemStatus: 'missing',
    hasDolbyAtmos: false,
    hasImax: false,

    projectionAnd3D: 'Information unavailable',
    projectionStatus: 'missing',
    has3D: false,

    recliners: {
      available: false,
      description: 'Information unavailable',
      verification: 'missing'
    },

    amenities: [
      'Parking',
      'Food & Beverages',
      'Digital Payments',
      'Mobile Tickets',
      'Full AC'
    ],
    languages: ['Telugu', 'Hindi', 'English'],

    pricingEstimate: {
      regularRange: '₹140 – ₹240',
      note: 'Demo sample prices. Booking partner confirms final rate.'
    },

    coordinates: {
      lat: 16.4912,
      lng: 80.6720,
      isVerified: true,
      mapNotes: 'Power One Mall on Bunder Road'
    },
    googleMapsQuery: 'Cinepolis, Power One Mall, Bunder Road, Vijayawada',
    backgroundInfo: 'Modern Cinépolis entertainment destination situated along the bustling Bunder Road arterial road.',
    auditNotes: 'Verified: 4 screens, AC, Parking, F&B. Missing: Seat count, Dolby Atmos, 3D, Recliner presence.',
    heroImage: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=1200&auto=format&fit=crop',
    rating: 4.4,
    reviewCount: 1890
  },
  {
    id: 'tara-screens-2k-ac',
    name: 'Tara Screens 2K A/C',
    shortName: 'Tara Screens',
    brand: 'Independent',
    address: 'Vijayawada (Exact street address not verified in source doc)',
    locality: 'Other' as any, // Not verified to a specific locality in the doc
    connectedLocalities: [],
    floorInfo: 'Information unavailable',

    screenCount: null,
    screenCountStatus: 'missing',
    screenCountNote: 'Screen count not found in reference sources',

    seatingCapacity: null,
    seatingCapacityStatus: 'missing',
    seatingCapacityNote: 'Total seating capacity not found',

    soundSystem: 'Information unavailable',
    soundSystemStatus: 'missing',
    hasDolbyAtmos: false,
    hasImax: false,

    projectionAnd3D: '2K projection, 3D shows',
    projectionStatus: 'verified',
    has3D: true,

    recliners: {
      available: false,
      description: 'Information unavailable',
      verification: 'missing'
    },

    amenities: [
      'Full AC'
    ],
    languages: ['Telugu'],

    pricingEstimate: {
      regularRange: '₹100 – ₹180',
      note: 'Demo estimate for local single-screen / 2K theatre. Sourced from general municipal tiers.'
    },

    coordinates: {
      lat: 16.5120,
      lng: 80.6350,
      isVerified: false,
      mapNotes: 'Approximate city center pin only. Exact street address not verified in source documentation.'
    },
    googleMapsQuery: 'Tara Screens 2K, Vijayawada',
    backgroundInfo: 'Local cinema in Vijayawada offering 2K projection and 3D presentation for Telugu film releases.',
    auditNotes: 'Verified: 2K projection, 3D shows, Telugu language. Unverified/Missing: Exact address, Screen count, Seat count, Sound configuration, Amenities.',
    heroImage: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?q=80&w=1200&auto=format&fit=crop',
    rating: 4.0,
    reviewCount: 940
  },
  {
    id: 'g3-theatres-raj-yuvraj',
    name: 'G3 Theatres Raj Yuvraj',
    shortName: 'G3 Raj Yuvraj',
    brand: 'Independent',
    address: 'Gandhi Nagar, Vijayawada',
    locality: 'Gandhi Nagar',
    connectedLocalities: ['Gandhi Nagar'],
    floorInfo: 'G3 Complex',

    screenCount: null,
    screenCountStatus: 'missing',
    screenCountNote: 'Screen count not found in reference document',

    seatingCapacity: null,
    seatingCapacityStatus: 'missing',
    seatingCapacityNote: 'Seating capacity not found',

    soundSystem: 'Information unavailable',
    soundSystemStatus: 'missing',
    hasDolbyAtmos: false,
    hasImax: false,

    projectionAnd3D: 'Information unavailable',
    projectionStatus: 'missing',
    has3D: false,

    recliners: {
      available: true,
      description: 'Recliners verified in listings',
      verification: 'verified'
    },

    amenities: [
      'Luxury Recliners',
      'Wheelchair Friendly',
      'Parking',
      'Food & Beverages',
      'Digital Payments',
      'Mobile Tickets',
      'Full AC'
    ],
    languages: ['Telugu', 'Hindi'],

    pricingEstimate: {
      regularRange: '₹120 – ₹220',
      reclinerRange: '₹280 – ₹380',
      note: 'Demo sample rates. Live confirmation required at booking.'
    },

    coordinates: {
      lat: 16.5195,
      lng: 80.6252,
      isVerified: true,
      mapNotes: 'Gandhi Nagar cinema strip'
    },
    googleMapsQuery: 'G3 Theatres Raj Yuvraj, Gandhi Nagar, Vijayawada',
    backgroundInfo: 'Renowned entertainment spot in Gandhi Nagar featuring recliner seats, wheelchair accessibility, and classic cinema charm.',
    auditNotes: 'Verified: Recliners, Wheelchair access, Gandhi Nagar locality. Missing: Exact screen count, Total seating capacity, Sound system, 3D specs.',
    heroImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200&auto=format&fit=crop',
    rating: 4.2,
    reviewCount: 1630
  }
];

export const DEMO_MOVIES: Movie[] = [
  {
    id: 'devara-part-1',
    title: 'Devara: Part 1',
    teluguTitle: 'దేవర: పార్ట్ 1',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    rating: 8.8,
    votes: '142.5K',
    duration: '2h 58m',
    genre: ['Action', 'Drama', 'Thriller'],
    certification: 'UA',
    releaseDate: '2026',
    languages: ['Telugu', 'Hindi', 'English'],
    formats: ['2D', '3D', 'Dolby Atmos'],
    synopsis: 'An epic coastal drama depicting the fearless protector of forgotten waters defending his clan from lawlessness and betrayal.',
    director: 'Koratala Siva',
    cast: ['N. T. Rama Rao Jr.', 'Janhvi Kapoor', 'Saif Ali Khan', 'Srikanth']
  },
  {
    id: 'kalki-2898-ad',
    title: 'Kalki 2898 AD',
    teluguTitle: 'కల్కి 2898 AD',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    rating: 9.1,
    votes: '280.9K',
    duration: '3h 01m',
    genre: ['Sci-Fi', 'Action', 'Mythology'],
    certification: 'UA',
    releaseDate: '2026',
    languages: ['Telugu', 'Hindi', 'English'],
    formats: ['3D', 'Dolby Atmos'],
    synopsis: 'A groundbreaking futuristic mythological sci-fi epic set in the post-apocalyptic city of Kasi in the year 2898 AD.',
    director: 'Nag Ashwin',
    cast: ['Prabhas', 'Amitabh Bachchan', 'Kamal Haasan', 'Deepika Padukone']
  },
  {
    id: 'pushpa-2-the-rule',
    title: 'Pushpa 2: The Rule',
    teluguTitle: 'పుష్ప 2: ది రూల్',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1600&auto=format&fit=crop',
    rating: 9.0,
    votes: '215.1K',
    duration: '3h 15m',
    genre: ['Action', 'Crime', 'Thriller'],
    certification: 'UA',
    releaseDate: '2026',
    languages: ['Telugu', 'Hindi'],
    formats: ['2D', 'Dolby Atmos'],
    synopsis: 'Pushpa Raj asserts his iron grip over the red sandalwood syndicate as international syndicates and state police mount their offensive.',
    director: 'Sukumar',
    cast: ['Allu Arjun', 'Rashmika Mandanna', 'Fahadh Faasil', 'Jagapathi Babu']
  },
  {
    id: 'avatar-fire-and-ash',
    title: 'Avatar: Fire and Ash',
    teluguTitle: 'అవతార్: ఫైర్ అండ్ యాష్',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    rating: 8.9,
    votes: '98.3K',
    duration: '3h 10m',
    genre: ['Sci-Fi', 'Adventure', 'Action'],
    certification: 'UA',
    releaseDate: '2026',
    languages: ['English', 'Telugu', 'Hindi'],
    formats: ['3D', 'Dolby Atmos'],
    synopsis: 'Jake Sully and Neytiri encounter the Ash People, a volcanic Na’vi tribe exhibiting a fierce, unforeseen dimension of Pandora.',
    director: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver', 'Stephen Lang']
  }
];

// Reference document sample slots explicitly mapped
export const DEMO_SHOWTIMES: ShowtimeSlot[] = [
  // 1. INOX Laila Mall (From Reference Doc)
  {
    id: 'st-laila-1',
    cinemaId: 'inox-laila-mall',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '11:00 AM',
    period: 'Morning',
    screenName: 'Screen 1 (Dolby Atmos)',
    format: 'Dolby Atmos 3D',
    basePrice: 200,
    reclinerPrice: 380,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-laila-2',
    cinemaId: 'inox-laila-mall',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '06:20 PM',
    period: 'Evening',
    screenName: 'Screen 1 (Dolby Atmos)',
    format: 'Dolby Atmos 3D',
    basePrice: 220,
    reclinerPrice: 420,
    isDemoPlaceholder: true,
    availability: 'Filling Fast'
  },
  {
    id: 'st-laila-3',
    cinemaId: 'inox-laila-mall',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '10:00 PM',
    period: 'Night',
    screenName: 'Screen 1 (Dolby Atmos)',
    format: 'Dolby Atmos 3D',
    basePrice: 220,
    reclinerPrice: 420,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-laila-4',
    cinemaId: 'inox-laila-mall',
    movieId: 'avatar-fire-and-ash',
    language: 'English',
    time: '12:35 PM',
    period: 'Afternoon',
    screenName: 'Screen 2 (Laser 3D)',
    format: '3D',
    basePrice: 230,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-laila-5',
    cinemaId: 'inox-laila-mall',
    movieId: 'avatar-fire-and-ash',
    language: 'English',
    time: '07:20 PM',
    period: 'Evening',
    screenName: 'Screen 2 (Laser 3D)',
    format: '3D',
    basePrice: 250,
    isDemoPlaceholder: true,
    availability: 'Almost Full'
  },
  {
    id: 'st-laila-6',
    cinemaId: 'inox-laila-mall',
    movieId: 'avatar-fire-and-ash',
    language: 'English',
    time: '10:50 PM',
    period: 'Night',
    screenName: 'Screen 3 (Laser 3D)',
    format: '3D',
    basePrice: 230,
    isDemoPlaceholder: true,
    availability: 'Available'
  },

  // 2. Capital Cinemas Trendset Mall (From Reference Doc)
  {
    id: 'st-trendset-1',
    cinemaId: 'capital-cinemas-trendset',
    movieId: 'pushpa-2-the-rule',
    language: 'Telugu',
    time: '01:45 PM',
    period: 'Afternoon',
    screenName: 'Screen 1 (Dolby Atmos)',
    format: 'Dolby Atmos 3D',
    basePrice: 220,
    reclinerPrice: 450,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-trendset-2',
    cinemaId: 'capital-cinemas-trendset',
    movieId: 'pushpa-2-the-rule',
    language: 'Telugu',
    time: '04:50 PM',
    period: 'Evening',
    screenName: 'Screen 1 (Dolby Atmos)',
    format: 'Dolby Atmos 3D',
    basePrice: 240,
    reclinerPrice: 480,
    isDemoPlaceholder: true,
    availability: 'Filling Fast'
  },
  {
    id: 'st-trendset-3',
    cinemaId: 'capital-cinemas-trendset',
    movieId: 'pushpa-2-the-rule',
    language: 'Telugu',
    time: '07:40 PM',
    period: 'Evening',
    screenName: 'Screen 1 (Dolby Atmos)',
    format: 'Dolby Atmos 3D',
    basePrice: 250,
    reclinerPrice: 495,
    isDemoPlaceholder: true,
    availability: 'Almost Full'
  },
  {
    id: 'st-trendset-4',
    cinemaId: 'capital-cinemas-trendset',
    movieId: 'pushpa-2-the-rule',
    language: 'Telugu',
    time: '10:30 PM',
    period: 'Night',
    screenName: 'Screen 1 (Dolby Atmos)',
    format: 'Dolby Atmos 3D',
    basePrice: 240,
    reclinerPrice: 480,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-trendset-5',
    cinemaId: 'capital-cinemas-trendset',
    movieId: 'kalki-2898-ad',
    language: 'Hindi',
    time: '01:20 PM',
    period: 'Afternoon',
    screenName: 'Screen 6 (3D Recliner)',
    format: '3D',
    basePrice: 210,
    reclinerPrice: 420,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-trendset-6',
    cinemaId: 'capital-cinemas-trendset',
    movieId: 'kalki-2898-ad',
    language: 'Hindi',
    time: '07:35 PM',
    period: 'Evening',
    screenName: 'Screen 6 (3D Recliner)',
    format: '3D',
    basePrice: 230,
    reclinerPrice: 460,
    isDemoPlaceholder: true,
    availability: 'Filling Fast'
  },
  {
    id: 'st-trendset-7',
    cinemaId: 'capital-cinemas-trendset',
    movieId: 'kalki-2898-ad',
    language: 'Hindi',
    time: '10:45 PM',
    period: 'Night',
    screenName: 'Screen 6 (3D Recliner)',
    format: '3D',
    basePrice: 220,
    reclinerPrice: 440,
    isDemoPlaceholder: true,
    availability: 'Available'
  },

  // 3. INOX LEPL Icon (From Reference Doc)
  {
    id: 'st-lepl-1',
    cinemaId: 'inox-lepl-icon',
    movieId: 'kalki-2898-ad',
    language: 'Hindi',
    time: '10:20 AM',
    period: 'Morning',
    screenName: 'Screen 1 (Auditorium)',
    format: '2D',
    basePrice: 180,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-lepl-2',
    cinemaId: 'inox-lepl-icon',
    movieId: 'kalki-2898-ad',
    language: 'Hindi',
    time: '01:15 PM',
    period: 'Afternoon',
    screenName: 'Screen 1 (Auditorium)',
    format: '2D',
    basePrice: 200,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-lepl-3',
    cinemaId: 'inox-lepl-icon',
    movieId: 'kalki-2898-ad',
    language: 'Hindi',
    time: '07:55 PM',
    period: 'Evening',
    screenName: 'Screen 1 (Auditorium)',
    format: '2D',
    basePrice: 220,
    isDemoPlaceholder: true,
    availability: 'Almost Full'
  },
  {
    id: 'st-lepl-4',
    cinemaId: 'inox-lepl-icon',
    movieId: 'kalki-2898-ad',
    language: 'Hindi',
    time: '10:50 PM',
    period: 'Night',
    screenName: 'Screen 1 (Auditorium)',
    format: '2D',
    basePrice: 200,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-lepl-5',
    cinemaId: 'inox-lepl-icon',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '01:55 PM',
    period: 'Afternoon',
    screenName: 'Screen 2',
    format: '2D',
    basePrice: 190,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-lepl-6',
    cinemaId: 'inox-lepl-icon',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '07:30 PM',
    period: 'Evening',
    screenName: 'Screen 2',
    format: '2D',
    basePrice: 220,
    isDemoPlaceholder: true,
    availability: 'Filling Fast'
  },
  {
    id: 'st-lepl-7',
    cinemaId: 'inox-lepl-icon',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '10:40 PM',
    period: 'Night',
    screenName: 'Screen 2',
    format: '2D',
    basePrice: 200,
    isDemoPlaceholder: true,
    availability: 'Available'
  },

  // 4. INOX Urvasi Complex (From Reference Doc)
  {
    id: 'st-urvasi-1',
    cinemaId: 'inox-urvasi-complex',
    movieId: 'pushpa-2-the-rule',
    language: 'Hindi',
    time: '11:45 AM',
    period: 'Morning',
    screenName: 'Audi 1 (3D)',
    format: '3D',
    basePrice: 160,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-urvasi-2',
    cinemaId: 'inox-urvasi-complex',
    movieId: 'pushpa-2-the-rule',
    language: 'Hindi',
    time: '03:10 PM',
    period: 'Afternoon',
    screenName: 'Audi 1 (3D)',
    format: '3D',
    basePrice: 180,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-urvasi-3',
    cinemaId: 'inox-urvasi-complex',
    movieId: 'pushpa-2-the-rule',
    language: 'Hindi',
    time: '10:30 PM',
    period: 'Night',
    screenName: 'Audi 1 (3D)',
    format: '3D',
    basePrice: 180,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-urvasi-4',
    cinemaId: 'inox-urvasi-complex',
    movieId: 'avatar-fire-and-ash',
    language: 'English',
    time: '12:20 PM',
    period: 'Afternoon',
    screenName: 'Audi 2 (3D)',
    format: '3D',
    basePrice: 190,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-urvasi-5',
    cinemaId: 'inox-urvasi-complex',
    movieId: 'avatar-fire-and-ash',
    language: 'English',
    time: '08:05 PM',
    period: 'Evening',
    screenName: 'Audi 2 (3D)',
    format: '3D',
    basePrice: 210,
    isDemoPlaceholder: true,
    availability: 'Filling Fast'
  },

  // 5. Tara Screens 2K A/C (From Reference Doc)
  {
    id: 'st-tara-1',
    cinemaId: 'tara-screens-2k-ac',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '11:30 AM',
    period: 'Morning',
    screenName: 'Main Screen 2K',
    format: '3D',
    basePrice: 130,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-tara-2',
    cinemaId: 'tara-screens-2k-ac',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '02:30 PM',
    period: 'Afternoon',
    screenName: 'Main Screen 2K',
    format: '3D',
    basePrice: 140,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-tara-3',
    cinemaId: 'tara-screens-2k-ac',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '06:30 PM',
    period: 'Evening',
    screenName: 'Main Screen 2K',
    format: '3D',
    basePrice: 150,
    isDemoPlaceholder: true,
    availability: 'Filling Fast'
  },
  {
    id: 'st-tara-4',
    cinemaId: 'tara-screens-2k-ac',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '09:30 PM',
    period: 'Night',
    screenName: 'Main Screen 2K',
    format: '3D',
    basePrice: 150,
    isDemoPlaceholder: true,
    availability: 'Available'
  },

  // 6. Cinépolis PVP Square (Demo Placeholder with disclaimer)
  {
    id: 'st-pvp-1',
    cinemaId: 'cinepolis-pvp-square',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '11:15 AM',
    period: 'Morning',
    screenName: 'Audi 3',
    format: '2D',
    basePrice: 190,
    reclinerPrice: 390,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-pvp-2',
    cinemaId: 'cinepolis-pvp-square',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '06:45 PM',
    period: 'Evening',
    screenName: 'Audi 3',
    format: '2D',
    basePrice: 220,
    reclinerPrice: 440,
    isDemoPlaceholder: true,
    availability: 'Filling Fast'
  },

  // 7. PVR Ripples Mall (Demo Placeholder with disclaimer)
  {
    id: 'st-ripples-1',
    cinemaId: 'pvr-ripples-mall',
    movieId: 'avatar-fire-and-ash',
    language: 'English',
    time: '01:00 PM',
    period: 'Afternoon',
    screenName: 'PVR Screen 2',
    format: '2D',
    basePrice: 200,
    reclinerPrice: 380,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-ripples-2',
    cinemaId: 'pvr-ripples-mall',
    movieId: 'kalki-2898-ad',
    language: 'Telugu',
    time: '07:15 PM',
    period: 'Evening',
    screenName: 'PVR Screen 1',
    format: '2D',
    basePrice: 220,
    reclinerPrice: 420,
    isDemoPlaceholder: true,
    availability: 'Filling Fast'
  },

  // 8. Cinépolis Power One Mall (Demo Placeholder with disclaimer)
  {
    id: 'st-powerone-1',
    cinemaId: 'cinepolis-power-one-mall',
    movieId: 'pushpa-2-the-rule',
    language: 'Telugu',
    time: '02:00 PM',
    period: 'Afternoon',
    screenName: 'Audi 1',
    format: '2D',
    basePrice: 180,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-powerone-2',
    cinemaId: 'cinepolis-power-one-mall',
    movieId: 'pushpa-2-the-rule',
    language: 'Telugu',
    time: '08:30 PM',
    period: 'Night',
    screenName: 'Audi 1',
    format: '2D',
    basePrice: 200,
    isDemoPlaceholder: true,
    availability: 'Filling Fast'
  },

  // 9. G3 Theatres Raj Yuvraj (Demo Placeholder with disclaimer)
  {
    id: 'st-g3-1',
    cinemaId: 'g3-theatres-raj-yuvraj',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '02:15 PM',
    period: 'Afternoon',
    screenName: 'Raj Screen',
    format: '2D',
    basePrice: 140,
    reclinerPrice: 290,
    isDemoPlaceholder: true,
    availability: 'Available'
  },
  {
    id: 'st-g3-2',
    cinemaId: 'g3-theatres-raj-yuvraj',
    movieId: 'devara-part-1',
    language: 'Telugu',
    time: '06:15 PM',
    period: 'Evening',
    screenName: 'Yuvraj Screen',
    format: '2D',
    basePrice: 160,
    reclinerPrice: 320,
    isDemoPlaceholder: true,
    availability: 'Filling Fast'
  }
];

export const OTHER_HISTORIC_THEATRES = [
  { name: 'Swarna Palace', area: 'Vijayawada (former Lakshmi Talkies site)', note: '3-screen complex with shops and offices' },
  { name: 'Durga Kalamandiram', area: 'Vijayawada', note: 'Built in 1936; one of two old single-screen halls still running' },
  { name: 'Rajakumari', area: 'Vijayawada', note: 'The other surviving historic single-screen hall' },
  { name: 'Apsara Cinema House', area: 'Governorpet', note: 'Historic single-screen hall listed for ticket booking' },
  { name: 'Ravi Cinemas', area: 'PNBS', note: 'Single screen cinema listed for ticket booking' },
  { name: 'Sowmya Theatre', area: 'Chittinagar', note: 'Neighbourhood single-screen hall' },
  { name: 'Raj Cinema Hall', area: 'Vijayawada', note: 'Described as affordable, with clear projection and good sound' },
  { name: 'Balaji Iconia A/C 2K Dolby Surround', area: 'Ibrahimpatnam', note: 'Dolby Surround, 2K; located outside the main city center' }
];
