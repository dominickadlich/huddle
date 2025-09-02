'use server'

// const d_day = "I'm having a baby" // Baby Violet's first commit.

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
    name: z.string().min(1, 'Please select a name.'),
    extension: z.string().min(0, 'Please enter an extension.'),
    created_at: z.string(),
});

const CreateExtension = FormSchema.omit({ id: true, created_at: true });
const UpdateExtension = FormSchema.omit({ id: true, created_at: true });
const CreateExtension = FormSchema.omit({ id: true, created_at: true });
const UpdateExtension = FormSchema.omit({ id: true, created_at: true });

export type State = {
    errors?: {
        name?: string[];
        extension?: string[];
    };
    message?: string | null;
}


export async function createExtension(prevState: State, formData: FormData) {
    const validatedFields = CreateExtension.safeParse({
        name: formData.get('name'),
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
    const { name, extension } = validatedFields.data;
    const created_at = new Date().toISOString().split('T')[0];
    const created_at = new Date().toISOString().split('T')[0];

    try {
        const { data, error } = await supabase
        .from('central_directory')
        .insert([{
            name: name,
            extension: extension,
            created_at: created_at
            created_at: created_at
        }])

        if (error) throw error

    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to create extension.' };
    }

    revalidatePath('/directory');
    redirect('/directory');
}

export async function updateExtension(
    id: string,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdateExtension.safeParse({
        name: formData.get('name'),
        extension: formData.get('extension'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to update extension'
        };
    }

    const { name, extension } = validatedFields.data;

    try {
        const { data, error } = await supabase
        .from('central_directory')
        .update({
            name: name,
            extension: extension,
        })
        .eq('id', id)

        if (error) throw error

    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Failed to update extension' };
    }

    revalidatePath('/directory');
    redirect('/directory');
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
        // return { message: 'Extension deleted successfully!' }
    } catch (error) {
        console.error('Database Error:', error)
        // return { message: 'Database Error: Failed to delete extension' };
        throw new Error('Failed to delete extension')
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