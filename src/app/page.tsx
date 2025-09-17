import { Suspense } from "react";
import LoginForm from "@/components/login/login-form";

export default function Home() {
    return (
        <main className="w-full h-full bg-background-base">
            <Suspense>
            <LoginForm/>
            </Suspense>
        </main>
    );
}
