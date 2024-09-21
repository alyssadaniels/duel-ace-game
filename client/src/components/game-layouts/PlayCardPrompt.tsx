import { socket } from "../../socket";

/**
 * Prompt to show when player plays a card
 * Player can choose to play on themselves or the other player
 * @param cardID id of card (relative to player's playable cards)
 * @param setShowing state function from parent so that PlayCardPrompt can hide itself
 * @returns PlayCardPrompt component
 */
export default function PlayCardPrompt({
    cardID,
    setShowing,
}: {
    cardID: number;
    setShowing: (state: boolean) => void;
}) {
    return (
        <dialog
            className="fixed top-0 left-0 bg-slate-500/50 w-screen h-screen z-50 overflow-hidden"
            open
        >
            {/* card */}
            {/* <div className="pointer-events-none absolute w-full h-full flex items-center justify-center">
                {cardComponent}
            </div> */}

            {/* buttons (top half is for other player, bottom half is for self) */}
            <button
                className="h-[50%] w-full text-center text-xl text-transparent hover:bg-slate-500/50 hover:text-creme-2"
                onClick={() => {
                    // hide self
                    setShowing(false);

                    // play given card
                    socket.emit("play-card", {
                        playOnSelf: false,
                        cardID: cardID,
                    });
                }}
            >
                Play on opponent
            </button>
            <button
                className="h-[50%] w-full text-center text-xl text-transparent hover:bg-slate-500/50 hover:text-creme-2"
                onClick={() => {
                    // hide self
                    setShowing(false);

                    // play given card
                    socket.emit("play-card", {
                        playOnSelf: true,
                        cardID: cardID,
                    });
                }}
            >
                Play on Self
            </button>
        </dialog>
    );
}
