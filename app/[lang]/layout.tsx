
import { DropdownMenuComponenent } from "@/components/header/DropdownMenu";
import { NavMenu } from "@/components/header/NavMenu";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/get-dictionaries";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Layout({
  children,
  params: {lang}
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(lang);
  
  return (
    <>
      <header className="fixed top-0 w-full bg-white p-3 px-5 opacity-80 z-50">
        <div className="flex justify-between w-full">
          <Image src='/images/logo.png' alt="logo" className="rounded-full aspect-square" width={40} height={40}  />
          <NavMenu dictionary={dictionary}/>
          <DropdownMenuComponenent dictionary={dictionary}/>
        </div>
      </header>
      <main className="flex min-h-screen flex-col">{children}</main>
      <footer className="flex justify-between w-full">
        <p>Footer</p>
      </footer>
    </>
  );
}
