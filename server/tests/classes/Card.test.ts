import { describe, it, expect } from "vitest";
import Card, { CardType } from "../../src/classes/Card";

describe("Card", () => {
    describe("constructor", () => {
        it("should set card type to given type", () => {
            const type = CardType.Standard;
            const card = new Card(type, 0, 15);

            expect(card.getType()).toBe(type);
        });

        it("should set displayValue to a number between given min and max", () => {
            const min = 3;
            const max = 16;
            const card = new Card(CardType.Standard, min, max);

            expect(card.getDisplayValue()).toBeLessThan(max);
            expect(card.getDisplayValue()).toBeGreaterThanOrEqual(min);
        });

        it("should throw error if given min is bigger than max", () => {
            // larger
            expect(() => {
                new Card(CardType.Standard, 10, 2);
            }).toThrowError();

            // same
            expect(() => {
                new Card(CardType.Standard, 4, 4);
            }).toThrowError();
        });

        it("should set trueValue if type is standard, plus, or minus", () => {
            // standard
            const standardCard = new Card(CardType.Standard, 0, 4);
            expect(standardCard.getTrueValue()).toBeDefined();

            // minus
            const minusCard = new Card(CardType.Minus, 0, 4);
            expect(minusCard.getTrueValue()).toBeDefined();

            // plus
            const plusCard = new Card(CardType.Plus, 0, 4);
            expect(plusCard.getTrueValue()).toBeDefined();

            // other cards
            const doubleCard = new Card(CardType.Double, 0, 4);
            expect(doubleCard.getTrueValue()).toBeUndefined();

            const cancelCard = new Card(CardType.Cancel, 0, 4);
            expect(cancelCard.getTrueValue()).toBeUndefined();
        });
    });

    describe("setTrueValue", () => {
        it("should do nothing if trueValue already defined", () => {
            // card that sets true value in constructor
            const standardCard = new Card(CardType.Standard, 5, 6);
            const expectedValue = standardCard.getTrueValue();

            standardCard.setTrueValue(2);
            expect(standardCard.getTrueValue()).toEqual(expectedValue);

            // set true value explicitly
            const cancelCard = new Card(CardType.Cancel, 8, 13);
            cancelCard.setTrueValue(6);

            // set again
            cancelCard.setTrueValue(4);
            expect(cancelCard.getTrueValue()).toEqual(6);
        });

        it("should set trueValue if trueValue not defined", () => {
            const doubleCard = new Card(CardType.Double, 5, 6);
            doubleCard.setTrueValue(5);

            expect(doubleCard.getTrueValue()).toBe(5);
        });
    });
});
