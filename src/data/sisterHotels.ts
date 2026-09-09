/**
 * Sister properties, mentioned per client request (not built out as full
 * sites/pages — see chat: "small mention/cross-link on Anugya's site").
 *
 * Everything here is exactly what was supplied — a name and a rough area,
 * nothing more. No photos, no contact info, no pricing exist for these
 * two, so this deliberately stays text-only rather than using Anugya's
 * own photography to stand in for a different, unrelated property (that
 * would misrepresent what these hotels actually look like, not just be a
 * placeholder).
 *
 * Worth flagging back to the client: "Silver Sky (Twinkle Regency)" and
 * "Hotel Silver Sky" are near-identically named. Worth confirming these
 * are genuinely two separate properties and not the same one listed
 * twice before this ships.
 */

export interface SisterHotel {
  name: string;
  altName?: string;
  area: string;
}

export const sisterHotels: SisterHotel[] = [
  { name: "Silver Sky", altName: "Twinkle Regency", area: "Near Bombay Hospital, Indore" },
  { name: "Hotel Silver Sky", area: "Near Bombay Hospital, Indore" },
];
