import { DropdownMenuComponenent } from "@/components/header/DropdownMenu";
import { NavMenu } from "@/components/header/NavMenu";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import LocaleSwitcher from "@/components/locale-switcher";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/get-dictionaries";
import Image from "next/image";
import Link from "next/link";

export default async function Layout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <header className="fixed top-0 w-full bg-white p-3 px-5 opacity-80 z-50">
        <div className="flex justify-between w-full">
          <Image
            src="/images/logo.png"
            alt="logo"
            className="rounded-full aspect-square"
            width={40}
            height={40}
          />
          <NavMenu dictionary={dictionary} />
          <DropdownMenuComponenent dictionary={dictionary} />
        </div>
      </header>
      <main className="flex min-h-screen flex-col">{children}</main>
      <footer className="flex flex-col px-4 sm:px-0 sm:grid sm:grid-cols-5  w-full bg-primary  text-white">
        <div className="flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="logo"
            className="rounded-full aspect-square"
            width={120}
            height={120}
          />
        </div>

        <div className="sm:col-span-2 py-4">
          <h2 className="font-bold text-yellow-100">La Terraza de Elda</h2>
          <ul className="mt-2">
            <li>
              <span>Dirección: </span>
              <a
                className="text-yellow-100"
                target="_blank"
                href="https://maps.app.goo.gl/MTnqjR1AagCYBK896"
              >
                Calle 23 No. 759 2c e/ Calle B y Calle C, La Habana, Cuba
              </a>
            </li>
            <li>
              <span>Teléfono: </span>
              <a className="text-yellow-100" href="tel:+5378338150">
                +53 7 833 8150{" "}
              </a>
            </li>
            <li>
              <span>WhatsApp: </span>
              <a
                className="text-yellow-100"
                target="_blank"
                href="https://api.whatsapp.com/send?phone=5352822299"
              >
                +53 52 82 22 99{" "}
              </a>
            </li>
            <li>
              <span>Email: </span>
              <a
                className="text-yellow-100"
                target="_blank"
                href="mailto:laterrazadeelda@gmail.com"
              >
                laterrazadeelda@gmail.com
              </a>
            </li>
            <li>
              <Link href="">Política de Privacidad</Link>
            </li>
            <li>
              <Link href="">Contacto</Link>
            </li>
            <li>
              <LocaleSwitcher />
            </li>
          </ul>
        </div>
        <div className="py-4">
          <ul>
            <li>
              <Link href="/history">{dictionary.header.History}</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center  sm:block py-4">
          <h2 className="font-bold text-yellow-100 mb-2">Síguenos</h2>
          <div className="flex ">
            <Button>
              <Link
                target="_blank"
                href="https://www.facebook.com/profile.php?id=100063631778007"
              >
                <FacebookIcon />
              </Link>
            </Button>
            <Button>
              <Link
                target="_blank"
                href="https://www.instagram.com/terrazadeelda?igsh=MTMwaHprM3VieTAwaQ=="
              >
                <InstagramIcon />
              </Link>
            </Button>
          </div>
          <p>© La Terraza de Elda</p>
        </div>
      </footer>
    </>
  );
}
