import CarouselRoom from "@/components/carousel-room";
import DrawerRoom from "@/components/drawer-room";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getRooms } from "@/lib/data";
import { Room } from "@/lib/definitions";
import { getIcon } from "@/lib/utils";
import Image from "next/image";

const getThumbnail = (room: Room) => {
  const thumbnail = room.thumbnail
    ? `/images/room/${room.id}/${room.thumbnail}`
    : "/images/casa.jpg";
  return thumbnail;
};

export default async function Page() {
  const rooms = await getRooms();

  return (
    <section className="lg:px-40 pt-16 bb-10 mt-4">
      <div className="flex flex-col items-center w-full gap-8 ">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="w-11/12 sm:w-9/12 shadow-md shadow-slate-200 "
          >
            <CardHeader className="items-center">
              <CardTitle className="text-3xl uppercase text-primary ">
                {room.name}
              </CardTitle>
              {/* <CardDescription>Habitación lujosa</CardDescription> */}
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 pb-4 sm:pb-2">
              <div className="flex flex-col justify-center gap-6">
                <CarouselRoom id={room.id} images={room.images} />
                <div className="flex flex-wrap items-center  gap-2">
                  {room.images?.map((image) => (
                    <Dialog key={image}>
                      <DialogTrigger asChild>
                        <Image
                          key={image}
                          src={`/images/room/${room.id}/${image}`}
                          alt={image}
                          width={50}
                          height={50}
                          className="rounded-sm hover:cursor-pointer"
                        />
                      </DialogTrigger>
                      <DialogContent className="w-fit bg-transparent border-transparent">
                        <DialogTitle></DialogTitle>
                        <Image
                          key={image}
                          src={`/images/room/${room.id}/${image}`}
                          alt={image}
                          width={300}
                          height={300}
                          className="rounded-sm hover:cursor-pointer"
                        />
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-10">
                <p className="text-base sm:text-lg">{rooms[0].description}</p>
                <div className="flex  gap-2">
                  40 m²
                  <span> | </span>
                  {rooms[0].price} € por noche
                </div>
                <div className="flex  gap-2">
                  {rooms[0].primaryServices.map((service) => (
                    <div key={service.id}>{getIcon(service.icon)}</div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <DrawerRoom room={room}/>
            </CardFooter>
          </Card>
        ))}

        <p>*Si no hay disponibilidad puede ponerse en contacto con nosotros y los ubicaremos en una habitación de un hostal vecino</p>
      </div>
    </section>
  );
}
