import { Hero } from "@/components/sections/Hero";
import { BookingBar } from "@/components/sections/BookingBar";
import { IntroSection } from "@/components/sections/IntroSection";
import { RoomsGrid } from "@/components/sections/RoomsGrid";
import { AmenitiesTeaser } from "@/components/sections/AmenitiesTeaser";
import { ExperienceStrip } from "@/components/sections/ExperienceStrip";
import { GoogleReviewsSection } from "@/components/sections/GoogleReviewsSection";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { OurHotels } from "@/components/sections/OurHotels";
import { LocationTeaser } from "@/components/sections/LocationTeaser";
import { ClosingBrandSection } from "@/components/sections/ClosingBrandSection";
import { useSeo } from "@/hooks/useSeo";

export function Home() {
  useSeo({
    title: "Boutique Hotel in Indore",
    description:
      "Anugya Hotel & Boutique — a considered stay in Indore with six room types, real photography, and easy WhatsApp booking.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <BookingBar />
      <IntroSection />
      <section id="rooms">
        <RoomsGrid />
      </section>
      <AmenitiesTeaser />
      <ExperienceStrip />
      <GoogleReviewsSection />
      <InstagramSection />
      <FaqSection />
      <OurHotels />
      <LocationTeaser />
      <ClosingBrandSection />
    </>
  );
}
