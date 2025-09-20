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

        return NextResponse.redirect(meta.url, 302);
    } catch (e) {
        return NextResponse.json({ error: 'Slot introuvable' }, { status: 404 });
    }
}