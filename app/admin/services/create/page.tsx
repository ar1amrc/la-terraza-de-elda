import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Form from "@/components/admin/service-form";
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

export default function Page() {
  return (
    <div>
      <BreadcumbAdmin links={links} page="Nuevo Servicio"/>
      
      <Form />
    </div>
  );
}
