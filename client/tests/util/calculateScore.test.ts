import { describe, expect, it } from "vitest";
import calculateScore from "../../src/util/calculateScore";
import { CardType, GameCard } from "../../src/types";

describe("calculateScore", () => {
    it("should return the score for given cards", () => {
        expect(calculateScore([])).toBe(0);

        const cards1: (GameCard | undefined | null)[] = [
            {
                type: CardType.Standard,
                displayValue: 5,
                trueValue: 5,
            },
            null,
            null,
            { type: CardType.Minus, displayValue: 2, trueValue: -2 },
        ];
        expect(calculateScore(cards1)).toBe(3);
    });
});
