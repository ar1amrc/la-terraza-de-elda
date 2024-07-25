import BreadcumbAdmin from "@/components/admin/breadcumb-admin";
import Form from "@/components/admin/forms/reservation.form";
import { getExperiences, getExperiencesSelect, getExtraServicesSelect, getRooms, getServicesSelect } from "@/lib/data";

const links = [
  {
    label: "Admin",
    href: "/admin",
  },
  {
    label: "Reservas",
    href: "/admin/reservations",
  },
];

export default async function Page() {
  const rooms = await getRooms();
  const experiences = await getExperiencesSelect()
  const services = await getExtraServicesSelect();

  
  return (
    <div>
      <BreadcumbAdmin links={links} page="Nueva Reserva"/>
      
      <Form rooms={rooms} experiences={experiences} services={services} />
    </div>
  );
}
