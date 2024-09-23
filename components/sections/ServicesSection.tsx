import { AirVent, BedDouble, EggFried, MapPin, Tv, WashingMachine } from "lucide-react";

export default function ServiceSection() {
  return (
    <section className="flex justify-evenly  w-full h-64 mt-16">
    <div className="flex flex-col gap-10">
      <h1 className="text-xl text-center">Servicios incluidos</h1>
      <div className="flex gap-10 items-start justify-center">
        <div className="flex flex-col items-center justify-center gap-2 ">
          <div className="bg-primary rounded-full border-yellow-200 border-2 p-2">
            <AirVent
              className="text-yellow-200"
              strokeWidth={1.5}
              height={32}
              width={32}
            />
          </div>
          <span className="text-center">
            Aire <br /> acondicionado
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 ">
          <div className="bg-primary rounded-full border-yellow-200 border-2 p-2">
            <BedDouble
              className="text-yellow-200"
              strokeWidth={1.5}
              height={32}
              width={32}
            />
          </div>
          <span className="text-center">
            Cama <br /> King
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 ">
          <div className="bg-primary rounded-full border-yellow-200 border-2 p-2">
            <EggFried
              className="text-yellow-200"
              strokeWidth={1.5}
              height={32}
              width={32}
            />
          </div>
          <span className="text-center">Desayuno</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 ">
          <div className="bg-primary rounded-full border-yellow-200 border-2 p-2">
            <Tv
              className="text-yellow-200"
              strokeWidth={1.5}
              height={32}
              width={32}
            />
          </div>
          <span className="text-center">TV</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 ">
          <div className="bg-primary rounded-full border-yellow-200 border-2 p-2">
            <WashingMachine
              className="text-yellow-200"
              strokeWidth={1.5}
              height={32}
              width={32}
            />
          </div>
          <span className="text-center">Lavado</span>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-4 ">
      <h1 className="text-xl text-center">Estamos ubicados aqui</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4397.231824878536!2d-82.39292839215818!3d23.132893401201706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88cd77f130743013%3A0x7a842047ab521fb5!2sHostal%20La%20Terraza%20de%20Elda!5e0!3m2!1ses!2ses!4v1724760554030!5m2!1ses!2ses"
        // width="600"
        // height="450"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <p className="flex">
        <MapPin /> Calle 23 No. 759 2c e/ Calle B y Calle C, La Habana, Cuba
      </p>
    </div>
  </section>
  );
}
