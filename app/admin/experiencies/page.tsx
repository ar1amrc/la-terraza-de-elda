import { getExperiencies } from "@/lib/data";
import { DataTableExperiencies } from "./data-table";
import { columns } from "./columns";

export default async function Page() {
  const experiencies = await getExperiencies();

  return (
    <>
      <DataTableExperiencies columns={columns} data={experiencies} />
    </>
  );
}
