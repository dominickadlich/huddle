import Form from "@/app/ui/dashboard/create-form";
import Breadcrumbs from "@/app/ui/directory/breadcrumbs";

export default async function Page() {
    return (
        <main>
            <Breadcrumbs 
                breadcrumbs={[
                    { label: 'Huddle Report', href: '/dashboard' },
                    {
                        label: 'Create Huddle Report',
                        href: '/dashboard/create',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    )
}