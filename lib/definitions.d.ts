import { iconsList } from "@/components/icons/icons";

export interface Room {
    id: number;
    name: string;
    description: string;
    thumbnail?: string;
    images?: string[];
    price: number;
    capacity: number;
    primaryServices: Service[];
    // extraServices?: Service[];
}

export type IconT = keyof typeof iconsList;

export interface Service { 
    id: number;
    name: string;
    description: string;
    price?: number;
    icon?: Icon;
}

export interface Experience {
    id: number;
    name: string;
    description: string;
    images?: string[];
}

export interface Reservation {
    id: number;
    room_id: number;
    user_id?: number;
    startdate: Date;
    enddate: Date;
    guests: number;
    email?: string;
    guestsdata:  string;
    additionaldata?: string;  // for example, custom fields for each experience
    amount: number;
    status: 'pending' | 'confirmed' | 'cancelled' ; 
    experiences?: Experience[];
    extraServices?: Service[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    username: string;
}

export interface Select {
    label: string;
    value: string | number;
}