import { GameCard } from "../types";

/**
 * Calculate the score (total of true values) of a given array of cards
 * @param cards to add up
 * @returns total score of given cards
 */
export default function calculateScore(cards: (GameCard | undefined | null)[]) {
    let score = 0;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        if (card) {
            score += card.trueValue;
        }
    }
    return score;
}
