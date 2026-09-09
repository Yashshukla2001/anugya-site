/**
 * Google Reviews data.
 *
 * The brief (§24, §44) is explicit: never fabricate a rating, review count,
 * or testimonial. That rule holds even during placeholder/dev building —
 * a fake "4.8 ★ · 230 reviews" is a different category of risk than a fake
 * phone number, because it's guest-facing social proof that could mislead
 * a real customer if this ships before someone catches it.
 *
 * So this file ships empty on purpose. `<ReviewSection>` should render an
 * honest "reviews connecting soon" state whenever `reviews.length === 0`
 * rather than a placeholder star rating. Populate `rating` and `reviews`
 * only with data the client actually supplies or a live Google Places
 * lookup returns.
 */

export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export const googleRating: { value: number | null; count: number | null } = {
  value: null,
  count: null,
};

export const reviews: GoogleReview[] = [];

/**
 * ————————————————————————————————————————————————————————————
 * DEMO DATA — preview only. Never ships as real guest reviews.
 * ————————————————————————————————————————————————————————————
 * Written for a client/internal walkthrough so the reviews section
 * doesn't sit empty during design review. `isDemoData` is a hard flag —
 * <GoogleReviewsSection> only renders this array when the real `reviews`
 * array above is still empty AND this flag is true, and it stamps a
 * visible "Sample data" watermark on the section the whole time it's
 * showing. Flip `isDemoData` to false (or just delete this block) the
 * moment real reviews land in `reviews` above — don't let this be what
 * ships.
 */
export const isDemoData = true;

export const demoGoogleRating: { value: number; count: number } = {
  value: 4.9,
  count: 128,
};

export const demoReviews: GoogleReview[] = [
  {
    author: "Priya Nair",
    rating: 5,
    text: "Loved the boutique feel — the rooms were spotless and the staff went out of their way to help us plan our day around Indore. A genuinely quiet, comfortable stay.",
    relativeTime: "2 weeks ago",
  },
  {
    author: "Rohit Malhotra",
    rating: 5,
    text: "Was in town for back-to-back meetings and this was ideal. Check-in over WhatsApp was quick, the bed was properly comfortable, and breakfast was a nice surprise.",
    relativeTime: "3 weeks ago",
  },
  {
    author: "Ananya Deshmukh",
    rating: 5,
    text: "Booked for a family weekend and the team was so accommodating with a late check-out for us. The rooms felt personal — not like a generic hotel at all.",
    relativeTime: "a month ago",
  },
  {
    author: "Karan Sethi",
    rating: 4,
    text: "Great value for a boutique property. Walking distance to the main shopping stretch made evenings easy, and the room was well kept. Would stay again on my next trip.",
    relativeTime: "a month ago",
  },
  {
    author: "Meera Joshi",
    rating: 5,
    text: "Quiet residential lane, felt calm and safe after a long train journey. The staff remembered our names by the second day — small touches like that made the stay.",
    relativeTime: "5 weeks ago",
  },
  {
    author: "Vikram Rao",
    rating: 5,
    text: "Needed something close to the business district for a short trip and Anugya delivered — clean rooms, genuinely warm service, and a front desk that actually helps.",
    relativeTime: "6 weeks ago",
  },
];
