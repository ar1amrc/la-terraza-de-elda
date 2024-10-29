import { Experience, Reservation, Room, Service, User } from "./definitions";

export const Rooms: Room[] = [
  {
    id: 1,
    name: "Habitación Familiar",
    description:
      "Una habitación muy amplia con una cama matrimonio y otra personal, cuenta con cocina totalmente equipada y un gran armario. Decorada con elementos del siglo XX dandole un toque tradicional mezclando con el diseño moderno.",
    images: [
      // "1.jpeg", 
      "2.jpeg", 
      "3.jpeg", 
      "4.jpeg", 
      "5.jpeg"],
    price: 300,
    capacity: 4,
    thumbnail: "3.jpeg",
    primaryServices: [
      {
        id: 1,
        name: "WiFi",
        description: "High-speed wireless internet.",
        icon: "wifi",
      },
      {
        id: 2,
        name: "Breakfast",
        description: "Complimentary breakfast included.",
        icon: "egg-fried",
      },
    ],
  },
  {
    id: 2,
    name: "Habitación Amor",
    description: "A comfortable room for budget travelers.",
    images: [
      "1.jpeg",
      "2.jpeg",
      "3.jpeg",
      "4.jpeg",
      "5.jpeg",
      "6.jpeg",
      "7.jpeg",
    ],
    thumbnail: "3.jpeg",
    price: 100,
    capacity: 2,
    primaryServices: [
      {
        id: 1,
        name: "WiFi",
        description: "High-speed wireless internet.",
        icon: "wifi",
      },
      {
        id: 2,
        name: "Breakfast",
        description: "Complimentary breakfast included.",
        icon: "egg-fried",
      },
    ],
  },
];

export const Services: Service[] = [
  {
    id: 1,
    name: "WiFi",
    description: "High-speed wireless internet.",
    icon: "wifi",
  },
  {
    id: 2,
    name: "Breakfast",
    description: "Complimentary breakfast included.",
    icon: "egg-fried",
  },
  {
    id: 3,
    name: "Airport Shuttle",
    description: "Free shuttle to and from the airport.",
    price: 50,
    icon: "plane",
  },
  {
    id: 4,
    name: "Spa",
    description: "Access to the spa and wellness center.",
    price: 100,
  },
  {
    id: 5,
    name: "Private Beach",
    description: "Relax on a private beach with a view of the ocean.",
    price: 150,
  },
  {
    id: 6,
    name: "Private Pool",
    description: "Relax on a private pool with a view of the ocean.",
    price: 200,
  },
  {
    id: 7,
    name: "Private Garden",
    description: "Relax on a private garden with a view of the ocean.",
    price: 100,
  },
  {
    id: 8,
    name: "Private Dining Room",
    description: "Relax on a private dining room with a view of the ocean.",
    price: 150,
  },
  {
    id: 9,
    name: "Private Kids' Pool",
    description: "Relax on a private kids' pool with a view of the ocean.",
    price: 50,
  },
  {
    id: 10,
    name: "Private Beachside Restaurant",
    description:
      "Relax on a private beachside restaurant with a view of the ocean.",
    price: 100,
  },
  {
    id: 11,
    name: "Private Poolside Bar",
    description: "Relax on a private poolside bar with a view of the ocean.",
    price: 50,
  },
  {
    id: 12,
    name: "Private Beachside Bar",
    description: "Relax on a private beachside bar with a view of the ocean.",
    price: 50,
  },
];

export const Experiences: Experience[] = [
  {
    id: 1,
    name: "City Tour",
    description: "Explore the city's landmarks with a guided tour.",
    images: ["ar.jpg", "dp.jpg"],
  },
  {
    id: 2,
    name: "Cooking Class",
    description: "Learn to cook local dishes with a professional chef.",
  },
];

export const Reservations: Reservation[] = [
  {
    id: 1,
    room_id: 1,
    user_id: 1,
    startdate: new Date("2025-01-01"),
    enddate:  new Date("2025-01-07"),
    guests: 2,
    email: "john.doe@example.com",
    guestsdata: "John Doe, Alice Smith",
    additionaldata: '{"phone": "123-456-7890"}',
    amount: 300,
    status: "pending",
    experiences: [
      {
        id: 2,
        name: "Cooking Class",
        description: "Learn to cook local dishes with a professional chef.",
      },
    ],
    extraServices: [
      {
        id: 3,
        name: "Airport Shuttle",
        description: "Free shuttle to and from the airport.",
        price: 50,
        icon: "plane",
      },
    ],
  },
  {
    id: 2,
    room_id: 2,
    user_id: 2,
    startdate:  new Date("2025-01-05"),
    enddate:  new Date("2025-01-10"),
    guests: 3,
    email: "jane.doe@example.com",
    guestsdata: "Jane Doe, Bob Johnson, Alice Smith",
    additionaldata: '{"phone": "987-654-3210"}',
    amount: 100,
    status: "confirmed",
    experiences: [
      {
        id: 1,
        name: "City Tour",
        description: "Explore the city's landmarks with a guided tour.",
        images: [],
      },
    ],
    extraServices: [
      {
        id: 4,
        name: "Spa",
        description: "Access to the spa and wellness center.",
        price: 100,
      },
    ],
  },
];

export const Users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "securepassword123",
    username: "johnny",
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice.smith@example.com",
    password: "anothersecurepassword456",
    username: "alice_s",
  },
];
