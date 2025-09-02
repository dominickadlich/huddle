import Form from "@/app/ui/directory/create-form";
import Breadcrumbs from "@/app/ui/directory/breadcrumbs";

export default async function Page() {
    return (
        <main>
            <Breadcrumbs 
                breadcrumbs={[
                    { label: 'Extensions', href: '/dashboard/directory' },
                    {
                        label: 'Create Extension',
                        href: '/dashboard/directory/create',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    )
}