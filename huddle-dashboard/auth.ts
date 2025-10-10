import NextAuth from "next-auth";
import { authConfig } from "./app/auth.config";
import Credentials from "next-auth/providers/credentials";
import Okta from "next-auth/providers/okta";
import { z } from 'zod'
import { User } from "./app/lib/definitions";
import bcrypt from 'bcrypt'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

async function getUser(email: string): Promise<User | undefined> {
    try {
        const { data, error } = await supabase
        .from("users")
        .select('*')
        .eq("email", email)
        .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error)
        throw new Error('Failed to fetch user.')
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: 
    [
        Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null
                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (passwordsMatch) return user;
            }

            console.log('Invalid Credentials')
            return null;
        },
    }), 
    
    // Okta
],
})