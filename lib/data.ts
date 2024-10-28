import fs from "fs";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from 'next/cache';

import {
  Experience,
  Reservation,
  Room,
  Select,
  Service,
  User,
} from "./definitions";
import { Experiences, Reservations, Rooms, Services, Users } from "./mocks";
import { Option } from "@/components/ui/multiple-selector";

export async function getServices(): Promise<Service[]> {
  try {
    const data = await sql<Service>`SELECT * FROM services`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch services data.");
  }
  // return Services;
}

export async function getServicesSelect(): Promise<Option[]> {
  try {
    const data =
      await sql<Option>`SELECT services.name as label, services.id as value FROM services`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch services data.");
  }

  // const services = Array.from(Services, (service) => {
  //   return { label: service.name, value: service.id.toString() };
  // });

  // return services;
}

export async function getExtraServicesSelect(): Promise<Option[]> {
  try {
    const data =
      await sql<Option>`SELECT services.name as label, services.id as value 
                        FROM services 
                        WHERE services.price is not null OR services.price > 0`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch services data.");
  }

  // return services;
}

export async function getServicesById(
  id: string | number
): Promise<Service | undefined> {
  try {
    const data = await sql<Service>`SELECT *
                        FROM services 
                        WHERE services.id = ${id}`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch services data.");
  }

  return Services.find((service) => service.id == id);
}

export async function getUsers(): Promise<User[]> {
  try {
    const data = await sql<User>`SELECT * FROM users`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users data.");
  }
}

export async function getExperiences(): Promise<Experience[]> {
  try {
    const data = await sql<Experience>`SELECT * FROM experiences`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch experiences data.");
  }
}
export async function getExperiencesSelect(): Promise<Option[]> {
  try {
    const data =
      await sql<Option>`SELECT experiences.name as label, experiences.id as value 
                        FROM experiences`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch experiences data.");
  }
}
export async function getExperiencesById(
  id: string | number
): Promise<Experience | undefined> {
  noStore()
  try {
    const data = await sql<Experience>`SELECT *
                        FROM experiences 
                        WHERE experiences.id = ${id}`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch services data.");
  }
}

export async function getReservations() {
  try {
    const data = await sql<Reservation>`SELECT * FROM reservations`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch reservations data.");
  }
  return Reservations;
}

export async function getReservationsById(
  id: string | number
): Promise<Reservation | undefined> {
  try {
    noStore()
    const data = await sql<Reservation>`SELECT *
                        FROM reservations 
                        WHERE reservations.id = ${id}`;

   const servicesData = await sql<Service>`SELECT services.id, services.name, services.description, services.price, services.icon  FROM services JOIN reservationextraservices ON services.id = reservationextraservices.service_id WHERE reservationextraservices.reservation_id = ${id}`;
   const experiencesData = await sql<Experience>`SELECT experiences.id, experiences.name, experiences.description FROM experiences JOIN reservationexperiences ON experiences.id = reservationexperiences.experience_id WHERE reservationexperiences.reservation_id = ${id}`;
      
   const reservations = data.rows[0];
   reservations.extraServices = servicesData.rows;
   reservations.experiences = experiencesData.rows;
                    
                    
    return reservations;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch reservations data.");
  }
}

export async function getRooms() {
  try {
    // const data = await sql<Room>`SELECT * FROM rooms`;
    const data = await sql<Room>`SELECT * FROM rooms`;

    const rooms = data.rows;
    const roomsFiltered = await Promise.all(
      rooms.map(async (room) => {
        const servicesData =
          await sql<Service>`SELECT services.id, services.name, services.description, services.price, services.icon  FROM services JOIN roomservice ON services.id = roomservice.service_id WHERE roomservice.room_id = ${room.id}`;
        room.primaryServices = servicesData.rows;
        return room;
      })
    );

    //  getRoomServicesRoom(rooms)

    return roomsFiltered;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch rooms data.");
  }
  return Rooms;
}

export async function getRoomServicesRoom(rooms: Room[]) {
  rooms.map(async (room) => {
    await getRoomService(room);
  });
  return rooms;
}

export async function getRoomService(room: Room) {
  try {
    const servicesData =
      await sql<Service>`SELECT services.id, services.name, services.description, services.price, services.icon  FROM services JOIN roomservice ON services.id = roomservice.service_id WHERE roomservice.room_id = ${room.id}`;
    room.primaryServices = servicesData.rows;
    // return servicesData.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch rooms data.");
  }
}

export async function getRoomsById(
  id: string | number
): Promise<Room | undefined> {
  try {
    const data = await sql<Room>`SELECT *
                        FROM rooms 
                        WHERE rooms.id = ${id}`;
    const servicesData = await sql<Service>`SELECT services.id, services.name, services.description, services.price, services.icon  FROM services JOIN roomservice ON services.id = roomservice.service_id WHERE roomservice.room_id = ${id}`;
      
    const room = data.rows[0];
    room.primaryServices = servicesData.rows;

    return room;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch rooms data.");
  }
}
