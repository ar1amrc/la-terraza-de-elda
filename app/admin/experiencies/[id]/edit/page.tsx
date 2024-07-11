import { getExperienciesById } from "@/lib/data";
import { notFound } from "next/navigation";
import BreadcumbAdmin from "@/components/admin/breadcumb-admin";
import Form from "@/components/admin/experience-form";

const links = [
  {
    label: "Admin",
    href: "/admin",
  },
  {
    label: "Experiencias",
    href: "/admin/experiencies",
  },
];

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const experience = await getExperienciesById(id)

  if (!experience) {
    //todo: cambiar condicion
    notFound();
  }

  return <main>
    <BreadcumbAdmin links={links} page="Editar Servicio"/>
      
      <Form  experience={experience}/>
  </main>;
}