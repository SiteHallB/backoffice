import type { NextAuthConfig } from 'next-auth';
import Google from "next-auth/providers/google"

const ALLOWED = (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
 
export const authConfig = {
    pages: {
        signIn: '/',
    },
    callbacks: {
        async signIn({ profile }) {
            const email = profile?.email?.toLowerCase();
            return !!email && ALLOWED.includes(email);
        },

        authorized: async ({ auth }) => !!auth,
    },
    providers: [Google],
} satisfies NextAuthConfig;