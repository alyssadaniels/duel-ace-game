import { useMediaQuery } from "@uidotdev/usehooks";
import { socket } from "../../socket";
import { GameObject } from "../../types";
import { MD_SCREEN_BREAKPOINT } from "../../util/constants";
import FilledButton from "../FilledButton";
import ActiveCards from "./ActiveCards";
import PlayableCards from "./PlayableCards";

// TODO right now is formatted via elements that are hidden (or not) based on screen breakpoints
// see if you can do this using flex or grid ordering instead

/**
 * Renders a game based on given game object
 * Includes both player's playable cards, action cards, and user's action buttons
 * @param gameObj game to render
 * @returns GameLayout component
 */
export default function GameLayout({
    gameObj,
}: {
    gameObj: GameObject | undefined;
}) {
    const isMdScreen = useMediaQuery(`(min-width: ${MD_SCREEN_BREAKPOINT}px)`);
    if (!gameObj) {
        return;
    }

    if (isMdScreen) {
        // medium+ display
        return (
            <div className="hidden md:flex justify-evenly items-center">
                <div className="grid grid-rows-2 gap-12">
                    <div></div>
                    {/* player's playable cards */}
                    <PlayableCards
                        cards={gameObj.me.playableCards}
                        canPlay={gameObj.myTurn && gameObj.me.canPlay}
                    />
                </div>
                <div className="grid grid-rows-2 gap-12">
                    {/* cpu's active cards */}
                    <ActiveCards
                        cards={gameObj.other.activeCards}
                        hasStood={gameObj.other.hasStood}
                    />
                    {/* player's active cards */}
                    <ActiveCards
                        cards={gameObj.me.activeCards}
                        hasStood={gameObj.me.hasStood}
                    />
                </div>
                <div className="grid grid-rows-2 items-center gap-12">
                    <div className="w-fit mx-auto">
                        {/* cpu's playable cards */}
                        <PlayableCards
                            cards={gameObj.other.playableCards}
                            canPlay={!gameObj.myTurn && gameObj.other.canPlay}
                        />
                    </div>
                    {/* actions */}
                    <div className="flex flex-col gap-2">
                        <FilledButton
                            onClick={() => {
                                socket.emit("end-turn");
                            }}
                            disabled={!gameObj.myTurn}
                        >
                            End Turn
                        </FilledButton>
                        <FilledButton
                            onClick={() => {
                                socket.emit("stand");
                            }}
                            disabled={!gameObj.myTurn}
                        >
                            Stand
                        </FilledButton>
                    </div>
                </div>
            </div>
        );
    }
    
    // small display
    return (
        <div className="flex flex-col items-center gap-6 my-6 md:hidden">
            {/* other playable cards */}
            <PlayableCards
                cards={gameObj.other.playableCards}
                canPlay={!gameObj.myTurn && gameObj.other.canPlay}
            />
            {/* other active cards */}
            <ActiveCards
                cards={gameObj.other.activeCards}
                hasStood={gameObj.other.hasStood}
            />
            {/* player active cards */}
            <ActiveCards
                cards={gameObj.me.activeCards}
                hasStood={gameObj.me.hasStood}
            />
            {/* player playable cards */}
            <PlayableCards
                cards={gameObj.me.playableCards}
                canPlay={gameObj.myTurn && gameObj.me.canPlay}
            />
            {/* buttons */}
            <div className="flex flex-col gap-2 mb-2 pb-8">
                <FilledButton
                    onClick={() => {
                        socket.emit("end-turn");
                    }}
                    disabled={!gameObj.myTurn}
                >
                    End Turn
                </FilledButton>
                <FilledButton
                    onClick={() => {
                        socket.emit("stand");
                    }}
                    disabled={!gameObj.myTurn}
                >
                    Stand
                </FilledButton>
            </div>
        </div>
    );
}
