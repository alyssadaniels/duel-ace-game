import MiniCard from "./MiniCard";
import { FaBoltLightning } from "react-icons/fa6";

/**
 * Mini double card (for display in rules)
 * @returns MiniDoubleCard
 */
export default function MiniDoubleCard() {
    return (
        <MiniCard color="bg-cherry-1">
            <FaBoltLightning />
        </MiniCard>
    );
}
