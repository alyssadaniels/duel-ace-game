import { FaPlus } from "react-icons/fa";
import Card, { DisplayType } from "./Card";

/**
 * Plus card
 * @param id of card (relative to player's hand)
 * @param displayType how to render card (as button, partially transparent, etc)
 * @param value number value of card
 * @param animate whether card will have entrance animation, false by default
 * @returns PlusCard component
 */
export default function PlusCard({
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
            color="bg-plum-2"
            displayType={displayType}
            animate={animate}
        >
            <div className="absolute text-sm top-1 right-1">
                <FaPlus />
            </div>
            {value}
        </Card>
    );
}
