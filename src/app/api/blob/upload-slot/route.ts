// src/app/api/blob/upload-slot/route.ts
import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

const SLOTS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as const;
const ALLOWED_CT = ['image/svg']; // ajoute 'image/svg+xml' si tu en veux

export async function POST(req: Request) {
  const body = (await req.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // 1) On attend un chemin du type "slots/<slot>.<ext>"
        const okPrefix = pathname.startsWith('slots/');
        const slot = pathname.replace(/^slots\//, '').split('.')[0];

        if (!okPrefix || !SLOTS.includes(slot as any)) {
          throw new Error('Slot invalide');
        }

        return {
          // 2) Sécurité type MIME
          allowedContentTypes: ALLOWED_CT,
          // 3) On veut réécrire le même fichier à chaque remplacement
          addRandomSuffix: false,
          allowOverwrite: true,              // <— autorise l’écrasement
          cacheControlMaxAge: 60,            // <— CDN <= 60s pour refléter le nouveau contenu
          tokenPayload: JSON.stringify({ slot }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Upload OK:', blob.pathname, 'meta:', tokenPayload);
        // (Optionnel) Tu peux pinger un revalidateTag si tu caches des pages.
      },
    });

    return NextResponse.json(json);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Upload error' }, { status: 400 });
  }
}
