import Form from "@/app/ui/directory/edit-form";
import Breadcrumbs from "@/app/ui/directory/breadcrumbs";
import { fetchExtensionById } from "@/app/lib/data";
import { notFound } from "next/navigation";


export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const id = params.id
    const extension = await fetchExtensionById(id)

    console.log(`Extension: ${[extension]}`);

    if (!extension) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs 
                breadcrumbs={[
                    { label: 'Extensions', href: '/directory' },
                    {
                        label: 'Edit Extension',
                        href: `/directory/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form extension={extension}/>
        </main>
    )
}