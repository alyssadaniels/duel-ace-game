import { FaMinus } from "react-icons/fa";
import Card, { DisplayType } from "./Card";

/**
 * Minus card
 * @param id of card (relative to player's hand)
 * @param displayType how to render card (as button, partially transparent, etc)
 * @param value number value of card
 * @param animate whether card will have entrance animation, false by default
 * @returns MinusCard component
 */
export default function MinusCard({
    id,
    displayType,
    value,
    animate = false,
}: {
    id: number;
    displayType: DisplayType;
    value: number;
    animate?: boolean;
}) {
    return (
        <Card
            id={id}
            color="bg-cherry-2"
            displayType={displayType}
            animate={animate}
        >
            <div className="absolute text-sm top-1 right-1">
                <FaMinus />
            </div>
            {value}
        </Card>
    );
}
