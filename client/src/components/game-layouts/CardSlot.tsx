/**
 * Card slot component
 * @param filled whether background is filled - default false
 * @returns CardSlot component
 */
export default function CardSlot({ filled = false }: { filled?: boolean }) {
    return (
        <div
            data-testid="card-slot"
            className={`aspect-3/4 w-16 border-4 border-creme-2 rounded ${
                filled && "bg-slate-400"
            }`}
        ></div>
    );
}
