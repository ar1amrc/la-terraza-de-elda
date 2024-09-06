"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";


export default function ReviewsSection() {

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));


  return (
    <section className="flex flex-col justify-center items-center w-full py-4">
        <span className="text-3xl p-3"> Nuestros huespédes opinan: </span>
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-screen-xl"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="pl-4">
            <CarouselItem className=" p-2 basis-1/3">
              <div className="flex flex-col shadow-md shadow-slate-400  rounded-md bg-zinc-50 p-2 gap-2 h-60">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage
                      src="/images/avatar/claudiatarin.png"
                      alt="Claudia"
                    />
                    <AvatarFallback>CT</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-bold text-primary">
                      Claudia Tarin Herrera
                    </h2>
                    <p className="text-sm">on Maps</p>
                  </div>
                </div>

                <p className="italic indent-3 leading-tight">
                  Es un lugar increible. Te maravilla su fabulosa arquitecta,
                  sus hermosas vistas y lo mas importante la atención y
                  alojamiento, que para mi en este lugar es impagable, no podria
                  ser mejor. Recomiendo este lugar para aquellos que quieran
                  privacidad y a los q quieran conocer la Habana, esta ubicado
                  en una de las calles principales y desde ahi puedes
                  desplazarte a cualquier punto de La Habana.
                </p>
              </div>
            </CarouselItem>

            <CarouselItem className=" p-2 basis-1/3">
              <div className="flex flex-col shadow-md shadow-slate-400  rounded-md bg-zinc-50 p-2 gap-2 h-60">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage
                      src="/images/avatar/cristina.jpg"
                      alt="Cristina"
                    />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-bold text-primary">Cristina</h2>
                    <p className="text-sm">on Tripadvisor</p>
                  </div>
                </div>

                <p className="italic indent-3 leading-tight">
                  Lo mejor que nos llevamos de Cuba es sin duda habernos alojado
                  en esta casa. Isbel fue encantador y nos enseñó todo lo
                  necesario, además de todo lo que aprendimos con el, fue muy
                  atento para ayudarnos con todo !! Las habitaciones estaban muy
                  limpias y el desayuno muy rico y completo. Ubicación muy buena
                  y trato inmejorable!
                </p>
              </div>
            </CarouselItem>

            <CarouselItem className=" p-2 basis-1/3">
              <div className="flex flex-col shadow-md shadow-slate-400  rounded-md bg-zinc-50 p-2 gap-2 h-60">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage
                      src="/images/avatar/sonia.jpg"
                      alt="Sonia"
                    />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-bold text-primary">Sonia N</h2>
                    <p className="text-sm">on Tripadvisor</p>
                  </div>
                </div>

                <p className="italic indent-3 leading-tight">
                  Localización genial en el bonito barrio de Vedado, recibimos
                  un trato excelente por parte de Isbel y toda la familia. La
                  terraza es el lugar perfecto para disfrutar de atardeceres
                  preciosos tomando una cerveza fresquita. Las habitaciones eran
                  acogedoras y limpias y con servicio de aire acondicionado.
                </p>
              </div>
            </CarouselItem>

            <CarouselItem className=" p-2 basis-1/3">
              <div className="flex flex-col shadow-md shadow-slate-400  rounded-md bg-zinc-50 p-2 gap-2 h-60 group hover:h-80 hover:transition-all">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage
                      src="/images/avatar/sabri.jpg"
                      alt="sabri"
                    />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-bold text-primary">Sabri_T88</h2>
                    <p className="text-sm">on Tripadvisor</p>
                  </div>
                </div>

                <p className="h-40 italic indent-3 leading-tight line-clamp-[8] group-hover:line-clamp-none group-hover:text-sm">
                  Durante nuestra estancia de cuatro noches nos decidimos por la
                  Terraza de elda. no podríamos tener mejor, está ubicado en el
                  Vedado en la calle principal de La Habana y todo está muy
                  céntrico. Todo está cerca. Las familias que viven en la misma
                  casa fueron muy amables, nos sentimos como una familia más. Lo
                  mejor es la terraza con vista a la ciudad y al mar desde donde
                  se puede ver el amanecer y el atardecer. Isbel, quien es
                  responsable de los invitados, nos dio una idea de la vida
                  cubana, nos informaron de todo. Definitivamente regresaremos a
                  La Habana y reservaremos la Terraza de Elda. Nos gustaría
                  agradecer a toda la familia y especialmente a Isbel por el
                  tiempo que nos cuidó. VOLVEREMOS
                </p>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* <p>Claudia Tarin Herrera Maps</p> <p>Es un lugar increible. Te maravilla su fabulosa arquitecta, sus hermosas vistas y lo mas importante la atención y alojamiento, que para mi en este lugar es impagable, no podria ser mejor. Recomiendo este lugar para aquellos que quieran privacidad y a los q quieran conocer la Habana, esta ubicado en una de las calles principales y desde ahi puedes desplazarte a cualquier punto de la Habana</p>
      <p>cristina trip avisor</p><p>Una experiencia increíble
      Lo mejor que nos llevamos de Cuba es sin duda habernos alojado en esta casa. Isbel fue encantador y nos enseñó todo lo necesario, además de todo lo que aprendimos con el, fue muy atento para ayudarnos con todo !! Las habitaciones estaban muy limpias y el desayuno muy rico y completo. Ubicación muy buena y trato inmejorable!</p>
      <p>Sonia N</p><p>Recomendado 100%
Localización genial en el bonito barrio de Vedado, recibimos un trato excelente por parte de Isbel y toda la familia.
La terraza es el lugar perfecto para disfrutar de atardeceres preciosos tomando una cerveza fresquita.
Las habitaciones eran acogedoras y limpias y con servicio de aire acondicionado.

Recommended 100%.
The location is great in the beautiful area of Vedado.
The attention received was excellent, Isbel is a wonderful host. The roof terrace is the perfect spot to see the beautiful sunsets while enjoying a cold beer.
The rooms were nice, tidy and clean and had air conditioning.</p>
      <p>Sabri_T88 </p><p>Enamorado
Durante nuestra estancia de cuatro noches nos decidimos por la Terraza de elda. no podríamos tener mejor, está ubicado en el Vedado en la calle principal de La Habana y todo está muy céntrico. Todo está cerca. Las familias que viven en la misma casa fueron muy amables, nos sentimos como una familia más. Lo mejor es la terraza con vista a la ciudad y al mar desde donde se puede ver el amanecer y el atardecer. Isbel, quien es responsable de los invitados, nos dio una idea de la vida cubana, nos informaron de todo. Definitivamente regresaremos a La Habana y reservaremos la Terraza de Elda. Nos gustaría agradecer a toda la familia y especialmente a Isbel por el tiempo que nos cuidó.
VOLVEREMOS</p>
      <p></p><p></p>
      <p></p><p></p>
      <p></p><p></p> */}
      </section>

  );
}
