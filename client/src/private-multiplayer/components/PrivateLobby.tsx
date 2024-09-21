import { useState } from "react";
import HollowButton from "../../components/HollowButton";
import Logo from "../../components/Logo";
import CopyButton from "../../components/CopyButton";
import { Link } from "react-router-dom";
import FilledButton from "../../components/FilledButton";
import LoadingCircle from "../../components/LoadingCircle";
import { socket } from "../../socket";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MD_SCREEN_BREAKPOINT } from "../../util/constants";

/**
 * Private lobby
 * @returns PrivateLobby component
 */
export default function PrivateLobby() {
    const [hosting, setHosting] = useState(false);
    const [joining, setJoining] = useState(false);
    const [didJoinFail, setDidJoinFailed] = useState(false);
    const [codeInput, setCodeInput] = useState("");

    const isMdScreen = useMediaQuery(`(min-width: ${MD_SCREEN_BREAKPOINT}px)`);

    /**
     * Handler for if join failed
     */
    function handleJoinFailed() {
        setDidJoinFailed(true);

        // buffer to try again
        setTimeout(() => {
            setDidJoinFailed(false);
        }, 200);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 mb-10">
            <Link className="mt-10" to="/">
                <Logo large={isMdScreen} />
            </Link>

            {/* buttons */}
            <HollowButton
                onClick={() => {
                    setJoining(true);
                    setHosting(false);

                    socket.emit("stop-hosting");
                }}
            >
                Join Game
            </HollowButton>
            <HollowButton
                onClick={() => {
                    setJoining(false);
                    setHosting(true);

                    socket.emit("request-to-host");
                }}
            >
                Host Game
            </HollowButton>

            <br />

            {/* if joining game, show input for join code */}
            {joining && (
                <div className="flex flex-col gap-2">
                    <input
                        className={`${
                            didJoinFail && "animate-shake"
                        } text-sm px-2 py-1 rounded bg-creme-2 text-slate-800`}
                        placeholder="Enter join code here"
                        onChange={(event) => {
                            setCodeInput(event.currentTarget.value);
                        }}
                    />
                    <FilledButton
                        onClick={() => {
                            socket.emit(
                                "join-private-game",
                                codeInput,
                                (success: boolean) => {
                                    if (!success) {
                                        handleJoinFailed();
                                    }
                                }
                            );
                        }}
                    >
                        Join
                    </FilledButton>
                </div>
            )}

            {/* if hosting, show join code */}
            {hosting && (
                <>
                    <div className="flex gap-2">
                        <p>
                            Join code{" "}
                            <span className="text-dandelion-2">
                                {socket.id}
                            </span>
                        </p>
                        <CopyButton
                            text={socket.id ? socket.id : ""}
                            title="Copy code to clipboard"
                        />
                    </div>

                    <p>Waiting for opponent to join</p>
                    <LoadingCircle />
                </>
            )}
        </div>
    );
}
