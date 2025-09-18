'use client';

import SignoutButton from "@/components/login/signout-button";
import getUsername from "@/components/login/get-username";

import { useRef, useState } from 'react';
import type { PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';

function UploadSection() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [lastBlob, setLastBlob] = useState<PutBlobResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setUploading(true);
        try {
            const file = inputRef.current?.files?.[0];
            if (!file) throw new Error('Aucun fichier sélectionné');

            const res = await upload(`images/${file.name}`, file, {
                access: 'public',                 // URL publique (idéale pour assets)
                handleUploadUrl: '/api/blob/upload', // notre route qui signe l’upload
                contentType: file.type,           // aide à sécuriser côté client aussi
            });

            setLastBlob(res);

            if (inputRef.current) inputRef.current.value = '';
        } catch (err: any) {
            setError(err?.message ?? 'Erreur inconnue');
        } finally {
            setUploading(false);
        }
    }

    return (
        <section>
            <form onSubmit={onSubmit}>
                <input ref={inputRef} type="file" accept="image/svg" required />
                <button type="submit" disabled={uploading} style={{ marginLeft: 8 }}>
                {uploading ? 'Upload…' : 'Uploader'}
                </button>
            </form>

            {error && <p style={{ color: 'crimson' }}>Erreur : {error}</p>}

            {lastBlob && (
                <section style={{ marginTop: 24 }}>
                <p><strong>URL:</strong> <a href={lastBlob.url} target="_blank">{lastBlob.url}</a></p>
                <img src={lastBlob.url} alt="Dernier upload" style={{ maxWidth: '100%', borderRadius: 12 }} />
                </section>
            )}
        </section>
    );
}

export default function Page() {
    return (
        <div className="w-full h-full bg-background-base flex flex-col items-center gap-2">
            <div className="w-full flex flex-wrap justify-between items-center gap-2 px-4 py-2">
                <p className="text-foreground-subdued">Bienvenue, {getUsername()}</p>
                <p className="text-foreground-base">Avant d'upload les photos ne pas oublier de mettre la couleur d'arrière plan :</p>
                <div className="bg-background-highlight text-accent px-4 py-2"><p>#242424</p></div>
            </div>
            <SignoutButton/>
        </div>
    );
}