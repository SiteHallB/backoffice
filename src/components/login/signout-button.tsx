import { signOut } from "@/auth"
 
export default function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
            className="form"
        >
            <button type="submit">Se déconnecter</button>
        </form>
    );
}