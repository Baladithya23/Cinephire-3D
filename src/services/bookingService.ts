import { ShowtimeSlot, BookingSeat, BookingCart, Cinema, Movie } from '../types/cinema';
import { DEMO_SHOWTIMES } from '../data/cinemas';

/**
 * CineSphere 3D Booking Service Architecture
 * Designed for plug-and-play integration with live ticketing providers
 * (e.g., BookMyShow, District, PVR INOX Enterprise API, or Vista Cinema software)
 */

export interface BookingProviderConfig {
  providerName: string;
  isLiveSyncEnabled: boolean;
  endpoint?: string;
  partnerApiKey?: string;
}

export const CURRENT_BOOKING_CONFIG: BookingProviderConfig = {
  providerName: 'CineSphere Demo Partner Network (Vijayawada Local Hub)',
  isLiveSyncEnabled: false, // Set to true when live backend credentials are provided
  endpoint: 'https://api.cinesphere3d.internal/v1/vijayawada'
};

export class BookingService {
  /**
   * Fetches showtimes for a specific cinema.
   * If live sync is disabled, returns audited reference demo slots with explicit demo flag.
   */
  static async getShowtimes(cinemaId: string): Promise<ShowtimeSlot[]> {
    // In live mode, this makes an authenticated REST/GraphQL request to the provider
    if (CURRENT_BOOKING_CONFIG.isLiveSyncEnabled && CURRENT_BOOKING_CONFIG.endpoint) {
      try {
        const response = await fetch(`${CURRENT_BOOKING_CONFIG.endpoint}/cinemas/${cinemaId}/showtimes`);
        return await response.json();
      } catch (err) {
        console.warn('Live showtimes sync failed, falling back to local cached slots', err);
      }
    }

    // Default audited local data
    return DEMO_SHOWTIMES.filter(slot => slot.cinemaId === cinemaId);
  }

  /**
   * Generates or fetches the seating layout for a showtime.
   */
  static generateAuditoriumLayout(cinema: Cinema, showtime: ShowtimeSlot): BookingSeat[] {
    const seats: BookingSeat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
    const colsPerRow = 12;

    const basePrice = showtime.basePrice || 180;
    const reclinerPrice = showtime.reclinerPrice || Math.round(basePrice * 1.9);

    rows.forEach((row, rowIndex) => {
      let tier: 'Classic' | 'Prime' | 'Recliner' = 'Classic';
      let price = basePrice;

      if (rowIndex >= 7) {
        tier = 'Recliner';
        price = reclinerPrice;
      } else if (rowIndex >= 4) {
        tier = 'Prime';
        price = Math.round(basePrice * 1.25);
      }

      for (let col = 1; col <= colsPerRow; col++) {
        // Pseudo-random deterministic reserved seats for realistic demo feel
        const hash = (cinema.id.length * 3 + rowIndex * 7 + col * 13) % 10;
        const isReserved = hash === 1 || hash === 4;

        seats.push({
          id: `${row}${col}`,
          row,
          col,
          tier,
          price,
          status: isReserved ? 'reserved' : 'available'
        });
      }
    });

    return seats;
  }

  /**
   * Calculate cart total with GST & platform convenience fee in Indian Rupees
   */
  static calculateCart(cinema: Cinema, movie: Movie, showtime: ShowtimeSlot, selectedSeats: BookingSeat[]): BookingCart {
    const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    // Standard cinema booking convenience fee (approx ₹25 per ticket)
    const convenienceFee = selectedSeats.length > 0 ? selectedSeats.length * 25 : 0;
    // 18% GST on convenience fee
    const gst = Math.round(convenienceFee * 0.18);
    const total = subtotal + convenienceFee + gst;

    return {
      cinema,
      movie,
      showtime,
      seats: selectedSeats,
      subtotal,
      convenienceFee,
      gst,
      total
    };
  }

  /**
   * Complete checkout and simulate ticket dispatch
   */
  static async processPayment(cart: BookingCart, paymentMethod: string): Promise<{ success: boolean; bookingId: string; timestamp: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const bookingId = `CSP-VJA-${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      success: true,
      bookingId,
      timestamp: new Date().toISOString()
    };
  }
}
