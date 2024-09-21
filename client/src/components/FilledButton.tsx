import { ReactNode } from "react";

/**
 * Filled button component
 * @param children inside of button
 * @param onClick function to execute on click
 * @param disabled is button disabled - default false
 * @returns FilledButton component
 */
export default function FilledButton({
    children,
    onClick,
    disabled = false,
}: {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
}) {
    return (
        <button
            className={`rounded border-2 py-4 w-64 ${
                disabled
                    ? "bg-slate-400 border-slate-400"
                    : "bg-dandelion-1 border-dandelion-1 text-plum-1 hover:bg-transparent hover:text-dandelion-2 hover:border-current"
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
