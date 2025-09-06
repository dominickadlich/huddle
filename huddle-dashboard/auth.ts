import NextAuth from "next-auth";
import { authConfig } from "./app/auth.config";
import Credentials from "next-auth/providers/credentials";
import { email, z } from "zod";
import { User } from "./app/lib/defintions";
import bcrypt from 'bcrypt'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getUser(email: string): Promise<User | undefined> {
    try {
        const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('email', email)

        if (error) throw error

        return data[0]
    } catch (error) {
        console.log('Database Error:', error)
        return { message: 'Database Error: Failed to fetch User'}
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email, password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (passwordMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        });
    ],
});