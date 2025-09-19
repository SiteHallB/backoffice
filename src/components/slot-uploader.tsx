'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { Slot } from '@/slots';
import Image from 'next/image';

export default function SlotUploader({ slot }:{
    slot: Slot
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
      style={{ display:'grid', gap:8 }}
    >
      <label><b>{slot}</b></label>
      <input ref={inputRef} type="file" accept='image/svg+xml' required />
      <button disabled={busy}>{busy ? 'Remplacement…' : 'Remplacer'}</button>
      {err && <small style={{color:'crimson'}}>Erreur : {err}</small>}
      <Image src={`https://jqhzp9eir7a7e8vc.public.blob.vercel-storage.com/slots/${slot}.svg`} alt="" width={1600} height={900}/>
    </form>
  );
}
