import { buildWhatsAppLink, siteConfig } from "@/config/siteConfig";

export interface BookingBarEnquiry {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  roomType?: string;
}

export interface RoomEnquiry {
  roomName: string;
  price: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  name?: string;
  phone?: string;
}

export interface ContactFormEnquiry {
  name: string;
  phone: string;
  email?: string;
  enquiryType?: string;
  message: string;
}

const GREETING = `Hello ${siteConfig.hotelName},`;

/** General booking-bar enquiry (brief §13). */
export function bookingBarWhatsAppLink(fields: BookingBarEnquiry = {}): string {
  const message = [
    GREETING,
    "",
    "I would like to enquire about a stay.",
    "",
    `Name: `,
    `Phone: `,
    `Check-in: ${fields.checkIn ?? ""}`,
    `Check-out: ${fields.checkOut ?? ""}`,
    `Guests: ${fields.guests ?? ""}`,
    `Room: ${fields.roomType ?? ""}`,
    `Special Request: `,
    "",
    "Please share availability and pricing.",
  ].join("\n");

  return buildWhatsAppLink(message);
}

/** Contextual per-room enquiry (brief §14). */
export function roomWhatsAppLink(fields: RoomEnquiry): string {
  const message = [
    GREETING,
    "",
    "I am interested in booking:",
    "",
    `Room: ${fields.roomName}`,
    `Price: ${fields.price}`,
    "",
    `Check-in: ${fields.checkIn ?? ""}`,
    `Check-out: ${fields.checkOut ?? ""}`,
    `Guests: ${fields.guests ?? ""}`,
    "",
    `Name: ${fields.name ?? ""}`,
    `Phone: ${fields.phone ?? ""}`,
    "",
    "Please share availability and booking details.",
  ].join("\n");

  return buildWhatsAppLink(message);
}

/** Contact form enquiry (brief §28). */
export function contactFormWhatsAppLink(fields: ContactFormEnquiry): string {
  const message = [
    GREETING,
    "",
    "I have an enquiry.",
    "",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone}`,
    `Email: ${fields.email ?? ""}`,
    `Enquiry Type: ${fields.enquiryType ?? ""}`,
    `Message: ${fields.message}`,
    "",
    "Please assist me.",
  ].join("\n");

  return buildWhatsAppLink(message);
}
