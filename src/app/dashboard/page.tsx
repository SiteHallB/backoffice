import SignoutButton from "@/components/login/signout-button";
import getUsername from "@/components/login/get-username";

import SlotUploader from "@/components/slot-uploader";

export default function Page() {
    return (
        <div className="w-full h-full bg-background-base flex flex-col items-center gap-2">
            <div className="w-full flex flex-wrap justify-between items-center gap-2 px-4 py-2">
                <p className="text-foreground-subdued">Bienvenue, {getUsername()}</p>
                <p className="text-foreground-base">Avant d'upload les photos ne pas oublier de mettre la couleur d'arrière plan :</p>
                <div className="bg-background-highlight text-accent px-4 py-2"><p>#242424</p></div>
            </div>
            <SignoutButton/>
            <SlotUploader slot="lundi"/>
        </div>
    );
}