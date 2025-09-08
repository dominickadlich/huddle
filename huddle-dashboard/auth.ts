import NextAuth from "next-auth";
import { authConfig } from "./app/auth.config";
import Credentials from "next-auth/providers/credentials";
import { email, z } from "zod";
import { User } from "./app/lib/defintions";
import bcrypt from 'bcrypt';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getUser(email: string): Promise<User | undefined> {
    try {
        console.log('Looking for user with email:', email);

        const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)

        console.log('Query result:', { data, error });

        if (error) throw error

        return data && data.length > 0 ? data[0] : undefined
    } catch (error) {
        console.log('Database Error:', error)
        return undefined
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
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
        }),
    ],
});