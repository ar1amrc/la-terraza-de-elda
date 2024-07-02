import { Experience, Reservation, Room, Service, User } from "./definitions";

export const Rooms: Room[] = [
  {
    id: 1,
    name: "Deluxe Suite",
    description: "A luxurious suite with a beautiful sea view.",
    image: ["deluxe_suite_1.jpg", "deluxe_suite_2.jpg"],
    price: 300,
    capacity: 4,
    primaryServices: [
      {
        id: 1,
        name: "WiFi",
        description: "High-speed wireless internet.",
      },
      {
        id: 2,
        name: "Breakfast",
        description: "Complimentary breakfast included.",
      },
    ],
    secondaryServices: [
      {
        id: 3,
        name: "Airport Shuttle",
        description: "Free shuttle to and from the airport.",
        price: 50,
      },
      {
        id: 4,
        name: "Spa",
        description: "Access to the spa and wellness center.",
        price: 100,
      },
    ],
  },
  {
    id: 2,
    name: "Standard Room",
    description: "A comfortable room for budget travelers.",
    image: ["standard_room_1.jpg"],
    price: 100,
    capacity: 2,
    primaryServices: [
      {
        id: 1,
        name: "WiFi",
        description: "High-speed wireless internet.",
      },
    ],
  },
];

export const Services: Service[] = [
  {
    id: 1,
    name: "WiFi",
    description: "High-speed wireless internet.",
  },
  {
    id: 2,
    name: "Breakfast",
    description: "Complimentary breakfast included.",
  },
  {
    id: 3,
    name: "Airport Shuttle",
    description: "Free shuttle to and from the airport.",
    price: 50,
  },
  {
    id: 4,
    name: "Spa",
    description: "Access to the spa and wellness center.",
    price: 100,
  },
];

export const Experiences : Experience[] = [
    {
        "id": 1,
        "name": "City Tour",
        "description": "Explore the city's landmarks with a guided tour."
    },
    {
        "id": 2,
        "name": "Cooking Class",
        "description": "Learn to cook local dishes with a professional chef."
    }
];

export const Reservations : Reservation[] = [
    {
        "id": 1,
        "roomId": 1,
        "userId": 1,
        "startDate": "2024-07-10",
        "endDate": "2024-07-15",
        "guests": 2,
        "guestsData": "John Doe, Jane Doe",
        "amount": 1500,
        "status": "confirmed",
        "experiences": [1, 2],
        "email": "john.doe@example.com"
    },
    {
        "id": 2,
        "roomId": 2,
        "userId": 2,
        "startDate": "2024-08-01",
        "endDate": "2024-08-05",
        "guests": 1,
        "guestsData": "Alice Smith",
        "amount": 400,
        "status": "pending",
        "email": "alice.smith@example.com"
    }
];

export const Users : User[] = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "securepassword123",
        "username": "johnny"
    },
    {
        "id": 2,
        "name": "Alice Smith",
        "email": "alice.smith@example.com",
        "password": "anothersecurepassword456",
        "username": "alice_s"
    }
];

