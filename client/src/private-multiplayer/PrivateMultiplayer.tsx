import GameLayout from "../components/game-layouts/GameLayout";
import GameOverModal from "../components/game-layouts/GameOverModal";
import NavigationBar from "../components/NavigationBar";
import useGameObj from "../hooks/useGameObj";
import calculateScore from "../util/calculateScore";
import PrivateLobby from "./components/PrivateLobby";

/**
 * Private multiplayer game 
 * @returns PrivateMultiplayer component
 */
export default function PrivateMultiplayer() {
    const gameObj = useGameObj();

    // if there is game data, render game
    if (gameObj) {
        return (
            <div className="h-screen">
                <NavigationBar interceptNavigation={true}/>
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
            <PrivateLobby />
        </>
    );
}
