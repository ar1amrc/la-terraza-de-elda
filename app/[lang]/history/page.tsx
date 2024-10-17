import { lora } from "@/app/fonts";
import Image from "next/image";

export default function Page() {
  return (
    <section className="lg:px-40 pt-16">
      <div className="flex py-8 gap-6">
        <Image
          src="/images/fachada.jpg"
          alt="fachada"
          className="rounded-sm shadow-md shadow-slate-600 hover:skew-y-1 hover:skew-x-1 transition-transform"
          width={200}
          height={200}
        />
        <h2
          className={`${lora.className} font-semibold text-lg text-pretty italic `}
        >
          La Terraza de Elda se encuentra ubicada en la última planta de un
          palacete de estilo ecléctico en la calle 23 del barrio del Vedado, al
          este de la Habana Vieja y muy cerca del Malecón. Construido en la
          década de 1930, tras la colonización por parte de las clases burguesas
          de los terrenos que se abrían hacia el río Almendares, la casa cuenta
          con amplios espacios interiores con grandes entradas de luz. La
          cuidada decoración interior es fruto de la minuciosa restauración de
          los elementos originales. Su propietaria hasta la década del 70 fue
          Doña María Enriqueta Ermenegilda Martínez y Herrera, descendiente de
          españoles y a la que apodaban cariñosamente La Condesa pues era bien
          conocida su cuantiosa fortuna, herencia de sus padres, en las
          provincias de Pontevedra, Vigo y A Coruña.
        </h2>
      </div>
      <div className="flex py-8 gap-6">
        <h2
          className={`${lora.className} font-semibold text-lg text-pretty italic `}
        >
          En los años 80 la casa fue adquirida por Elda Carrillo, costurera de
          profesión y escritora de vocación, la cual reformó completamente la
          casa y la convirtió además de su vivienda en un templo para la cultura
          y el arte. Bajo su propiedad la casa ha servido como set para
          largometrajes cinemátograficos, estudio y set fotográfico y hogar de
          una compañía de espectáculos. Además, gracias a la sensibilidad
          artistica y su gran capacidad de componer canciones, la señora Elda
          Carrillo se ha juntado con muchos cantantes de renombre de la época
          como Elena Burke, la cual grabó su último disco sólo con canciones de
          Elda, disco además grabado en la casa en un estudio de grabación que
          creo la anfitriona de la casa. Por último, la señora Carrillo llevó a
          cabo por más de 10 años, una peña artistica que se efectuaba en la
          terraza de la casa el primer domingo de cada mes completamente gratis
          pero que recogia donaciones que luego se entregaban al hospital de
          oncologia de La Habana en forma de insumos.
        </h2>
        <Image
          src="/images/pelicula.jpeg"
          alt="fachada"
          className="rounded-sm shadow-md shadow-slate-600 hover:skew-y-1 hover:skew-x-1 transition-transform"
          width={250}
          height={200}
        />
      </div>
      <div className="flex py-8 gap-6 mb-8  ">
        <Image
          src="/images/fachada.jpg"
          alt="fachada"
          className="rounded-sm shadow-md shadow-slate-600 hover:skew-y-1 hover:skew-x-1 transition-transform"
          width={200}
          height={200}
        />
        <h2
          className={`${lora.className} font-semibold text-lg text-pretty italic `}
        >
          Posterior al fallecimiento de la señora Elda Carrillo, la casa fue
          heredada por su hija, la cual ha decidido convertir parte de la casa
          en un hostal y así también compartir un poco del arte y la historia
          del lugar. El espacio destinado a ello está formado por dos lujosas
          suites con baño y cocina cada una decoradas con un alto sentido de
          modernidad aprovechando características de la arquitectura propiamente
          neocolonial y el brutalismo creando un conjunto que incide con las
          últimas tendencias vanguardistas y artísticas a nivel decorativo. A
          esto se suma el hecho de que las habitaciones se fusionan con el nivel
          de majestuosidad impresa en la construcción original. Una vista
          privilegiada de gran parte de la capital y el mar, así como el acceso
          a diferentes estancias de la vivienda familiar, le harán sentir como
          en casa.
        </h2>
      </div>
    </section>
  );
}
