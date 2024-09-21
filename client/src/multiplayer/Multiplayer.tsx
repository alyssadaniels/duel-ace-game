import GameLayout from "../components/game-layouts/GameLayout";
import GameOverModal from "../components/game-layouts/GameOverModal";
import NavigationBar from "../components/NavigationBar";
import useGameObj from "../hooks/useGameObj";
import calculateScore from "../util/calculateScore";
import MultiplayerLobby from "./components/MultiplayerLobby";

/**
 * Multiplayer page
 * @returns Multiplayer component
 */
export default function Multiplayer() {
    const gameObj = useGameObj();

    // if there is game data, render game
    if (gameObj) {
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

    // otherwise render lobby
    return (
        <>
            <NavigationBar />
            <br />
            <MultiplayerLobby />
        </>
    );
}
