import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  
    if (!params) { //todo: cambiar condicion
        notFound();
      }
  
    return <main></main>;
}
