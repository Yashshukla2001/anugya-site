import { Reveal } from "@/components/ui/Reveal";
import { useSeo } from "@/hooks/useSeo";

export function PrivacyPolicy() {
  useSeo({ title: "Privacy Policy", path: "/privacy-policy" });

  return (
    <div className="px-6 pb-24 pt-36 lg:px-10">
      <Reveal className="mx-auto max-w-3xl">
        <h1 className="font-display text-display-lg text-charcoal-900">Privacy policy</h1>
        <p className="mt-6 text-charcoal-700">
          Full policy text pending from the property. This page is wired into navigation and routing now so
          it's ready to receive that copy without further development work.
        </p>
      </Reveal>
    </div>
  );
}
