/**
 * Duel Ace logo
 * @param large render large version instead of large
 * @returns Logo component
 */
export default function Logo({ large }: { large: boolean }) {
    if (large) {
        return (
            <div className="text-center w-fit h-fit">
                <h1 className="relative -left-5 text-creme-1 font-black text-6xl">
                    DUEL
                </h1>
                <div className="relative -top-6 bg-plum-2 w-72 h-1.5" />
                <h1 className="relative left-8 -top-12 text-dandelion-1 font-black text-6xl">
                    ACE
                </h1>
            </div>
        );
    }
    
    return (
        <div className="text-center w-fit h-fit">
            <h1 className="relative -left-5 text-creme-1 font-black text-4xl">
                DUEL
            </h1>
            <div className="relative -top-4 bg-plum-2 w-48 h-1" />
            <h1 className="relative left-3 -top-8 text-dandelion-1 font-black text-4xl">
                ACE
            </h1>
        </div>
    );
}
