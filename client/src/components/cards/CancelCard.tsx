import { FaBan } from "react-icons/fa";
import Card, { DisplayType } from "./Card";

/**
 * Cancel card
 * @param id of card (relative to player's hand)
 * @param displayType how to render card (as button, partially transparent, etc)
 * @param animate whether card will have entrance animation, false by default
 * @returns CancelCard component
 */
export default function CancelCard({
    id,
    displayType,
    animate = false,
}: {
    id: number;
    displayType: DisplayType;
    animate?: boolean;
}) {
    return (
        <Card
            id={id}
            color="bg-plum-3"
            displayType={displayType}
            animate={animate}
        >
            <FaBan />
        </Card>
    );
}
