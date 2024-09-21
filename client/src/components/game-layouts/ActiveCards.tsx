import { GameCard } from "../../types";
import calculateScore from "../../util/calculateScore";
import { DisplayType } from "../cards/Card";
import CardDisplay from "../cards/CardDisplay";
import CardSlot from "./CardSlot";

/**
 * Component to display active cards
 * Active cards are those that have already been played
 * @param cards to render
 * @param hasStood whether the related player has stood
 * @returns ActiveCards component
 */
export default function ActiveCards({
    cards,
    hasStood,
}: {
    cards: (GameCard | undefined | null)[];
    hasStood: boolean;
}) {
    return (
        <div className="grid grid-cols-4 gap-2 items-center">
            {/* card grid */}
            {cards.map((card, idx) => {
                // render card if card is defined, card slot otherwise
                if (card) {
                    return (
                        <CardDisplay
                            key={idx}
                            type={card.type}
                            value={card.displayValue}
                            id={idx}
                            displayType={DisplayType.Display}
                            animate={true}
                        />
                    );
                } else {
                    return <CardSlot key={idx} filled={hasStood} />;
                }
            })}

            {/* score */}
            <h1
                className={`text-6xl font-bold text-center ${
                    hasStood && "text-cherry-1"
                }`}
            >
                {calculateScore(cards)}
            </h1>
        </div>
    );
}
