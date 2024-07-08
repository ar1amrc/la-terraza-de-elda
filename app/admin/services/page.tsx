import { getServices } from "@/lib/data";
import { DataTableServices } from "./data-table";
import { columns } from "./columns";

export default async function Page() {
  const services = await getServices();

  return (
    <>
      <DataTableServices columns={columns} data={services} />
    </>
  );
}
