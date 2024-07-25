import {
  getExperiencesSelect,
  getExtraServicesSelect,
  getReservationsById,
  getRooms,
} from "@/lib/data";
import { notFound } from "next/navigation";
import BreadcumbAdmin from "@/components/admin/breadcumb-admin";
import Form from "@/components/admin/forms/reservation.form";

const links = [
  {
    label: "Admin",
    href: "/admin",
  },
  {
    label: "Servicios",
    href: "/admin/reservations",
  },
];

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const reservation = await getReservationsById(id);

  if (!reservation) {
    //todo: cambiar condicion
    notFound();
  }

  const rooms = await getRooms();
  const experiences = await getExperiencesSelect();
  const services = await getExtraServicesSelect();

  const extra = reservation.extraServices ? Array.from(reservation.extraServices, (service) => {
    return { label: service.name, value: service.id.toString() };
  }) : [];

  const exp = reservation.experiences ? Array.from(reservation.experiences, (experience) => {
    return { label: experience.name, value: experience.id.toString() };
  }) : [];

  return (
    <div>
      <BreadcumbAdmin links={links} page="Editar Reserva" />

      <Form rooms={rooms} experiences={experiences} services={services} reservation={reservation} exp={exp} extra={extra}/>
    </div>
  );
}
