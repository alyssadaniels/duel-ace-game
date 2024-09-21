import CardDescription from "./CardDescription";
import MiniCancelCard from "./MiniCancelCard";
import MiniDoubleCard from "./MiniDoubleCard";
import MiniMinusCard from "./MiniMinusCard";
import MiniPlusCard from "./MiniPlusCard";

/**
 * Game rules
 * @returns Rules component
 */
export default function Rules() {
    return (
        <div className="text-left border max-w-96 rounded p-12 w-full text-xs">
            {/* goal */}
            <h1 className="underline">Goal</h1>
            <p>Reach a score of 21 before your opponent (without going over)</p>
            <br />

            {/* how to play */}
            <h1 className="underline">How to Play</h1>
            <ol className="list-decimal flex flex-col gap-1">
                <li>The first player will be decided at random</li>
                <li>
                    At the start of your turn, you will be dealt a card with a
                    value 2-9
                </li>
                <li>
                    You may then “End Turn” - end your turn, “Stand” - end your
                    turn and you will no longer be dealt cards, or play a card
                    from your side hand. Side hand cards can be played on either
                    you or your opponent
                </li>
                <li>
                    Repeat steps 1-3 with players alternating turns until both
                    have stood or reached a total of 21
                </li>
                <li>
                    First player to reach 21 without going over wins. If no
                    players were able to reach exactly 21, the player with the
                    higher score (below 21) wins
                </li>
            </ol>
            <br />

            {/* special cards */}
            <h1 className="underline">Special Cards</h1>
            <div className="flex flex-col gap-2">
                <CardDescription
                    card={<MiniPlusCard value={3} />}
                    description="Add - Add the shown number to the total"
                />
                <CardDescription
                    card={<MiniMinusCard value={6} />}
                    description="Subtract - Subtract the shown number from the total"
                />
                <CardDescription
                    card={<MiniDoubleCard />}
                    description="Double - double the current total"
                />
                <CardDescription
                    card={<MiniCancelCard />}
                    description="Cancel - cancel the value of the previously played card"
                />
            </div>
        </div>
    );
}
