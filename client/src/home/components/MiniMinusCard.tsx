import MiniCard from "./MiniCard";

/**
 * Mini minus card (for display in rules)
 * @returns MiniMinusCard
 */
export default function MiniMinusCard({ value }: { value: number }) {
    return (
        <MiniCard color="bg-cherry-2">
            <div className="absolute text-xs -top-[0.2rem] right-0">-</div>
            {value}
        </MiniCard>
    );
}
