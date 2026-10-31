import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Sparkles, 
  Volume2, 
  Layers, 
  ShieldCheck, 
  SlidersHorizontal, 
  Film, 
  Map as MapIcon, 
  ExternalLink,
  Info,
  Calendar,
  AlertCircle
} from 'lucide-react';

import { 
  Cinema, 
  Movie, 
  ShowtimeSlot, 
  BookingSeat, 
  BookingCart, 
  CityOption, 
  UserProfile 
} from './types/cinema';

import { 
  VIJAYAWADA_CINEMAS, 
  SUPPORTED_CITIES, 
  DEMO_MOVIES, 
  DEMO_SHOWTIMES 
} from './data/cinemas';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CinemaCard } from './components/CinemaCard';
import { CinemaFilters } from './components/CinemaFilters';
import { CinemaDetails } from './components/CinemaDetails';
import { CinemaMap } from './components/CinemaMap';
import { CinemaSeat3D } from './components/CinemaSeat3D';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { LocationSelector } from './components/LocationSelector';
import { AuditReportView } from './components/AuditReportView';
import { MoviesView } from './components/MoviesView';
import { BookingService } from './services/bookingService';

export const App: React.FC = () => {
  // Navigation & Primary City
  const [currentCity, setCurrentCity] = useState<CityOption>(SUPPORTED_CITIES[0]); // Vijayawada, AP (Default)
  const [activeView, setActiveView] = useState<'cinemas' | 'movies' | 'map' | 'audit'>('cinemas');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedShowtimePeriod, setSelectedShowtimePeriod] = useState('All');
  const [onlyDolbyAtmos, setOnlyDolbyAtmos] = useState(false);
  const [only3D, setOnly3D] = useState(false);
  const [onlyRecliners, setOnlyRecliners] = useState(false);

  // Modals & Active Selections
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedCinemaForDetails, setSelectedCinemaForDetails] = useState<Cinema | null>(null);

  // 3D Seat Booking & Checkout State
  const [bookingSession, setBookingSession] = useState<{
    cinema: Cinema;
    movie: Movie;
    showtime: ShowtimeSlot;
  } | null>(null);

  const [checkoutCart, setCheckoutCart] = useState<BookingCart | null>(null);

  // User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    name: 'Suresh Varma',
    email: 'suresh.varma@example.com',
    phone: '+91 98480 12345',
    city: 'Vijayawada',
    isLoggedIn: false
  });

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLocality('All');
    setSelectedLanguage('All');
    setSelectedShowtimePeriod('All');
    setOnlyDolbyAtmos(false);
    setOnly3D(false);
    setOnlyRecliners(false);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedLocality !== 'All') count++;
    if (selectedLanguage !== 'All') count++;
    if (selectedShowtimePeriod !== 'All') count++;
    if (onlyDolbyAtmos) count++;
    if (only3D) count++;
    if (onlyRecliners) count++;
    return count;
  }, [searchQuery, selectedLocality, selectedLanguage, selectedShowtimePeriod, onlyDolbyAtmos, only3D, onlyRecliners]);

  // Filtered Cinemas
  const filteredCinemas = useMemo(() => {
    return VIJAYAWADA_CINEMAS.filter(cinema => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = cinema.name.toLowerCase().includes(query);
        const matchesAddress = cinema.address.toLowerCase().includes(query);
        const matchesLocality = cinema.locality.toLowerCase().includes(query);
        if (!matchesName && !matchesAddress && !matchesLocality) return false;
      }

      // Locality
      if (selectedLocality !== 'All') {
        const matchesPrimary = cinema.locality === selectedLocality;
        const matchesConnected = cinema.connectedLocalities.includes(selectedLocality as any);
        if (!matchesPrimary && !matchesConnected) return false;
      }

      // Language
      if (selectedLanguage !== 'All') {
        if (!cinema.languages.includes(selectedLanguage as any)) return false;
      }

      // Showtime Period filter
      if (selectedShowtimePeriod !== 'All') {
        const cinemaSlots = DEMO_SHOWTIMES.filter(s => s.cinemaId === cinema.id);
        const hasSlotInPeriod = cinemaSlots.some(s => s.period === selectedShowtimePeriod);
        if (!hasSlotInPeriod) return false;
      }

      // Feature Toggles
      if (onlyDolbyAtmos && !cinema.hasDolbyAtmos) return false;
      if (only3D && !cinema.has3D) return false;
      if (onlyRecliners && cinema.recliners.verification !== 'verified') return false;

      return true;
    });
  }, [searchQuery, selectedLocality, selectedLanguage, selectedShowtimePeriod, onlyDolbyAtmos, only3D, onlyRecliners]);

  // Start 3D Seat Selection Flow
  const handleSelectSlotFor3D = (slot: ShowtimeSlot, movie: Movie) => {
    const cinema = VIJAYAWADA_CINEMAS.find(c => c.id === slot.cinemaId);
    if (!cinema) return;

    setSelectedCinemaForDetails(null); // close details modal if open
    setBookingSession({
      cinema,
      movie,
      showtime: slot
    });
  };

  // Proceed from 3D Seat visualizer to checkout
  const handleProceedToCheckout = (selectedSeats: BookingSeat[]) => {
    if (!bookingSession) return;
    const cart = BookingService.calculateCart(
      bookingSession.cinema,
      bookingSession.movie,
      bookingSession.showtime,
      selectedSeats
    );
    setBookingSession(null); // close 3D modal
    setCheckoutCart(cart); // open checkout modal
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar
        currentCity={currentCity}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        activeView={activeView}
        onChangeView={setActiveView}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* City Hero Banner (When on Theatres View) */}
        {activeView === 'cinemas' && (
          <div className="relative rounded-3xl bg-gradient-to-r from-amber-600/20 via-slate-900 to-[#0C111F] border border-amber-500/30 p-6 sm:p-8 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-500/20">
                  <MapPin className="w-3.5 h-3.5" />
                  Primary Launch City: {currentCity.name}, {currentCity.state}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  9 Verified Theatres
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight leading-tight">
                Experience Cinema in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Vijayawada</span> in 3D
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Discover local multiplexes across MG Road, Benz Circle, Patamata, Gandhi Nagar, and Bunder Road. 
                Audited specifications, verified sound systems, authentic amenities, and immersive interactive 3D seat booking.
              </p>

              {/* Quick Key Metrics */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Dolby Atmos Verified: INOX Laila & Trendset</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Interactive 3D Auditorium Visualizer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>All Prices in ₹ (INR)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic View Rendering */}
        {activeView === 'cinemas' && (
          <div className="space-y-6">
            {/* Locality & Attribute Filters */}
            <CinemaFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedLocality={selectedLocality}
              onSelectLocality={setSelectedLocality}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
              selectedShowtimePeriod={selectedShowtimePeriod}
              onSelectShowtimePeriod={setSelectedShowtimePeriod}
              onlyDolbyAtmos={onlyDolbyAtmos}
              onToggleDolbyAtmos={setOnlyDolbyAtmos}
              only3D={only3D}
              onToggle3D={setOnly3D}
              onlyRecliners={onlyRecliners}
              onToggleRecliners={setOnlyRecliners}
              onResetFilters={handleResetFilters}
              activeCount={activeFilterCount}
            />

            {/* Results Counter Header */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <div>
                Showing <strong className="text-white">{filteredCinemas.length}</strong> of{' '}
                <strong>{VIJAYAWADA_CINEMAS.length}</strong> Vijayawada cinemas
                {selectedLocality !== 'All' && <span> in <strong>{selectedLocality}</strong></span>}
              </div>

              <button
                onClick={() => setActiveView('map')}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Switch to Map View</span>
              </button>
            </div>

            {/* Cinema Cards Grid */}
            {filteredCinemas.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
                <AlertCircle className="w-10 h-10 mx-auto text-amber-400" />
                <h3 className="text-lg font-bold text-white">No Cinemas Match Your Filter Criteria</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Try clearing the locality or sound filter to explore all 9 Vijayawada theatres.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold transition hover:bg-amber-400"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCinemas.map(cinema => (
                  <CinemaCard
                    key={cinema.id}
                    cinema={cinema}
                    onViewDetails={c => setSelectedCinemaForDetails(c)}
                    onViewShowtimes={c => setSelectedCinemaForDetails(c)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Movies View */}
        {activeView === 'movies' && (
          <MoviesView
            onSelectMovieForBooking={movie => {
              // Open first cinema showing this movie
              const firstSlot = DEMO_SHOWTIMES.find(s => s.movieId === movie.id);
              if (firstSlot) {
                handleSelectSlotFor3D(firstSlot, movie);
              }
            }}
            onExploreCinema={cinema => setSelectedCinemaForDetails(cinema)}
          />
        )}

        {/* Map Discovery View */}
        {activeView === 'map' && (
          <CinemaMap
            cinemas={VIJAYAWADA_CINEMAS}
            onSelectCinema={cinema => setSelectedCinemaForDetails(cinema)}
          />
        )}

        {/* Audit Report View */}
        {activeView === 'audit' && (
          <AuditReportView />
        )}
      </main>

      {/* Footer */}
      <Footer
        activeView={activeView}
        onChangeView={setActiveView}
      />

      {/* Modals & Overlays */}
      <LocationSelector
        currentCity={currentCity}
        onSelectCity={city => {
          setCurrentCity(city);
          handleResetFilters();
        }}
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      {selectedCinemaForDetails && (
        <CinemaDetails
          cinema={selectedCinemaForDetails}
          onClose={() => setSelectedCinemaForDetails(null)}
          onSelectSlot={handleSelectSlotFor3D}
        />
      )}

      {bookingSession && (
        <CinemaSeat3D
          cinema={bookingSession.cinema}
          movie={bookingSession.movie}
          showtime={bookingSession.showtime}
          onClose={() => setBookingSession(null)}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}

      {checkoutCart && (
        <CheckoutModal
          cart={checkoutCart}
          onClose={() => setCheckoutCart(null)}
          onBookingSuccess={() => {
            // Success handler
          }}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={user => setCurrentUser(user)}
        onLogout={() => setCurrentUser({ ...currentUser, isLoggedIn: false })}
      />
    </div>
  );
};
