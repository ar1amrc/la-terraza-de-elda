"use client";

import { DeleteDialog } from "@/components/admin/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteReservation } from "@/lib/actions/reservation-actions";
import { Reservation } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PencilIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Reservation>[] = [
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
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => { 
      const status: string = row.getValue("status");
      const variant = status === "confirmed" ? "default" : (status ===  "pending" ? 'secondary' :'destructive');
      return <div className="capitalize"><Badge variant={variant}>{status}</Badge></div>;
    }
  },
  {
    id: 'datos',
    accessorKey: "guestsdata",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Datos" sort={false} />
    ),
  },
  {
    id:'fechas',
    accessorKey:'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fechas" />
    ),
    cell: ({ row }) => {
      
      return <div>{row.original.startdate.toLocaleDateString()} - {row.original.enddate.toLocaleDateString()}</div>;
    }
  },
  {
    id: "pago",
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pago" />
    ),
    cell: ({ row }) => {
      const amount: number = row.getValue("pago");

      const formatted = amount
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
        : "Servicio incluido";

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const reservation = row.original;

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
                    navigator.clipboard.writeText(reservation.id.toString())
                  }
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem>
                  <Link href={`/admin/reservations/${reservation.id}/edi`}>
                    Editar servicio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e)=>{e.preventDefault()}}>
                  <DeleteDialog action={deleteReservation} id={reservation.id} fromMenu={true}/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden md:flex md:gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link
                href={`/admin/reservations/${reservation.id}/edit`}
                className="rounded-md border p-2 hover:bg-gray-100"
              >
                <PencilIcon />
              </Link>
            </Button>
            <DeleteDialog action={deleteReservation} id={reservation.id} />
          </div>
        </>
      );
    },
  },
];
