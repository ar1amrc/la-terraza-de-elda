import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lt(lang: string, text: string) {
  const texts = text.split("|");

  if (lang === "es") return texts[0];
  if (lang === "en") return texts[1] ?? texts[0];

  return text;
}

export function objectType(obj : any) : string{
  if(obj.name && obj.description && obj.images && obj.capacity && obj.primaryServices) return 'room'
  if(obj.name && obj.description && obj.images) return 'experience'
  return 'object'
}
