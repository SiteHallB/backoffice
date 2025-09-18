import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as HandleUploadBody;

        const json = await handleUpload({
        body,
        request: req,
        onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
            // 1) restreindre le dossier
            if (!pathname.startsWith('images/')) {
            throw new Error('Uploads limités au préfixe images/');
            }
            // 2) options de sécurité/validation
            return {
            allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
            addRandomSuffix: true,               // évite les collisions de noms
            tokenPayload: JSON.stringify({ uploadedAt: Date.now() }),
            // callbackUrl: process.env.VERCEL_BLOB_CALLBACK_URL, // pour tests callback en local via tunnel
            };
        },
        onUploadCompleted: async ({ blob, tokenPayload }) => {
            // Appelé par Vercel quand l’upload se termine (en prod automatiquement)
            // Ici, tu peux persister blob.url + méta en BDD si besoin.
            console.log('Upload OK:', blob.url, tokenPayload);
        },
        });

        return NextResponse.json(json);
    } catch (err: any) {
        return NextResponse.json({ error: err?.message ?? 'Upload error' }, { status: 400 });
    }
}
