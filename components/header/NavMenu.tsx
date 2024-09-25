"use client";

import LocaleSwitcher from "@/components/locale-switcher";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function NavMenu({ dictionary }: any) {
  const pathname = usePathname();

  return (
    <NavigationMenu className="hidden lg:flex justify-end w-full">
      <NavigationMenuList className="flex justify-end w-full">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink 
              className={navigationMenuTriggerStyle()}>
              {dictionary.header.Home.toUpperCase()}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/history" legacyBehavior passHref>
            <NavigationMenuLink
              className={clsx(navigationMenuTriggerStyle(), {
                "pointer-events-none border-b-2 border-green-800 rounded-none transition-colors": pathname.includes("/history"),
                "pointer-events-auto": !pathname.includes("/history") ,
              })}>
              {dictionary.header.History.toUpperCase()}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/rooms" legacyBehavior passHref>
            <NavigationMenuLink 
              className={clsx(navigationMenuTriggerStyle(), {
                "pointer-events-none border-b-2 border-green-800 rounded-none transition-colors": pathname.includes("/rooms"),
                "pointer-events-auto": !pathname.includes("/rooms") ,
              })}>
              {dictionary.header.Rooms.toUpperCase()}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/gallery" legacyBehavior passHref>
            <NavigationMenuLink
              className={clsx(navigationMenuTriggerStyle(), {
                "pointer-events-none border-b-2 border-green-800 rounded-none transition-colors": pathname.includes("/gallery"),
                "pointer-events-auto": !pathname.includes("/gallery") ,
              })}
            >
              {dictionary.header.Gallery.toUpperCase()}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <LocaleSwitcher />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
