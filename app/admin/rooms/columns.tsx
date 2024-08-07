"use client";

import { DeleteDialog } from "@/components/admin/delete-dialog";
import ThumbnailSelector from "@/components/admin/thumbnail-selector";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteRoom } from "@/lib/actions/room-actions";
import { Room } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<Room>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "nombre",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripción" sort={false} />
    ),
  },
  {
    id: "portada",
    accessorKey: "thumbnail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Portada" />
    ),
    cell: ({ row }) => {
      const thumbnail: string = row.getValue("portada");
      
      const src = thumbnail ? `/images/room/${row.original.id}/${thumbnail}` : '/images/casa.jpg';

      return (
        <div className="flex items-center">
          <ThumbnailSelector src={src} room={row.original} />
          {/* <Image src={src} alt={thumbnail ?? row.original.name} width={50} height={50} className="object-cover" /> */}
        </div>
      );
    },
  },
  {
    id: "precio",
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Precio" />
    ),
    cell: ({ row }) => {
      const amount: number = row.getValue("precio");

      const formatted = amount
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
        : "Gratis";

      return <div>{formatted}</div>;
    },
  },
  {
    id: "capacidad",
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacidad" />
    ),
    cell: ({ row }) => {
      const capacity: number = row.getValue("capacidad");
      return <div className="text-center">{capacity}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const room = row.original;

      return (
        <>
          <div className="block md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                {/* <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(room.id.toString())
                  }
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem>
                  <Link href={`/admin/rooms/${room.id}/edi`}>
                    Editar servicio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  <DeleteDialog
                    action={deleteRoom}
                    id={room.id}
                    fromMenu={true}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden md:flex md:gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link
                href={`/admin/rooms/${room.id}/edit`}
                className="rounded-md border p-2 hover:bg-gray-100"
              >
                <PencilIcon />
              </Link>
            </Button>
            <DeleteDialog action={deleteRoom} id={room.id} />
          </div>
        </>
      );
    },
  },
];
