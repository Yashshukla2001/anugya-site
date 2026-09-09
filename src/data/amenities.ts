/**
 * All 74 property amenities from the client brief (§8), grouped per the
 * brief's suggested categorization (§9) and reconciled so every single
 * supplied item appears exactly once. Nothing added, nothing dropped —
 * including near-duplicates the client's own list contains twice
 * (e.g. "Family Room" / "Family Rooms", "Laundry" / "Laundry Services").
 */

export interface AmenityCategory {
  id: string;
  title: string;
  icon: string; // lucide-react icon name
  items: string[];
}

export const amenityCategories: AmenityCategory[] = [
  {
    id: "guest-services",
    title: "Guest services",
    icon: "ConciergeBell",
    items: [
      "Front Desk — 24/7",
      "Private Check-in / Check-out",
      "Laundry",
      "24-Hour Help Desk",
      "Room Service",
      "Wake-up Call",
      "Language Assistance",
      "24-Hour Housekeeping",
      "Bellboy Service",
      "Shoe Polish",
      "Dry Cleaning Service",
      "Laundry Services",
    ],
  },
  {
    id: "room-comfort",
    title: "Room comfort",
    icon: "BedDouble",
    items: [
      "Extra Long Beds",
      "Bathing Towels Available",
      "DTH Connection",
      "Electric Kettle",
      "Geyser",
      "Hair Dryer",
      "Hot & Cold Water",
      "Intercom",
      "Refrigerator",
      "TV",
      "Locker Facility",
      "Fan",
      "Attached Bathroom",
      "Telephones Available",
      "Slippers",
      "Shower",
      "Pillows",
      "Sofa",
      "Toiletries",
      "Bathtub",
      "Mini Fridge",
      "Bubble Bath",
    ],
  },
  {
    id: "dining",
    title: "Dining",
    icon: "UtensilsCrossed",
    items: ["Breakfast", "Meals Available", "In-room Dining", "Kids Meals"],
  },
  {
    id: "transport-access",
    title: "Transport & access",
    icon: "Car",
    items: [
      "Car Park",
      "Airport Transfers",
      "Paid Shuttle Services",
      "Pickup and Drop Facility",
      "Wheelchair Accessible",
      "Elevator",
      "Parking Available",
    ],
  },
  {
    id: "wellness-fitness",
    title: "Wellness & fitness",
    icon: "Dumbbell",
    items: ["Fitness and Exercise", "Fitness Centre", "Games", "Fitness Equipment such as Yoga Mat and Dumbbells"],
  },
  {
    id: "family-special-stays",
    title: "Family & special stays",
    icon: "Users",
    items: [
      "Family Room",
      "Extra Mattress on Request",
      "Family Rooms",
      "Honeymoon Suite",
      "VIP Room Facilities",
      "Interconnected Room",
    ],
  },
  {
    id: "safety-security",
    title: "Safety & security",
    icon: "ShieldCheck",
    items: [
      "CCTV",
      "Fire Extinguisher Available",
      "Security",
      "Full Power Backup",
      "No Smoking Room",
      "First Aid",
    ],
  },
  {
    id: "property-experience",
    title: "Property & experience",
    icon: "Building2",
    items: [
      "Free Wi-Fi",
      "City View",
      "Common Seating Area",
      "Balcony",
      "Newspaper",
      "RO Purifier",
      "Sewing Kit",
      "Shops Available",
      "Umbrella",
      "Seating Area",
      "Dustbins",
      "Kitchen",
      "Open Terrace",
    ],
  },
];

export const totalAmenityCount = amenityCategories.reduce((sum, c) => sum + c.items.length, 0);
