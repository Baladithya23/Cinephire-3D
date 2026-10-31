import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  Info, 
  Download, 
  Share2, 
  MapPin, 
  Clock, 
  Sparkles,
  QrCode
} from 'lucide-react';
import { BookingCart } from '../types/cinema';
import { BookingService } from '../services/bookingService';

interface CheckoutModalProps {
  cart: BookingCart | null;
  onClose: () => void;
  onBookingSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  cart,
  onClose,
  onBookingSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!cart) return null;

  const handlePayNow = async () => {
    setIsProcessing(true);
    try {
      const result = await BookingService.processPayment(cart, paymentMethod);
      if (result.success) {
        setConfirmedBookingId(result.bookingId);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onBookingSuccess();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg my-auto bg-[#0C111F] border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-amber-500/10 text-white"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedBookingId ? (
          /* Step 1: Order Summary & Payment Gateway */
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Vijayawada Cinema Booking Checkout
              </span>
              <h3 className="text-xl font-bold font-display text-white mt-1">
                Confirm Seats & Payment
              </h3>
            </div>

            {/* Movie & Cinema Info Banner */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex gap-3 items-center">
              <img 
                src={cart.movie.poster} 
                alt={cart.movie.title} 
                className="w-12 h-16 object-cover rounded-lg border border-slate-700 shrink-0"
              />
              <div className="overflow-hidden">
                <h4 className="font-bold text-white text-sm truncate">{cart.movie.title}</h4>
                <div className="text-xs text-amber-400 font-semibold mt-0.5 truncate">
                  {cart.cinema.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {cart.showtime.screenName} • {cart.showtime.time} ({cart.showtime.language})
                </div>
              </div>
            </div>

            {/* Price Transparency Disclaimer */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-relaxed flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Demo Pricing Notice:</strong> All ticket amounts shown are sample rates for demonstration. 
                In production, the final rate is governed by the state cinema tariff schedule and active booking API.
              </span>
            </div>

            {/* Itemized Billing Breakdown */}
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>
                  Ticket Price ({cart.seats.length} × Seats: {cart.seats.map(s => s.id).join(', ')}):
                </span>
                <span className="font-semibold text-white">₹{cart.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Convenience Fee (Demonstration rate):</span>
                <span>₹{cart.convenienceFee}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Integrated GST (18% on convenience):</span>
                <span>₹{cart.gst}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Total Amount to Pay:</span>
                <span className="text-amber-400 text-base">₹{cart.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Select Payment Mode:
              </span>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                    paymentMethod === 'upi'
                      ? 'bg-amber-500/20 border-amber-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-semibold">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500/20 border-amber-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-semibold">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                    paymentMethod === 'netbanking'
                      ? 'bg-amber-500/20 border-amber-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-semibold">NetBanking</span>
                </button>
              </div>

              {/* UPI Input */}
              {paymentMethod === 'upi' && (
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-xs text-slate-400">Enter UPI ID (e.g. mobile@upi, name@okaxis)</span>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="9876543210@paytm"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <span>Supports PhonePe, Google Pay, BHIM, Paytm & CRED</span>
                  </div>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Confirming with Vijayawada Cinema Hub...</span>
              ) : (
                <span>Pay ₹{cart.total.toLocaleString()} & Get 3D Ticket</span>
              )}
            </button>
          </div>
        ) : (
          /* Step 2: Instant Booking Confirmation & Digital M-Ticket */
          <div className="space-y-5 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">
                Booking Confirmed!
              </span>
              <h3 className="text-xl font-black font-display text-white mt-1">
                Your CineSphere 3D Ticket is Ready
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Booking ID: <strong className="text-amber-400">{confirmedBookingId}</strong>
              </p>
            </div>

            {/* Digital M-Ticket Card */}
            <div className="relative p-5 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#0C111F] border border-amber-500/40 text-left space-y-4 shadow-xl">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">{cart.movie.title}</h4>
                  <div className="text-xs text-amber-400 font-semibold mt-0.5">
                    {cart.cinema.name}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {cart.cinema.locality}, Vijayawada
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white text-slate-950">
                  <QrCode className="w-10 h-10" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Showtime</span>
                  <span className="font-bold text-white">{cart.showtime.time}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Auditorium</span>
                  <span className="font-bold text-cyan-400 truncate block">{cart.showtime.screenName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Seats</span>
                  <span className="font-bold text-amber-400">{cart.seats.map(s => s.id).join(', ')}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-[11px] text-slate-400">
                <span>Amount Paid: <strong className="text-white">₹{cart.total}</strong></span>
                <span className="text-emerald-400 font-semibold">● M-Ticket Active</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  alert(`Digital M-Ticket saved! Booking ID: ${confirmedBookingId}`);
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Save M-Ticket</span>
              </button>

              <button
                onClick={onClose}
                className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
