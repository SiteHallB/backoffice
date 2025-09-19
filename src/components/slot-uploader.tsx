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
  const [rev, setRev] = useState(0);          // révision pour bust le cache

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

          setRev(Date.now());
        } catch (e:any) {
          setErr(e?.message ?? 'Erreur inconnue');
        } finally {
          setBusy(false);
        }
      }}
      style={{ display:'grid', gap:8 }}
    >
      <label><b>{slot}</b></label>
      <input ref={inputRef} type="file" accept='image/svg+xml' required />
      <button disabled={busy}>{busy ? 'Remplacement…' : 'Remplacer'}</button>
      {err && <small style={{color:'crimson'}}>Erreur : {err}</small>}
      <Image
        src={`https://jqhzp9eir7a7e8vc.public.blob.vercel-storage.com/slots/${slot}.svg?v=${rev}`}
        alt=""
        width={300}
        height={300}
        key={rev}
      />
    </form>
  );
}
