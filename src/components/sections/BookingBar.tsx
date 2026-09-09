import { useState, type ReactNode } from "react";
import { rooms } from "@/data/rooms";
import { bookingBarWhatsAppLink } from "@/lib/whatsapp";

export function BookingBar() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 guests");
  const [roomType, setRoomType] = useState("Any room");

  const href = bookingBarWhatsAppLink({ checkIn, checkOut, guests, roomType });

  return (
    <div className="relative z-10 mx-auto -mt-12 w-full max-w-5xl px-6 lg:-mt-16">
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/40 bg-white/25 p-2 shadow-glass backdrop-blur-xl lg:grid-cols-5">
        <Field label="Check-in">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent text-sm text-charcoal-900 outline-none"
          />
        </Field>
        <Field label="Check-out">
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent text-sm text-charcoal-900 outline-none"
          />
        </Field>
        <Field label="Guests">
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full bg-transparent text-sm text-charcoal-900 outline-none"
          >
            {["1 guest", "2 guests", "3 guests", "4+ guests"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </Field>
        <Field label="Room">
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full bg-transparent text-sm text-charcoal-900 outline-none"
          >
            <option>Any room</option>
            {rooms.map((r) => (
              <option key={r.slug}>{r.name}</option>
            ))}
          </select>
        </Field>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 flex items-center justify-center rounded-lg bg-charcoal-900 px-4 py-5 text-sm tracking-wide2 text-stone-50 shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal-800 hover:shadow-glow-lg lg:col-span-1"
        >
          Check availability
        </a>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-white/30 bg-white/50 px-4 py-3 backdrop-blur-sm transition-colors focus-within:border-gold-500/60 focus-within:bg-white/70 hover:bg-white/60">
      <p className="mb-1 text-[11px] text-charcoal-700/60">{label}</p>
      {children}
    </div>
  );
}
