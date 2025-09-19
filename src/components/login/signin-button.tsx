import { signIn } from "@/auth"

export default function SigninButton() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/dashboard" })
            }}
            className="form"
        >
            <button type="submit">Se connecter avec Google</button>
        </form>
    );
}