import Form from "@/app/ui/directory/create-form";
import Breadcrumbs from "@/app/ui/directory/breadcrumbs";

export default async function Page() {
  return (
    <main className="px-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Directory", href: "/directory" },
          {
            label: "Create Extension",
            href: "/directory/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
