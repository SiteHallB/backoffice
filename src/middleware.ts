import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
    matcher: [
    // Généré par CHAT GPT
    // protège tout sauf :
    //  - /assets/*  → passerelle d'images publique
    //  - _next/*    → fichiers internes Next
    //  - fichiers publics usuels (favicon, robots, etc.)
    //  - "/"        → page de login (sinon boucle)
    '/((?!assets/|_next/|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|apple-touch-icon.*|icon.*|$).*)',
  ],
    runtime: 'nodejs',
};