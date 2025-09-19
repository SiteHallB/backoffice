import { NextResponse } from "next/server";
import { head } from "@vercel/blob";
import { SLOTS } from "@/slots";

export async function GET(_: Request, { params }: { params: { name: string } }) {
    try {
        if (!SLOTS.includes(params.name as any)) throw new Error('Slot invalide');

        const meta = await head(`slots/${params.name}`);

        return NextResponse.redirect(meta.url, 302);
    } catch (e) {
        return NextResponse.json({ error: 'Slot introuvable' }, { status: 404 });
    }
}