import { FaBan } from "react-icons/fa";
import MiniCard from "./MiniCard";

/**
 * Mini cancel card (for display in rules)
 * @returns MiniCancelCard
 */
export default function MiniCancelCard() {
    return (
        <MiniCard color="bg-plum-3">
            <FaBan />
        </MiniCard>
    );
}
