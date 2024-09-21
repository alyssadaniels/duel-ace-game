import { useNavigate } from "react-router-dom";
import HollowButton from "../components/HollowButton";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import Rules from "./components/Rules";
import Logo from "../components/Logo";
import NavigationBar from "../components/NavigationBar";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MD_SCREEN_BREAKPOINT } from "../util/constants";

/**
 * Home page
 * @param isConnected is player connected to server
 * @param numUsers number of online users
 * @returns Home component
 */
export default function Home({
    isConnected,
    numUsers,
}: {
    isConnected: boolean;
    numUsers: number;
}) {
    const navigate = useNavigate();
    const [showRules, setShowRules] = useState(false);
    const isMdScreen = useMediaQuery(`(min-width: ${MD_SCREEN_BREAKPOINT}px)`);

    return (
        <>
            <NavigationBar />
            {/* logo/server data or rules */}
            <div className="flex flex-col text-center justify-center items-center gap-8 my-20 md:mt-20 md:gap-0 md:flex-row md:justify-evenly md:items-start">
                <div className="max-w-96">
                    {showRules ? (
                        <Rules />
                    ) : (
                        <div>
                            <Logo large={isMdScreen} />
                            <p>
                                Online Status:{" "}
                                {isConnected ? (
                                    <span className="text-green-400">
                                        Connected
                                    </span>
                                ) : (
                                    <span className="text-red-400">
                                        Offline
                                    </span>
                                )}
                            </p>
                            <div className="w-full"></div>

                            {isConnected && (
                                <p>
                                    Currently Online Users: {String(numUsers)}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* buttons */}
                <div className="flex flex-col gap-4">
                    <HollowButton onClick={() => navigate("/multiplayer")}>
                        <div className="flex items-center justify-center gap-4">
                            Find a Match <FaArrowRight />
                        </div>
                    </HollowButton>
                    <HollowButton onClick={() => navigate("/singleplayer")}>
                        <div className="flex items-center justify-center gap-4">
                            Single Player <FaArrowRight />
                        </div>
                    </HollowButton>
                    <HollowButton
                        onClick={() => navigate("/private-multiplayer")}
                    >
                        <div className="flex items-center justify-center gap-4">
                            Private Game <FaArrowRight />
                        </div>
                    </HollowButton>
                    <HollowButton
                        onClick={() => {
                            setShowRules(!showRules);
                        }}
                    >
                        {showRules ? "Hide Rules" : "How to Play"}
                    </HollowButton>
                </div>
            </div>
        </>
    );
}
