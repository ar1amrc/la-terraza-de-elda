import { Locale } from "@/i18n-config";
import { SpanishFlag } from "./SpanishFlag";
import { EnglishFlag } from "./EnglishFlag";
import {
  AirVent,
  BaggageClaim,
  BedDouble,
  Car,
  Coffee,
  CreditCard,
  EggFried,
  Fan,
  Microwave,
  Phone,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Refrigerator,
  ShieldCheck,
  Snowflake,
  Tv,
  Utensils,
  Vault,
  WashingMachine,
  Wifi,
} from "lucide-react";

export const Flag = ({ locale }: { locale: Locale }) => {
  if (locale == "es")
    return (
      <SpanishFlag
        className={
          "transition-transform duration-300 hover:scale-110 motion-reduce:duration-0 motion-safe:transition motion-reduce:any-hover:scale-100"
        }
      />
    );
  if (locale == "en")
    return (
      <EnglishFlag
        className={
          "transition-transform duration-300 hover:scale-110 motion-reduce:duration-0 motion-safe:transition motion-reduce:any-hover:scale-100"
        }
      />
    );

  return (
    <EnglishFlag
      className={
        "transition-transform duration-300 hover:scale-110 motion-reduce:duration-0 motion-safe:transition motion-reduce:any-hover:scale-100"
      }
    />
  );
};

export const iconsList = {
  'air': <AirVent />,
  "baggage-claim": <BaggageClaim />,
  "bed-double": <BedDouble />,
  'car': <Car />,
  'coffee': <Coffee />,
  "credit-card": <CreditCard />,
  "egg-fried": <EggFried />,
  'fan': <Fan />,
  'microwave': <Microwave />,
  'phone': <Phone />,
  'plane': <Plane />,
  "plane-landing": <PlaneLanding />,
  "plane-takeoff": <PlaneTakeoff />,
  'refrigerator': <Refrigerator />,
  "shield-check": <ShieldCheck />,
  'snowflake': <Snowflake />,
  'tv': <Tv />,
  'utinsiles': <Utensils />,
  'vault': <Vault />,
  "washing-machine": <WashingMachine />,
  'wifi': <Wifi />,
};
