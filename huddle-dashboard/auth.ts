import NextAuth from 'next-auth';
import { authConfig } from './app/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from './app/lib/definitions'; // Fixed typo
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getUser(email: string): Promise<User | undefined> {
    try {
        console.log('🔍 Searching for user with email:', email);
        
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)

        if (error) {
            console.error('❌ Supabase error:', error);
            throw error;
        }

        console.log('📊 Query result:', { 
            found: data?.length > 0,
            dataLength: data?.length,
            hasPassword: data?.[0]?.password ? 'Yes' : 'No'
        });

        return data?.[0];
    } catch (error) {
        console.error('🚨 Database Error:', error);
        throw new Error('Invalid Credentials');
    }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
            console.log('🚀 Starting authentication process...');
            console.log('📝 Received credentials:', {
                email: credentials?.email,
                hasPassword: credentials?.password ? 'Yes' : 'No'
            });

            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

            if (!parsedCredentials.success) {
                console.log('❌ Schema validation failed:', parsedCredentials.error);
                return null;
            }

            console.log('✅ Schema validation passed');

            const { email, password } = parsedCredentials.data;
            
            try {
                const user = await getUser(email);
                
                if (!user) {
                    console.log('❌ No user found');
                    return null;
                }

                console.log('✅ User found, checking password...');
                
                const passwordMatch = await bcrypt.compare(password, user.password);
                console.log('🔐 Password match:', passwordMatch);

                if (passwordMatch) {
                    console.log('🎉 Authentication successful');
                    return user;
                }
            } catch (error) {
                console.error('🚨 Error during authentication:', error);
            }

            console.log('❌ Invalid credentials - authentication failed');
            return null;
        },
    }),
  ],
});