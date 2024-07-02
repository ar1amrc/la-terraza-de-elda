
import { DropdownMenuComponenent } from "@/components/header/DropdownMenu";
import { NavMenu } from "@/components/header/NavMenu";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/get-dictionaries";
import { headers } from "next/headers";
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
      <header className="fixed top-0 w-full bg-white p-3 px-5 opacity-80">
        <div className="flex justify-between w-full">
          <p>Logo</p>
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
