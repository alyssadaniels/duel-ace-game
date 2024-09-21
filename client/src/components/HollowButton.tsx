import { ReactNode } from "react";

/**
 * Hollow button component
 * @param children inside of button
 * @param onClick function to execute on click
 * @returns HollowButton component
 */
export default function HollowButton({
    children,
    onClick,
}: {
    children: ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            className="border rounded py-4 w-64 text-creme-2 border-text-creme-2 hover:text-plum-1 hover:bg-creme-2"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
