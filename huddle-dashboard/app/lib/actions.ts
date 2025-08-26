'use server'

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
// import { AuthError } from 'next-auth'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)


const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        // required_error: 'Please select a contact.',
    }).min(1, 'Please select a contact.'),
    extension: z.coerce
        .number({
            // required_error: 'Please enter an extension.',
            // invalid_type_error: 'Extension must be a number.',
        })
        .gt(0, { message: 'Please enter a valid extension.' }),
    date: z.string(),
});

const CreateExtension = FormSchema.omit({ id: true, date: true });
const UpdateExtension = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        extension?: string[];
    };
    message?: string | null;
}


export async function createExtension(prevState: State, formData: FormData) {
    const validatedFields = CreateExtension.safeParse({
        customerId: formData.get('customerId'),
        extension: formData.get('extension'),
    });

    // If form validation fails, return errors early. Otherwise, continue
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create extension.'
        };
    }

    // Prepare data for insertion into the database
    const { customerId, extension } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    try {
        const { data, error } = await supabase
        .from('central_directory')
        .insert([{
            customer_id: customerId,
            extension: extension,
            date: date
        }])

        if (error) throw error
        return { message: 'Extension created successfully!' }
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to create extension.' };
    }
}

export async function updateExtension(
    id: string,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdateExtension.safeParse({
        customer_id: formData.get('customerId'),
        extension: formData.get('extension'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to update extension'
        };
    }

    const { customerId, extension } = validatedFields.data;

    try {
        const { data, error } = await supabase
        .from('central_directory')
        .update({
            customer_id: customerId,
            extension: extension,
        })
        .eq('id', id)

        if (error) throw error
        return { message: 'Successfully updated contact!' }
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Failed to updated extension' };
    }
}


export async function deleteExtension(id: string) {
    // Throw new Error('Failed to Delete Extension')

    try {
        const { data, error } = await supabase
        .from('central_directory')
        .delete()
        .eq('id', id)

        if (error) throw error

        revalidatePath('/dashboard/directory')
        return { message: 'Extension deleted successfully!' }
    } catch (error) {
        console.error('Database Error:', error)
        return { message: 'Database Error: Failed to delete extension' };
    }
}


// export async function authenticate(
//     prevState: string | undefined,
//     formData: FormData,
// ) {
//     try {
//         await signIn('credentials', formData);
//     } catch (error) {
//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case 'CredentialSignin':
//                     return 'Invalid credentials';
//                 default:
//                     return 'Something went wrong.';
//             }
//         }
//         throw error;
//     }
// }