import { useNavigate } from "react-router-dom";
import HollowButton from "../HollowButton";
import { FaCrown } from "react-icons/fa";

/**
 * Modal to show when a game ends
 * @param amWinner is user winner
 * @param playerScore score of user
 * @param otherScore score of opponent
 * @returns GameOverModal component
 */
export default function GameOverModal({
    amWinner,
    playerScore,
    otherScore,
}: {
    amWinner: boolean;
    playerScore: number;
    otherScore: number;
}) {
    const navigate = useNavigate();

    return (
        <dialog
            className="fixed top-0 left-0 w-full h-full overflow-hidden bg-slate-500/50 flex items-center justify-center"
            open={true}
        >
            <div className="animate-delayed-grow bg-plum-1 text-creme-2 p-14 rounded shadow text-center">
                <h1 className="my-4 flex items-center justify-center gap-2">
                    {/* show appropriate text based on if user won or lost */}
                    {amWinner ? "You Win!" : "You Lose :("}

                    {amWinner && (
                        <span className="w-fit h-fit text-dandelion-1 animate-wiggle">
                            <FaCrown />
                        </span>
                    )}
                </h1>

                {/* scores */}
                <p>Opponent Final Score: {otherScore}</p>
                <p>Your Final Score: {playerScore}</p>
                <br />
                <br />

                {/* navigation buttons */}
                <div className="flex flex-col gap-4">
                    <HollowButton
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        Play Again
                    </HollowButton>
                    <HollowButton onClick={() => navigate("/")}>
                        Home
                    </HollowButton>
                </div>
            </div>
        </dialog>
    );
}
