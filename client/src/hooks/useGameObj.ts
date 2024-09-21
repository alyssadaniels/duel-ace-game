import { useEffect, useState } from "react";
import { GameObject } from "../types";
import { socket } from "../socket";

/**
 * Set up receiving updates for the current game
 * @returns up to date game object
 */
export default function useGameObj(): GameObject | undefined {
    const [gameObj, setGameObj] = useState<GameObject>();

    useEffect(() => {
        // set up receiving updates
        function updateGame(gameObj: GameObject) {
            setGameObj(gameObj);
        }

        socket.on("update-game", updateGame);

        return () => {
            socket.off("update-game", updateGame);
        };
    }, []);

    return gameObj;
}
