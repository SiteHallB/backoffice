import { NextResponse } from "next/server";
import { head } from "@vercel/blob";
import { SLOTS } from "@/slots";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ name: string }> }
) {
    const { name } = await params

    try {
            if (!SLOTS.includes(name as any)) throw new Error('Slot invalide');

            const meta = await head(`slots/${name}`);

            return NextResponse.redirect(meta.url, 302);
        } catch (e) {
            return NextResponse.json({ error: 'Slot introuvable' }, { status: 404 });
        }
}