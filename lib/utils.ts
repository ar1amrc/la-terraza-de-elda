import { iconsList } from "@/components/icons/icons";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type IconT } from "@/lib/definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lt(lang: string, text: string) {
  const texts = text.split("|");

  if (lang === "es") return texts[0];
  if (lang === "en") return texts[1] ?? texts[0];

  return text;
}

export function objectType(obj: any): string {
  if (
    obj.name &&
    obj.description &&
    obj.images &&
    obj.capacity &&
    obj.primaryServices
  )
    return "room";
  if (obj.name && obj.description && obj.images) return "experience";
  return "object";
}

export function getIcon(icon: IconT) {
  if (icon === undefined) return null;
  type iconType = typeof iconsList
  
  if (icon in iconsList ) return iconsList[icon];
}
