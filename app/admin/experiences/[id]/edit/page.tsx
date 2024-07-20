import { getExperiencesById } from "@/lib/data";
import { notFound } from "next/navigation";
import BreadcumbAdmin from "@/components/admin/breadcumb-admin";
import Form from "@/components/admin/forms/experience-form";

const links = [
  {
    label: "Admin",
    href: "/admin",
  },
  {
    label: "Experiencias",
    href: "/admin/experiences",
  },
];

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const experience = await getExperiencesById(id)

  if (!experience) {
    //todo: cambiar condicion
    notFound();
  }

  return <main>
    <BreadcumbAdmin links={links} page="Editar Servicio"/>
      
      <Form  experience={experience}/>
  </main>;
}
