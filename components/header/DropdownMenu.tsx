"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Menu } from "lucide-react";

export function DropdownMenuComponenent({ dictionary }: any) {
  const pathname = usePathname();

  return (
    <div className="sm:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-green-950 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Menu />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/" legacyBehavior passHref>
                {/* <NavigationMenuLink 
              className={navigationMenuTriggerStyle()}>
              {dictionary.header.Home.toUpperCase()}
            </NavigationMenuLink> */}
                {dictionary.header.Home.toUpperCase()}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/history"
                legacyBehavior
                passHref
                
              >
                {/* <NavigationMenuLink 
              className={navigationMenuTriggerStyle()}>
              {dictionary.header.Home.toUpperCase()}
            </NavigationMenuLink> */}
                <span className={clsx("text-gray-900", {
                  "pointer-events-none text-green-700 font-bold transition-colors":
                    pathname.includes("/history"),
                  "pointer-events-auto": !pathname.includes("/history"),
                })}>{dictionary.header.History.toUpperCase()}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/rooms" legacyBehavior passHref>
              <span className={clsx("text-gray-900", {
                  "pointer-events-none text-green-700 font-bold transition-colors":
                    pathname.includes("/rooms"),
                  "pointer-events-auto": !pathname.includes("/history"),
                })}>{dictionary.header.Rooms.toUpperCase()}</span>
                
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/gallery" legacyBehavior passHref>
              <span className={clsx("text-gray-900", {
                  "pointer-events-none text-green-700 font-bold transition-colors":
                    pathname.includes("/gallery"),
                  "pointer-events-auto": !pathname.includes("/history"),
                })}>{dictionary.header.Gallery.toUpperCase()}</span>
               
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/" legacyBehavior passHref>
                {/* <NavigationMenuLink 
              className={navigationMenuTriggerStyle()}>
              {dictionary.header.Home.toUpperCase()}
            </NavigationMenuLink> */}
                {dictionary.header.Home.toUpperCase()}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
