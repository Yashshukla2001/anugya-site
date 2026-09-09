import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";

const beats = [
  { title: "Arrival", copy: "A private check-in, no counter queue.", image: "/assets/rooms/deluxe/02.jpg" },
  { title: "Stay", copy: "Warm materials, quiet service, soft lighting.", image: "/assets/rooms/premium/01.jpg" },
  { title: "Dining", copy: "Breakfast and in-room dining, kept simple.", image: "/assets/rooms/deluxe/03.jpg" },
];

export function ExperienceStrip() {
  return (
    <section className="bg-walnut-700 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between">
          <h2 className="font-display text-display-sm text-stone-50">The experience</h2>
          <Link to="/experience" className="hidden text-sm tracking-wide2 text-stone-200 underline underline-offset-4 sm:block">
            See the full experience
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {beats.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} className="overflow-hidden rounded-md">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={b.image} alt={b.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="bg-walnut-800 p-5">
                <p className="font-display text-lg text-stone-50">{b.title}</p>
                <p className="mt-1 text-sm text-stone-300">{b.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Link to="/experience" className="mt-8 inline-block text-sm tracking-wide2 text-stone-200 underline underline-offset-4 sm:hidden">
          See the full experience
        </Link>
      </div>
    </section>
  );
}
