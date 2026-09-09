import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";

// Route-based code splitting (brief §39) — each page ships as its own
// chunk instead of one monolithic bundle. Home is imported eagerly since
// it's the most likely first paint; everything else lazy-loads on
// navigation.
import { Home } from "@/pages/Home";
const Rooms = lazy(() => import("@/pages/Rooms").then((m) => ({ default: m.Rooms })));
const RoomDetail = lazy(() => import("@/pages/RoomDetail").then((m) => ({ default: m.RoomDetail })));
const Amenities = lazy(() => import("@/pages/Amenities").then((m) => ({ default: m.Amenities })));
const Experience = lazy(() => import("@/pages/Experience").then((m) => ({ default: m.Experience })));
const Gallery = lazy(() => import("@/pages/Gallery").then((m) => ({ default: m.Gallery })));
const Location = lazy(() => import("@/pages/Location").then((m) => ({ default: m.Location })));
const Contact = lazy(() => import("@/pages/Contact").then((m) => ({ default: m.Contact })));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })));
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

function PageLoader() {
  // A slim indeterminate bar at the very top of the viewport — there's no
  // real progress percentage for a dynamic import(), so this sweeps rather
  // than fills. Route chunks are small and load fast, so this is usually
  // seen for a few hundred ms, not a lingering spinner.
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden" aria-hidden="true">
        <div className="h-full w-1/3 animate-loading-bar bg-gold-500" />
      </div>
      <div className="min-h-[60vh]" />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route
          path="rooms"
          element={
            <Suspense fallback={<PageLoader />}>
              <Rooms />
            </Suspense>
          }
        />
        <Route
          path="rooms/:slug"
          element={
            <Suspense fallback={<PageLoader />}>
              <RoomDetail />
            </Suspense>
          }
        />
        <Route
          path="amenities"
          element={
            <Suspense fallback={<PageLoader />}>
              <Amenities />
            </Suspense>
          }
        />
        <Route
          path="experience"
          element={
            <Suspense fallback={<PageLoader />}>
              <Experience />
            </Suspense>
          }
        />
        <Route
          path="gallery"
          element={
            <Suspense fallback={<PageLoader />}>
              <Gallery />
            </Suspense>
          }
        />
        <Route
          path="location"
          element={
            <Suspense fallback={<PageLoader />}>
              <Location />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<PageLoader />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="privacy-policy"
          element={
            <Suspense fallback={<PageLoader />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
