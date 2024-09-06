import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HistorySection() {
  return (
    <section className="flex justify-around items-center w-full px-2 lg:px-40 gap-10 mt-8">
      <Image
        src="/images/fachada.jpg"
        alt="fachada"
        className="rounded-sm shadow-md shadow-slate-600 hover:skew-y-1 hover:skew-x-1 transition-transform"
        width={200}
        height={200}
      />
      <div className="flex flex-col items-start justify-center gap-3 w-4/5">
        <h2 className="font-medium text-lg text-pretty italic">
          La Terraza de Elda se encuentra ubicada en la última planta de un
          palacete de estilo ecléctico construido en la década de 1930, tras la
          colonización por parte de las clases burguesas de los terrenos que se
          abrían hacia el río Almendares. Su propietaria hasta la década del 70
          fue Doña María Enriqueta Ermenegilda Martínez y Herrera, descendiente
          de españoles y a la que apodaban cariñosamente La Condesa pues era
          bien conocida su cuantiosa fortuna, herencia de sus padres, en las
          provincias de Pontevedra, Vigo y A Coruña.{" "}
        </h2>
        <Link
          href="/history"
          className="flex items-center justify-center hover:scale-105"
        >
          {" "}
          Continuar leyendo <ChevronRight width={16} height={16} />
        </Link>
      </div>
    </section>
  );
}
