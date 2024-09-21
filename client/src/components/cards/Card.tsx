import PlayCardPrompt from "../game-layouts/PlayCardPrompt";
import { ReactNode, useState } from "react";

// display types for cards
export enum DisplayType {
    Playable = "playable",
    Unplayable = "unplayable",
    Display = "display",
}

/**
 * Base card component
 * @param children elements to render inside of card
 * @param id of card (relative to player's hand)
 * @param color of card background
 * @param displayType how to display card
 * @param animate whether to animate on entrance - default false
 * @returns Card component
 */
export default function Card({
    children,
    id,
    color,
    displayType,
    animate = false,
}: {
    children: ReactNode;
    id: number;
    color: string;
    displayType: DisplayType;
    animate?: boolean;
}) {
    const [showPlayCardPrompt, setShowPlayCardPrompt] = useState(false);

    const baseStyle =
        "relative aspect-3/4 w-16 text-4xl border-8 rounded flex items-center justify-center text-creme-2 font-bold";

    if (displayType === DisplayType.Playable) {
        return (
            <>
                <button
                    data-testid="card"
                    className={`${baseStyle} ${color} ${
                        animate && "animate-grow"
                    }`}
                    onClick={() => {
                        // show dialog
                        setShowPlayCardPrompt(true);
                    }}
                >
                    {children}
                </button>
                {showPlayCardPrompt && (
                    <PlayCardPrompt
                        cardID={id}
                        setShowing={setShowPlayCardPrompt}
                    />
                )}
            </>
        );
    } else if (displayType === DisplayType.Unplayable) {
        return (
            <div
                data-testid="card"
                className={`${baseStyle} ${color} ${
                    animate && "animate-grow"
                } opacity-50`}
            >
                {children}
            </div>
        );
    } else if (displayType === DisplayType.Display) {
        return (
            <div
                data-testid="card"
                className={`${baseStyle} ${color} ${animate && "animate-grow"}`}
            >
                {children}
            </div>
        );
    }
}
