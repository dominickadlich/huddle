import UpdateForm from "@/app/ui/dashboard/edit-form";
import Breadcrumbs from "@/app/ui/directory/breadcrumbs";
import { fetchHuddleDataById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const report = await fetchHuddleDataById(id);

  console.log(`Report: ${[report]}`);

  if (!report) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Huddle Report", href: "/dashboard" },
          {
            label: "Edit Report",
            href: `/dashboard/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="flex justify-center">
        <UpdateForm huddle_data={report} />
      </div>
    </main>
  );
}
