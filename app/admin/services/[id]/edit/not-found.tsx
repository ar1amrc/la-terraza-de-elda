import { BanIcon } from 'lucide-react';
import Link from 'next/link';

 
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <BanIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>No se pudo encontrar este servicio.</p>
      <Link
        href="/dashboard/services"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Ir atrás
      </Link>
    </main>
  );
}