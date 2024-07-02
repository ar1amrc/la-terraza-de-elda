import { Locale } from "@/i18n-config";
import { SpanishFlag } from "./SpanishFlag";
import { EnglishFlag } from "./EnglishFlag";

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
