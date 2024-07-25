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

export interface Service { 
    id: number;
    name: string;
    description: string;
    price?: number;
    icon?: string;
}

export interface Experience {
    id: number;
    name: string;
    description: string;
    images?: string[];
}

export interface Reservation {
    id: number;
    roomId: number;
    userId?: number;
    startDate: string;
    endDate: string;
    guests: number;
    email?: string;
    guestsData:  string;
    additionalData?: String;  // for example, custom fields for each experience
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
