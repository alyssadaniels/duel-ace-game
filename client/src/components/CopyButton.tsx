import { TiClipboard } from "react-icons/ti";

/**
 * Copy button component, copies given text on click
 * @param text to copy
 * @param title for tooltip
 * @returns CopyButton component
 */
export default function CopyButton({
    text,
    title,
}: {
    text: string;
    title: string;
}) {
    return (
        <button
            className="w-fit h-fit rounded p-1 bg-creme-2 text-slate-500 text-lg hover:bg-creme-1"
            onClick={() => {
                navigator.clipboard.writeText(text);
            }}
            title={title}
        >
            <TiClipboard />
        </button>
    );
}
