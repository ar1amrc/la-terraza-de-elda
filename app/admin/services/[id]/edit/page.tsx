import { getServicesById } from "@/lib/data";
import { notFound } from "next/navigation";
import Form from "@/components/admin/forms/service-form";
import BreadcumbAdmin from "@/components/admin/breadcumb-admin";

const links = [
  {
    label: "Admin",
    href: "/admin",
  },
  {
    label: "Servicios",
    href: "/admin/services",
  },
];

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const service = await getServicesById(id)

  if (!service) {
    //todo: cambiar condicion
    notFound();
  }

  return <main>
    <BreadcumbAdmin links={links} page="Editar Servicio"/>
      
      <Form  service={service}/>
  </main>;
}
