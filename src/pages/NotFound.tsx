import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-display-lg text-charcoal-900">Page not found</h1>
      <Link to="/" className="mt-6 text-sm tracking-wide2 text-charcoal-900 underline underline-offset-4">
        Return home
      </Link>
    </div>
  );
}
