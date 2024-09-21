import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import Logo from "../../components/Logo";
import LoadingCircle from "../../components/LoadingCircle";
import FilledButton from "../../components/FilledButton";
import useCountDown from "../../hooks/useCountDown";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MD_SCREEN_BREAKPOINT } from "../../util/constants";

/**
 * Multiplayer lobby
 * @returns MultiplayerLobby component
 */
export default function MultiplayerLobby() {
    const [gameFound, setGameFound] = useState(false);
    const [joinConfirmed, setJoinConfirmed] = useState(false);
    const [count, startCount] = useCountDown();
    const isMdScreen = useMediaQuery(`(min-width: ${MD_SCREEN_BREAKPOINT}px)`);

    const navigate = useNavigate();

    useEffect(() => {
        // join lobby
        socket.emit("find-multiplayer-game");

        // set up receiving game found
        function gameFound() {
            setGameFound(true);
            startCount(10);
        }

        socket.on("game-found", gameFound);

        // set up join failed
        function joinFailed({ myFault }: { myFault: boolean }) {
            setGameFound(false);

            // if user's fault go home, otherwise re-enter multiplayer lobby (reload)
            if (myFault) {
                navigate("/");
            } else {
                window.location.reload();
                // TODO show notif that other player did not join
            }
        }

        socket.on("join-failed", joinFailed);

        return () => {
            socket.off("game-found", gameFound);
            socket.off("join-failed", joinFailed);
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">
            <Link className="mt-10 mb-4" to="/">
                <Logo large={isMdScreen} />
            </Link>

            {gameFound ? (
                joinConfirmed ? (
                    <>
                        <h1 className="text-lg mb-10">
                            Waiting for opponent to join
                        </h1>
                        <LoadingCircle />
                    </>
                ) : (
                    <>
                        <h1 className="text-lg mb-10">Opponent Found</h1>
                        <FilledButton
                            onClick={() => {
                                socket.emit("confirmed-multiplayer-join");
                                setJoinConfirmed(true);
                            }}
                        >
                            Join Game
                        </FilledButton>

                        {/* time indicator */}
                        <div className="w-48 h-2 bg-dandelion-1 animate-[shrink-x_12s_linear_1]" />
                        <div>Join in {count}</div>
                    </>
                )
            ) : (
                <p className="flex items-center gap-2">
                    Searching for opponent <LoadingCircle size="1.4em" />
                </p>
            )}
        </div>
    );
}
