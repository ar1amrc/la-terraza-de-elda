
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    username: "user",
  },
  {
    id: '997db02f-40c1-445b-830e-a1da560ad2a1',
    name: "Admin",
    email: "admin@nextmail.com",
    password: "admin123456",
    username: "admin",
  },
];

const experiences = [
  {
    id: '3bd2b39b-4c8e-4403-9dcb-d0a61cccc312',
    name: "City Tour",
    description: "Explore the city's landmarks with a guided tour.",
    images: [],
  },
  {
    id: '371c3c76-b6f4-4cd8-9510-ab69f035b0d4',
    name: "Cooking Class",
    description: "Learn to cook local dishes with a professional chef.",
    images: [],
  },
];

const services = [
  {
    id: 'ec84c1cc-030f-4cb2-8fac-b20223e708a3',
    name: "WiFi",
    description: "High-speed wireless internet.",
    icon: "wifi",
  },
  {
    id: 'a8610f62-6889-420b-a952-c6ce49a261a3',
    name: "Breakfast",
    description: "Complimentary breakfast included.",
    icon: "egg-fried",
  },
  {
    id: 'fbbc2ae9-c2fb-48e8-b6d2-7a73d3260d28',
    name: "Airport Shuttle",
    description: "Free shuttle to and from the airport.",
    price: 50,
    icon: "plane",
  },
  {
    id: '61f32498-f8e6-41af-bea2-e3dfb78597ae',
    name: "Washing",
    description: "Washing service",
    icon: "washing-machine",
    price: 10,
  },
  {
    id: '5dec5359-baa8-4d96-aada-aa9d68b8158e',
    name: "King Bed",
    description: "A large bed to rest",
    icon: "bed-double"  
  },
  {
    id: '6aa5bb5a-400b-4a91-b7a3-06497c63fcd7',
    name: "TV",
    description: "TV on room",
    icon: "tv"  
  }
];

const rooms = [
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
    capacity: 3,
    thumbnail: "3.jpeg",
    primaryServices: [
      services[4].id,
      services[5].id,
      services[1].id,
    ],
  },
  {
    id: 2,
    name: "Habitación Matrimonio",
    description: "Una suite matrimonial dividada en dos espacios, un espacio destinado a la habitación y otro para la cocina. *Si se requiere se puede añadir una cama extra. ",
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
    capacity: 3,
    primaryServices: [
      services[4].id,
      services[5].id,
      services[1].id,
    ],
  },
];

const roomService = [
  {
    roomId: rooms[0].id,
    serviceId: services[4].id,
  },
  {
    roomId: rooms[0].id,
    serviceId: services[1].id,
  },
  {
    roomId: rooms[0].id,
    serviceId: services[5].id,
  },
  {
    roomId: rooms[1].id,
    serviceId: services[1].id,
  },
  {
    roomId: rooms[1].id,
    serviceId: services[4].id,
  },
  {
    roomId: rooms[1].id,
    serviceId: services[5].id,
  }
]

const reservations = [
  {
    id: '51da7f41-64ac-458b-9ca7-93c8a5e7e0dc',
    roomId: rooms[0].id,
    userId: users[0].id,
    startDate: "2025-01-01",
    endDate: "2025-01-07",
    guests: 2,
    email: "john.doe@example.com",
    guestsData: "John Doe, Alice Smith",
    additionalData: '{"phone": "123-456-7890"}',
    amount: 300,
    status: "pending",
    experiences: [
      
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
    id: 'b0df309c-5661-4f0b-9346-2ade1f4f2b5e',
    roomId: rooms[1].id,
    userId: users[1].id,
    startDate: "2025-01-05",
    endDate: "2025-01-10",
    guests: 3,
    email: "jane.doe@example.com",
    guestsData: "Jane Doe, Bob Johnson, Alice Smith",
    additionalData: '{"phone": "987-654-3210"}',
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

const reservationExtraServices = [
  {
    reservationId: reservations[0].id,
    extraServiceId: services[2].id,
  },
  {
    reservationId: reservations[0].id,
    extraServiceId: services[3].id,
  },
]
const reservationExperiences = []


module.exports = {
  users,
  experiences,
  services,
  rooms,
  roomService,
  reservations,
  reservationExtraServices
  // add more exports as needed...
};
