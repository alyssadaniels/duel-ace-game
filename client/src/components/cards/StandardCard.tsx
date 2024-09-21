import Card, { DisplayType } from "./Card";

/**
 * Standard card
 * @param id of card (relative to player's hand)
 * @param displayType how to render card (as button, partially transparent, etc)
 * @param value number value of card
 * @param animate whether card will have entrance animation, false by default
 * @returns StandardCard component
 */
export default function StandardCard({
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
            color="bg-dandelion-1"
            displayType={displayType}
            animate={animate}
        >
            {value}
        </Card>
    );
}
