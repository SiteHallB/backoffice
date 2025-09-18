'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';

export default function SlotUploader({ slot }:{
    slot: 'lundi'|'mardi'|'mercredi'|'jeudi'|'vendredi'|'samedi',
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string|null>(null);
  const [lastUrl, setLastUrl] = useState<string|undefined>(undefined);

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

          setLastUrl(res.url);            // aperçu succès
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
      {lastUrl && <img src={lastUrl} alt={slot} style={{maxWidth:240,borderRadius:8}} />}
    </form>
  );
}
