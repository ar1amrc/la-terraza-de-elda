import { Experience, Service, User } from "./definitions";
import { Experiences, Services, Users } from "./mocks";

export async function getServices() : Promise<Service[]> {

    return Services
}

export async function getUsers() : Promise<User[]> { 

    return Users
}

export async function getExperiencies() : Promise<Experience[]> {

    return Experiences
}