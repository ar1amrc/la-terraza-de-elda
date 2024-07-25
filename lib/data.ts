import fs from "fs";

import { Experience, Reservation, Room, Service, User } from "./definitions";
import { Experiences, Reservations, Rooms, Services, Users } from "./mocks";

export async function getServices(): Promise<Service[]> {
  return Services;
}

export async function getServicesSelect(): Promise<
  { label: string; value: string }[]
> {
  const services = Array.from(Services, (service) => {
    return { label: service.name, value: service.id.toString() };
  });

  return services;
}

export async function getExtraServicesSelect(): Promise<
  { label: string; value: string }[]
> {
  const services = Services.filter((services) => services.price != null);

  return Array.from(services, (service) => {
    return {
      label: `${service.name} - ${service.price}`,
      value: service.id.toString(),
    };
  });

  // return services;
}

export async function getServicesById(
  id: string | number
): Promise<Service | undefined> {
  return Services.find((service) => service.id == id);
}

export async function getUsers(): Promise<User[]> {
  return Users;
}

export async function getExperiences(): Promise<Experience[]> {
  return Experiences;
}
export async function getExperiencesSelect(): Promise<
  { label: string; value: string }[]
> {
  const experiences = Array.from(Experiences, (experience) => {
    return { label: experience.name, value: experience.id.toString() };
  });

  return experiences;
}
export async function getExperiencesById(
  id: string | number
): Promise<Experience | undefined> {
  return Experiences.find((experience) => experience.id == id);
}

export async function getReservations(): Promise<Reservation[]> {
  return Reservations;
}

export async function getReservationsById(
  id: string | number
): Promise<Reservation | undefined> {
  return Reservations.find((reservation) => reservation.id == id);
}

export async function getRooms(): Promise<Room[]> {
  return Rooms;
}

export async function getRoomsById(
  id: string | number
): Promise<Room | undefined> {
  return Rooms.find((room) => room.id == id);
}
