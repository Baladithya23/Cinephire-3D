export type CinemaLocality =
  | 'MG Road'
  | 'Labbipet'
  | 'Kala Nagar'
  | 'Benz Circle'
  | 'Punnammathota'
  | 'Patamata'
  | 'Gandhi Nagar'
  | 'Mogalrajapuram'
  | 'Bunder Road';

export type CinemaAmenity =
  | 'Parking'
  | 'Food & Beverages'
  | 'Digital Payments'
  | 'Mobile Tickets'
  | 'Ticket Cancellation'
  | 'Full AC'
  | 'Free Wi-Fi'
  | 'Wheelchair Friendly'
  | 'Kids Playhouse'
  | 'Push-back Seats'
  | 'Luxury Recliners'
  | 'Laser Projection';

export type VerificationState = 'verified' | 'unverified' | 'missing';

export interface CinemaReclinerInfo {
  available: boolean;
  count?: number; // e.g. 108 for Capital Cinemas
  description: string;
  verification: VerificationState;
}

export interface CinemaPricingEstimate {
  regularRange: string;
  reclinerRange?: string;
  specialReleaseRange?: string;
  note: string;
}

export interface CinemaCoordinates {
  lat: number;
  lng: number;
  isVerified: boolean;
  mapNotes: string;
}

export interface Cinema {
  id: string;
  name: string;
  shortName: string;
  brand: 'INOX' | 'PVR' | 'Cinépolis' | 'Capital Cinemas' | 'Independent';
  address: string;
  locality: CinemaLocality;
  connectedLocalities: CinemaLocality[]; // localities this theatre serves or is bordered by
  postalCode?: string;
  floorInfo?: string;
  
  // Audited fields with verification state
  screenCount: number | null;
  screenCountStatus: VerificationState;
  screenCountNote?: string;

  seatingCapacity: number | null;
  seatingCapacityStatus: VerificationState;
  seatingCapacityNote?: string;

  soundSystem: string;
  soundSystemStatus: VerificationState;
  hasDolbyAtmos: boolean;
  hasImax: boolean; // Document confirms NO IMAX exists in Vijayawada

  projectionAnd3D: string;
  projectionStatus: VerificationState;
  has3D: boolean;

  recliners: CinemaReclinerInfo;

  amenities: CinemaAmenity[];
  languages: ('Telugu' | 'Hindi' | 'English')[];

  pricingEstimate: CinemaPricingEstimate;
  
  coordinates: CinemaCoordinates;
  googleMapsQuery: string;

  backgroundInfo?: string;
  auditNotes: string;
  heroImage: string;
  rating: number;
  reviewCount: number;
}

export interface Movie {
  id: string;
  title: string;
  teluguTitle?: string;
  poster: string;
  backdrop: string;
  rating: number; // e.g. 8.9
  votes: string;
  duration: string;
  genre: string[];
  certification: 'U' | 'UA' | 'A';
  releaseDate: string;
  languages: ('Telugu' | 'Hindi' | 'English')[];
  formats: ('2D' | '3D' | 'Dolby Atmos')[];
  synopsis: string;
  director: string;
  cast: string[];
}

export interface ShowtimeSlot {
  id: string;
  cinemaId: string;
  movieId: string;
  language: 'Telugu' | 'Hindi' | 'English';
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  screenName: string;
  format: '2D' | '3D' | 'Dolby Atmos 3D';
  basePrice: number;
  reclinerPrice?: number;
  isDemoPlaceholder: boolean;
  availability: 'Available' | 'Filling Fast' | 'Almost Full';
}

export interface CityOption {
  id: string;
  name: string;
  state: string;
  isDefault?: boolean;
  theatresCount: number;
  status: 'active' | 'coming_soon';
}

export interface BookingSeat {
  id: string;
  row: string;
  col: number;
  tier: 'Classic' | 'Prime' | 'Recliner';
  price: number;
  status: 'available' | 'reserved' | 'selected';
}

export interface BookingCart {
  cinema: Cinema;
  movie: Movie;
  showtime: ShowtimeSlot;
  seats: BookingSeat[];
  subtotal: number;
  convenienceFee: number;
  gst: number;
  total: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  isLoggedIn: boolean;
}
