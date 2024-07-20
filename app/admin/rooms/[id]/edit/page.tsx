import { getRoomsById, getServicesSelect } from "@/lib/data";
import { notFound } from "next/navigation";
import BreadcumbAdmin from "@/components/admin/breadcumb-admin";
import Form from "@/components/admin/forms/room-form";

const links = [
  {
    label: "Admin",
    href: "/admin",
  },
  {
    label: "Habitaciones",
    href: "/admin/rooms",
  },
];
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const services = await getServicesSelect();
  const rooms = await getRoomsById(id);

  
  if (!rooms) {
    notFound();
  }
  
  const ps = Array.from(rooms.primaryServices, (service) => {
    return { label: service.name, value: service.id.toString() };
  });

 
  // const es =  rooms.extraServices ? Array.from(rooms.extraServices, (service) => {
  //   return { label: service.name, value: service.id.toString() };
  // }) : [];


  return (
    <main>
      <BreadcumbAdmin links={links} page="Editar Habitación" />

      <Form services={services} room={rooms} ps={ps} />
    </main>
  );
}
