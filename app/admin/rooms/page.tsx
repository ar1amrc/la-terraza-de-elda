import { getRooms } from "@/lib/data";
import { DataTableRooms } from "./data-table";
import { columns } from "./columns";

export default async function Page() {
  const rooms = await getRooms();

  return (
    <>
      <DataTableRooms columns={columns} data={rooms} />
    </>
  );
}
