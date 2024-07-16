import { getReservations } from "@/lib/data";
import { DataTableReservations } from "./data-table";
import { columns } from "./columns";

export default async function Page() {
  const reservations = await getReservations();

  return (
    <>
      <DataTableReservations columns={columns} data={reservations} />
    </>
  );
}
