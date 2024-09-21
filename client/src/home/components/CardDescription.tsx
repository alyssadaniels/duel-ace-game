import { ReactNode } from "react";

/**
 * Card description
 * @param card component
 * @param description description of card
 * @returns CardDescription component
 */
export default function CardDescription({
    card,
    description,
}: {
    card: ReactNode;
    description: string;
}) {
    return (
        <div className="flex flex-row gap-2">
            {card}
            <p>{description}</p>
        </div>
    );
}
