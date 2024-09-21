import Card, { DisplayType } from "./Card";
import { FaBoltLightning } from "react-icons/fa6";

/**
 * Double card
 * @param id of card (relative to player's hand)
 * @param displayType how to render card (as button, partially transparent, etc)
 * @param animate whether card will have entrance animation, false by default
 * @returns DoubleCard component
 */
export default function DoubleCard({
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
            color="bg-cherry-1"
            displayType={displayType}
            animate={animate}
        >
            <FaBoltLightning />
        </Card>
    );
}
