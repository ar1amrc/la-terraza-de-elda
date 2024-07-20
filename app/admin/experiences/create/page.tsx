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

export default function Page() {
  return (
    <div>
      <BreadcumbAdmin links={links} page="Nueva Experiencia"/>
      
      <Form />
    </div>
  );
}
