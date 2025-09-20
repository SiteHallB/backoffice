import { NextResponse } from "next/server";
import { head } from "@vercel/blob";
import { SLOTS } from "@/slots";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slot: string }> }
) {
    const { slot } = await params

    try {
        if (!SLOTS.includes(slot as any)) throw new Error('Slot invalide');

        console.log('Redirige vers le slot', slot);
        const meta = await head(`slots/${slot}.svg`);
        const r = await fetch(meta.url, { cache: "no-store" });

        return new NextResponse(r.body, {
        headers: {
            "content-type": meta.contentType ?? "application/octet-stream",
            "cache-control": "public, max-age=60, s-maxage=60, stale-while-revalidate=86400",
        },
    });
    } catch (e) {
        return NextResponse.json({ error: 'Slot introuvable' }, { status: 404 });
    }
}