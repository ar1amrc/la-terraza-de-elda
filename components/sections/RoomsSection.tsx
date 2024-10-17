import { getRooms } from "@/lib/data";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Room } from "@/lib/definitions";
import { iconsList } from "../icons/icons";
import { getIcon } from "@/lib/utils";

const getThumbnail = (room: Room) => {
  const thumbnail = room.thumbnail ?
    `/images/room/${room.id}/${room.thumbnail}` : "/images/casa.jpg";
  return thumbnail;
};
export default async function RoomsSection() {
  const rooms = await getRooms();

  return (
    <section className="flex flex-col lg:flex-row lg:justify-evenly items-center w-full gap-6 lg:gap-0  mt-16">
      <Card className="w-[375px] h-[375px] sm:w-[450px] sm:h-[350px] shadow-md shadow-slate-200 hover:scale-105 transition-transform">
        <CardHeader>
          <CardTitle>{rooms[0].name}</CardTitle>
          {/* <CardDescription>Habitación lujosa</CardDescription> */}
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pb-4 sm:pb-2">
          <div className="flex gap-3">
            <Image
              src={getThumbnail(rooms[0])}
              alt={rooms[0].name}
              width={100}
              height={100}
              className="rounded-sm"
            />
            <p>{rooms[0].description}</p>
          </div>
          <div className="flex gap-2">
            {rooms[0].primaryServices.map((service) => (
              <div key={service.id}>{getIcon(service.icon)}</div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="default">Reservar</Button>
        </CardFooter>
      </Card>

      <Card className="w-[375px] h-[375px] sm:w-[450px] sm:h-[350px] shadow-md shadow-slate-200 hover:scale-105 transition-transform">
        <CardHeader>
          <CardTitle>{rooms[1].name}</CardTitle>
          {/* <CardDescription>Habitación lujosa</CardDescription> */}
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pb-4 sm:pb-2">
          <div className="flex gap-3">
            <Image
              src={getThumbnail(rooms[1])}
              alt={rooms[1].name}
              width={100}
              height={100}
              className="rounded-sm"
            />
            <p>{rooms[0].description}</p>
          </div>
          <div className="flex gap-2">
            {rooms[1].primaryServices.map((service) => (
              <div key={service.id}>{getIcon(service.icon)}</div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="default">Reservar</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
