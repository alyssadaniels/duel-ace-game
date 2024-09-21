import { CardType } from "../../types";
import CancelCard from "./CancelCard";
import { DisplayType } from "./Card";
import DoubleCard from "./DoubleCard";
import MinusCard from "./MinusCard";
import PlusCard from "./PlusCard";
import StandardCard from "./StandardCard";

/**
 * Wrapper for displaying cards
 * This component will take care of choosing the correct component to render based on given type of card
 * @param id of card (relative to player's playable cards)
 * @param type of card (standard, plus, etc)
 * @param value of card
 * @param displayType type of display for card
 * @param animate whether to animate on entrance - default false
 * @returns CardDisplay component
 */
export default function CardDisplay({
    id,
    type,
    value,
    displayType,
    animate = false,
}: {
    id: number;
    type: CardType;
    value: number;
    displayType: DisplayType;
    animate?: boolean;
}) {
    if (type === CardType.Standard) {
        return (
            <StandardCard
                id={id}
                value={value}
                displayType={displayType}
                animate={animate}
            />
        );
    } else if (type === CardType.Plus) {
        return (
            <PlusCard
                id={id}
                value={value}
                displayType={displayType}
                animate={animate}
            />
        );
    } else if (type === CardType.Minus) {
        return (
            <MinusCard
                id={id}
                value={value}
                displayType={displayType}
                animate={animate}
            />
        );
    } else if (type === CardType.Double) {
        return (
            <DoubleCard id={id} displayType={displayType} animate={animate} />
        );
    } else if (type === CardType.Cancel) {
        return (
            <CancelCard id={id} displayType={displayType} animate={animate} />
        );
    }
}
