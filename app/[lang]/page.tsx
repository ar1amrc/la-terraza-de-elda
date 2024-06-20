import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <section className="flex  justify-center items-center w-full h-64 bg-red-200">
      <p>slider video</p>
    </section>
      <section className="flex  justify-center items-center w-full h-64 bg-blue-200">
        <p>reseña historia</p>
      </section>
      <section className="flex  justify-center items-center w-full h-64 bg-gray-200">
        <p>opiniones</p>
      </section>
      <section className="flex  justify-center items-center w-full h-64 bg-yellow-200">
        <p>servicios</p>
      </section>
      
      <section className="flex  justify-center items-center w-full h-64 bg-green-200">
        <p>Faq</p>
      </section>
    </>
  );
}
