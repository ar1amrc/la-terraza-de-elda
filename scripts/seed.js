const { db } = require("@vercel/postgres");
const {
  experiences,
  users,
  rooms,
  services,
  roomService,
  reservations,
  reservationExtraServices
} = require("../lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        username VARCHAR(64) NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, username)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.username})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedExperiences(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS experiences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    images TEXT[] DEFAULT NULL
  );
`;

    console.log(`Created "experiences" table`);

    // Insert data into the "invoices" table
    const insertedExperiences = await Promise.all(
      experiences.map(
        (experience) => client.sql`
        INSERT INTO experiences (name, description, images)
        VALUES (${experience.name}, ${experience.description}, ${experience.images})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedExperiences.length} experiences`);

    return {
      createTable,
      experiences: insertedExperiences,
    };
  } catch (error) {
    console.error("Error seeding experiences:", error);
    throw error;
  }
}

async function seedServices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "services" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS services (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price NUMERIC(5,2) DEFAULT 0,
        icon VARCHAR(50) DEFAULT NULL
      );
    `;

    console.log(`Created "services" table`);

    // Insert data into the "customers" table
    const insertedServices = await Promise.all(
      services.map(
        (service) => client.sql`
        INSERT INTO services (id, name, description, price, icon)
        VALUES (${service.id}, ${service.name}, ${service.description}, ${service.price}, ${service.icon})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedServices.length} services`);

    return {
      createTable,
      services: insertedServices,
    };
  } catch (error) {
    console.error("Error seeding services:", error);
    throw error;
  }
}

async function seedRooms(client) {
  try {
    // Create the "rooms" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS rooms (
        id SMALLSERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        images TEXT[] DEFAULT NULL,
        price NUMERIC(5,2) DEFAULT 0,
        capacity INT DEFAULT 3,
        thumbnail VARCHAR(100) DEFAULT NULL
      );
    `;

    console.log(`Created "rooms" table`);

    // Insert data into the "customers" table
    const insertedRooms = await Promise.all(
      rooms.map(
        (room) => client.sql`
        INSERT INTO rooms (id, name, description, images, price, capacity, thumbnail)
        VALUES (${room.id}, ${room.name}, ${room.description}, ${room.images}, ${room.price}, ${room.capacity}, ${room.thumbnail})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedRooms.length} rooms`);

    return {
      createTable,
      services: insertedRooms,
    };
  } catch (error) {
    console.error("Error seeding services:", error);
    throw error;
  }
}

async function seedRoomService(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS roomService (
        room_id INT REFERENCES rooms,
        service_id UUID REFERENCES services,
        CONSTRAINT roomService_pk PRIMARY KEY(room_id,service_id) );
    `;

    console.log(`Created "roomService" table`);

    // Insert data into the "revenue" table
    const insertedRoomService = await Promise.all(
      roomService.map(
        (rev) => client.sql`
        INSERT INTO roomService (room_id, service_id)
        VALUES (${rev.roomId}, ${rev.serviceId})
      `
      )
    );

    console.log(`Seeded ${insertedRoomService.length} rooms services`);

    return {
      createTable,
      roomService: insertedRoomService,
    };
  } catch (error) {
    console.error("Error seeding rooms services:", error);
    throw error;
  }
}

async function seedReservations(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createEnum =
      await client.sql`DROP TYPE IF EXISTS status; 
        CREATE TYPE status AS ENUM ('pending', 'confirmed', 'cancelled');`;

    // Create the "reservations" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS reservations (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        room_id INT,
        user_id UUID,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        guests INT DEFAULT 3,
        email TEXT NOT NULL,
        guestsData TEXT NOT NULL,
        additionalData TEXT,
        amount NUMERIC(5,2) DEFAULT 0,
        status status,
        CONSTRAINT fk_room_id FOREIGN KEY(room_id) REFERENCES rooms(id),
        CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id)
      );
    `;

    console.log(`Created "reservations" table`);

    // Insert data into the "customers" table
    const insertedReservations = await Promise.all(
      reservations.map(
        (reservation) => client.sql`
        INSERT INTO reservations (id, room_id, user_id, startDate, endDate, guests, email, guestsData, additionalData, amount, status)
        VALUES (${reservation.id}, ${reservation.roomId}, ${reservation.userId}, ${reservation.startDate}, ${reservation.endDate}, ${reservation.guests}, ${reservation.email}, ${reservation.guestsData}, ${reservation.additionalData}, ${reservation.amount}, ${reservation.status})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedReservations.length} reservations`);

    return {
      createEnum,
      createTable,
      reservations: insertedReservations,
    };
  } catch (error) {
    console.error("Error seeding reservations:", error);
    throw error;
  }
}

async function seedReservationExtraServices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS reservationExtraServices (
        reservation_id UUID REFERENCES reservations,
        service_id UUID REFERENCES services, 
        CONSTRAINT reservationExtraServices_pk PRIMARY KEY(reservation_id,service_id) );
    `;

    console.log(`Created "reservationExtraServices" table`);

    // Insert data into the "revenue" table
    const insertedReservationExtraServices = await Promise.all(
      reservationExtraServices.map(
        (rev) => client.sql`
        INSERT INTO reservationExtraServices (reservation_id, service_id)
        VALUES (${rev.reservationId}, ${rev.extraServiceId})
      `
      )
    );

    console.log(`Seeded ${insertedReservationExtraServices.length} reservation Extra Services`);

    return {
      createTable,
      reservationExtraServices: insertedReservationExtraServices,
    };
  } catch (error) {
    console.error("Error seeding reservation Extra Services:", error);
    throw error;
  }
}

async function seedReservationExperiences(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS reservationExperiences (
        reservation_id UUID REFERENCES reservations,
        experience_id UUID REFERENCES experiences,
        CONSTRAINT reservationExperiences_pk PRIMARY KEY(reservation_id,experience_id) );
    `;

    console.log(`Created "reservationExperiences" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding reservation Experiences:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedExperiences(client);
  await seedServices(client);
  await seedRooms(client);
  await seedRoomService(client);
  await seedReservations(client);
  await seedReservationExtraServices(client);
  await seedReservationExperiences(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
