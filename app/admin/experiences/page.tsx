import { getExperiences } from "@/lib/data";
import { DataTableExperiences } from "./data-table";
import { columns } from "./columns";

export default async function Page() {
  const experiences = await getExperiences();

  return (
    <>
      <DataTableExperiences columns={columns} data={experiences} />
    </>
  );
}
