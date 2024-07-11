"use client";

import { DeleteDialog } from "@/components/admin/delete-dialog";
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
import { deleteExperience } from "@/lib/actions/experience-actions";
import { Experience } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PencilIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Experience>[] = [
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
    id: "actions",
    cell: ({ row }) => {
      const experience = row.original;

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
                <DropdownMenuItem>
                  <Link href={`/admin/experiencies/${experience.id}/edi`}>
                    Editar Experiencia
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e)=>{e.preventDefault()}}>
                  <DeleteDialog action={deleteExperience} id={experience.id} fromMenu={true}/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden md:flex md:gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link
                href={`/admin/experiencies/${experience.id}/edit`}
                className="rounded-md border p-2 hover:bg-gray-100"
              >
                <PencilIcon />
              </Link>
            </Button>
            <DeleteDialog action={deleteExperience} id={experience.id} />
          </div>
        </>
      );
    },
  },
];
