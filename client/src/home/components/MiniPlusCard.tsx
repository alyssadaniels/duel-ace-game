import MiniCard from "./MiniCard";

/**
 * Mini plus card (for display in rules)
 * @returns MiniPlusCard
 */
export default function MiniPlusCard({ value }: { value: number }) {
    return (
        <MiniCard color="bg-plum-2">
            <div className="absolute text-xs -top-[0.1rem] right-0">+</div>
            {value}
        </MiniCard>
    );
}
