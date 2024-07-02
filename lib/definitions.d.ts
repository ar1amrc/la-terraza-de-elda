export interface Room {
    id: number;
    name: string;
    description: string;
    image?: string[];
    price: number;
    capacity: number;
    primaryServices: Service[];
    secondaryServices?: Service[];
}

export interface Service { 
    id: number;
    name: string;
    description: string;
    price?: number;
}

export interface Experience {
    id: number;
    name: string;
    description: string;
}

export interface Reservation {
    id: number;
    roomId: number;
    userId?: number;
    startDate: string;
    endDate: string;
    guests: number;
    guestsData:  string;
    amount: number;
    status: string;
    experiences?: number[];
    email?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    username: string;
}