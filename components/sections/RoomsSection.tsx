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

export default async function RoomsSection() {

const rooms = await getRooms();

  return (
    <section className="flex  justify-center items-center w-full h-64 mt-10">
    <Card>
      <CardHeader>
        <CardTitle>{rooms[0].name}</CardTitle>
        <CardDescription>Habitación lujosa</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button variant="default" >Reservar</Button>
      </CardFooter>
    </Card>
    </section>
  );
}
