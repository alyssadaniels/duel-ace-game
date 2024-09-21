import { describe, it, expect } from "vitest";
import Player from "../../src/classes/Player";
import Card, { CardType } from "../../src/classes/Card";

describe("Player", () => {
    describe("constructor", () => {
        it("should fill playableCards with cards", () => {
            const player = new Player();
            const cards = player.getPlayableCards();

            for (let i = 0; i < cards.length; i++) {
                expect(cards[i]).toBeDefined();
            }
        });

        it("should init activeCards to empty array", () => {
            const player = new Player();
            const cards = player.getActiveCards();

            for (let i = 0; i < cards.length; i++) {
                expect(cards[i]).toBeUndefined();
            }
        });

        it("should init hasStood to false", () => {
            const player = new Player();
            expect(player.getHasStood()).toBeFalsy();
        });

        it("should init canPlay to true", () => {
            const player = new Player();
            expect(player.getCanPlay()).toBeTruthy();
        });
    });

    describe("isActiveCardsFull", () => {
        it("should return true if all activeCards are defined", () => {
            const player = new Player();

            // add cards
            for (let i = 0; i < player.getActiveCards().length; i++) {
                const card = new Card(CardType.Standard, 0, 1);
                player.addToActiveCards(card);
            }

            expect(player.isActiveCardsFull()).toBeTruthy();
        });

        it("should return false if not all activeCards are defined", () => {
            // initial
            const player = new Player();
            expect(player.isActiveCardsFull()).toBeFalsy();

            // add card
            const card = new Card(CardType.Standard, 0, 1);
            player.addToActiveCards(card);

            expect(player.isActiveCardsFull()).toBeFalsy();
        });
    });

    describe("getScore", () => {
        it("should return the sum of active cards true values", () => {
            const player = new Player();
            let trueValues: number[] = [];

            for (let i = 0; i < 3; i++) {
                const card = new Card(CardType.Standard, 4, 9);
                const trueVal = card.getTrueValue();

                if (trueVal) {
                    trueValues.push(trueVal);
                }

                player.addToActiveCards(card);
            }

            const expectedScore = trueValues.reduce((acc, val) => val + acc, 0);
            expect(player.getScore()).toBe(expectedScore);
        });
    });

    describe("removePlayableCard", () => {
        it("should remove given card from playableCards", () => {
            const player = new Player();

            const removedIdx = 1;
            player.removePlayableCard(removedIdx);

            player.getPlayableCards().forEach((card, idx) => {
                if (idx === removedIdx) {
                    expect(card).toBeNull();
                } else {
                    expect(card).toBeInstanceOf(Card);
                }
            });
        });

        it("should not change playableCards if no given card exists", () => {
            const player = new Player();

            // remove once
            player.removePlayableCard(0);
            const expectedPlayableCards = player.getPlayableCards();

            // remove same card
            player.removePlayableCard(0);

            expect(player.getPlayableCards()).toStrictEqual(
                expectedPlayableCards
            );
        });

        it("should return the removed card", () => {
            const player = new Player();

            // remove
            const expectedCard = player.getPlayableCards()[0];
            expect(player.removePlayableCard(0)).toBe(expectedCard);

            // remove same card
            expect(player.removePlayableCard(0)).toBe(null);
        });
    });

    describe("addToActiveCards", () => {
        it("should add given card if there is an open slot", () => {
            const player = new Player();
            const card = new Card(CardType.Plus, 5, 10);

            // return true on success
            expect(player.addToActiveCards(card)).toBeTruthy();

            // check active cards
            expect(player.getActiveCards()[0]).toBe(card);

            for (let i = 1; i < player.getActiveCards().length; i++) {
                expect(player.getActiveCards()[i]).toBeUndefined();
            }
        });

        it("should fail if there are no open slots", () => {
            const player = new Player();

            // add cards
            for (let i = 0; i < player.getActiveCards().length; i++) {
                const card = new Card(CardType.Standard, 2, 12);
                player.addToActiveCards(card);
            }

            const expectedActiveCards = player.getActiveCards();

            const card = new Card(CardType.Minus, 3, 5);

            // should fail
            expect(player.addToActiveCards(card)).toBeFalsy();

            expect(player.getActiveCards()).toStrictEqual(expectedActiveCards);
        });
    });
});
