import { ReactNode } from "react";

/**
 * Base mini card (for display in rules)
 * Mini card does not have any associated data, it is strictly for display
 * @param children inside of card
 * @param color background color
 * @returns MiniCard
 */
export default function MiniCard({
    children,
    color,
}: {
    children: ReactNode;
    color: string;
}) {
    return (
        <div
            className={`relative aspect-3/4 max-w-8 min-w-8 border-4 rounded flex items-center justify-center text-lg text-creme-2 font-bold ${color}`}
        >
            {children}
        </div>
    );
}
