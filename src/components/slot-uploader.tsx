'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import Image from 'next/image';

import { SLOTS } from '@/slots';

export default function SlotUploader({ slot }:{
    slot: string
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setErr(null); setBusy(true);
        try {
          const file = inputRef.current?.files?.[0];
          if (!file) throw new Error('Aucun fichier');

          if(!SLOTS.includes(slot as any)) throw new Error('Slot invalide');
          const res = await upload(`slots/${slot}.svg`, file, {
            access: 'public',
            handleUploadUrl: '/api/blob/upload-slot',
            contentType: file.type,
            // (optionnel) clientPayload: JSON.stringify({ slot }),
          });

          if (inputRef.current) inputRef.current.value = '';
        } catch (e:any) {
          setErr(e?.message ?? 'Erreur inconnue');
        } finally {
          setBusy(false);
        }
      }}
      className="w-full flex flex-col items-center justify-center gap-2 p-4 bg-background-highlight rounded-2xl"
    >
      <div className="w-full flex flex-wrap gap-x-2 p-2 bg-foreground-subdued rounded-lg">
        <label className="p-1 rounded-lg"><b>{slot}</b></label>
        <input className="p-1 border rounded-lg border-background-highlight" ref={inputRef} type="file" accept='image/svg+xml' required />
        <button className="p-1 border rounded-lg border-background-highlight" disabled={busy}>{busy ? 'Remplacement…' : 'Remplacer'}</button>
      </div>
      {err && <small style={{color:'crimson'}}>Erreur : {err}</small>}

      <div className="w-full p-2 bg-background-highlight rounded-lg overflow-hidden">
      <Image
        src={`https://jqhzp9eir7a7e8vc.public.blob.vercel-storage.com/slots/${slot}.svg`}
        alt=""
        width={300}
        height={300}
        className="w-full h-auto object-cover"
      />
      </div>
    </form>
  );
}
