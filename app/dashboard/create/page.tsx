import Form from "@/app/ui/dashboard/create-form";
import Breadcrumbs from "@/app/ui/directory/breadcrumbs";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Huddle Dashboard", href: "/dashboard" },
          {
            label: "Create Huddle Report",
            href: "/dashboard/create",
            active: true,
          },
        ]}
      />
      <div className="flex justify-center">
        <Form />
      </div>
    </main>
  );
}
