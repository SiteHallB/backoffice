import type { Metadata } from "next";
import Bar from "@/components/bar";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "HALL B - Backoffice",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className="antialiased w-screen h-screen flex flex-col"
        >
            <Bar/>
            {children}
        </body>
        </html>
    );
}
