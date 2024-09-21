import { useEffect } from "react";
import { socket } from "../socket";
import GameLayout from "../components/game-layouts/GameLayout";
import useGameObj from "../hooks/useGameObj";
import GameOverModal from "../components/game-layouts/GameOverModal";
import calculateScore from "../util/calculateScore";
import NavigationBar from "../components/NavigationBar";

/**
 * Singleplayer page
 * @returns Singplayer component
 */
export default function Singleplayer() {
    const gameObj = useGameObj();

    useEffect(() => {
        // join single player game
        socket.emit("start-singleplayer-game");
    }, []);

    function requestCPUTurn() {
        socket.emit("get-cpu-turn");
    }

    useEffect(() => {
        if (gameObj && !gameObj.myTurn) {
            setTimeout(requestCPUTurn, 1000);
        }
    }, [gameObj]);

    return (
        <div className="h-screen">
            <NavigationBar interceptNavigation={true} />
            <br />
            <GameLayout gameObj={gameObj} />

            {gameObj && gameObj.amWinner != undefined && (
                <GameOverModal
                    amWinner={gameObj.amWinner}
                    playerScore={calculateScore(gameObj.me.activeCards)}
                    otherScore={calculateScore(gameObj.other.activeCards)}
                />
            )}
        </div>
    );
}
