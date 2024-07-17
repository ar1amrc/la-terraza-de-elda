import Form from "@/components/admin/room-form";
import BreadcumbAdmin from "@/components/admin/breadcumb-admin";
import { getServicesSelect } from "@/lib/data";

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

export default async function Page() {
  const services = await getServicesSelect()

  return (
    <div>
      <BreadcumbAdmin links={links} page="Nueva Habitación"/>
      
      <Form services={services}/>
    </div>
  );
}
