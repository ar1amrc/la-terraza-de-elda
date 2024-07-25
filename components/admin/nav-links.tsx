'use client'


import clsx from 'clsx';
import { BedDoubleIcon, CalendarIcon, CarFrontIcon, DockIcon, HomeIcon, UserX2Icon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/admin', icon: HomeIcon },
  { name: 'Habitaciones', href: '/admin/rooms', icon: BedDoubleIcon },
  {
    name: 'Servicios',
    href: '/admin/services',
    icon: DockIcon,
  },
  { name: 'Experiencias', href: '/admin/experiences', icon: CarFrontIcon },
  { name: 'Reservas', href: '/admin/reservations', icon: CalendarIcon },
  { name: 'Usuarios', href: '/admin/users', icon: UserX2Icon },
];

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-teal-600': pathname === link.href,
              },
            )}          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
