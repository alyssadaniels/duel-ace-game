import { GameCard } from "../../types";
import { DisplayType } from "../cards/Card";
import CardDisplay from "../cards/CardDisplay";
import CardSlot from "./CardSlot";

/**
 * Displays a player's playable cards
 * A player's playable cards are the special cards that a player can play on their turn
 * @param cards player's playable cards
 * @param canPlay can the player play
 * @returns PlayableCards component
 */
export default function PlayableCards({
    cards,
    canPlay,
}: {
    cards: (GameCard | undefined | null)[];
    canPlay: boolean;
}) {
    return (
        <div className="grid grid-cols-2 gap-2">
            {cards.map((card, idx) => {
                // render card if card is defined, card slot otherwise
                if (card) {
                    return (
                        <CardDisplay
                            key={idx}
                            type={card.type}
                            value={card.displayValue}
                            id={idx}
                            displayType={
                                canPlay
                                    ? DisplayType.Playable
                                    : DisplayType.Unplayable
                            }
                        />
                    );
                } else {
                    return <CardSlot key={idx} />;
                }
            })}
        </div>
    );
}
