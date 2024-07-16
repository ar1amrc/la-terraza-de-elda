import fs from "fs";

import { Experience, Reservation, Service, User } from "./definitions";
import { Experiences, Reservations, Services, Users } from "./mocks";

export async function getServices(): Promise<Service[]> {
  return Services;
}

export async function getServicesById(
  id: string | number
): Promise<Service | undefined> {
  return Services.find((service) => service.id == id);
}

export async function getUsers(): Promise<User[]> {
  return Users;
}

export async function getExperiencies(): Promise<Experience[]> {
  return Experiences;
}

export async function getExperienciesById(
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
