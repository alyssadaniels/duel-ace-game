import { describe, it, expect } from "vitest";
import Game from "../../src/classes/Game";
import Card from "../../src/classes/Card";

describe("Game", () => {
    describe("constructor", () => {
        it("should init players to 2 new players", () => {
            const player1ID = "player1";
            const player2ID = "player2";

            const game = new Game(player1ID, player2ID);

            expect(game.getPlayer(player1ID)).toBe(
                game.getOtherPlayer(player2ID)
            );
            expect(game.getPlayer(player2ID)).toBe(
                game.getOtherPlayer(player1ID)
            );
        });

        it("should init current turn to player1ID", () => {
            const player1ID = "player1";
            const player2ID = "player2";

            const game = new Game(player1ID, player2ID);

            expect(game.getCurrentTurn()).toBe(player1ID);
        });

        it("should init winner to be undefined", () => {
            const game = new Game("player1", "player2");
            expect(game.getWinner()).toBeUndefined();
        });

        it("should deal player 1 a card (start current turn)", () => {
            const player1ID = "player1";
            const player2ID = "player2";

            const game = new Game(player1ID, player2ID);

            // check player 1 cards
            const player1Cards = game.getPlayer(player1ID).getActiveCards();

            player1Cards.forEach((card, idx) => {
                if (idx === 0) {
                    expect(card).toBeDefined();
                } else {
                    expect(card).toBeUndefined();
                }
            });

            // check player 2 cards
            const player2Cards = game.getPlayer(player2ID).getActiveCards();
            player2Cards.forEach((card) => {
                expect(card).toBeUndefined();
            });
        });
    });

    describe("getOtherPlayer", () => {
        it("should return player that is not the given player", () => {
            const player1ID = "player1";
            const player2ID = "player2";
            const game = new Game(player1ID, player2ID);

            expect(game.getOtherPlayer(player1ID)).toEqual(
                game.getPlayer(player1ID)
            );
        });
    });

    describe("playCard", () => {
        it("should do nothing if given id is not in the game", () => {
            const player1ID = "player1";
            const player2ID = "player2";
            const game = new Game(player1ID, player2ID);

            game.playCard("player3", false, 0);

            // both players should have the same initial active cards
            const player1Cards = game.getPlayer(player1ID).getActiveCards();

            player1Cards.forEach((card, idx) => {
                if (idx === 0) {
                    expect(card).toBeDefined();
                } else {
                    expect(card).toBeUndefined();
                }
            });

            const player2Cards = game.getPlayer(player2ID).getActiveCards();
            player2Cards.forEach((card) => {
                expect(card).toBeUndefined();
            });
        });

        it("should remove card from playableCards and add to self's activeCards if playOnSelf", () => {
            const player1ID = "player1";
            const player2ID = "player2";
            const game = new Game(player1ID, player2ID);

            const playedIdx = 1;
            const expectedCard = game.getPlayer(player1ID).getPlayableCards()[
                playedIdx
            ];

            game.playCard(player1ID, true, playedIdx);

            const activeCards = game.getPlayer(player1ID).getActiveCards();
            // card should be added to index 1
            expect(activeCards[1]).toBe(expectedCard);

            for (let i = 2; i < activeCards.length; i++) {
                expect(activeCards[i]).toBeUndefined();
            }

            const playableCards = game.getPlayer(player1ID).getPlayableCards();
            playableCards.forEach((card, idx) => {
                if (idx === playedIdx) {
                    expect(card).toBeNull();
                } else {
                    expect(card).toBeInstanceOf(Card);
                }
            });
        });

        it("should remove card from playableCards and add to other players's activeCards if not playOnSelf", () => {
            const player1ID = "player1";
            const player2ID = "player2";
            const game = new Game(player1ID, player2ID);

            const playedIdx = 1;
            const expectedCard = game.getPlayer(player1ID).getPlayableCards()[
                playedIdx
            ];

            game.playCard(player1ID, false, playedIdx);

            const activeCards = game.getPlayer(player2ID).getActiveCards();
            // card should be added to index 0
            expect(activeCards[0]).toBe(expectedCard);

            for (let i = 1; i < activeCards.length; i++) {
                expect(activeCards[i]).toBeUndefined();
            }

            const playableCards = game.getPlayer(player1ID).getPlayableCards();
            playableCards.forEach((card, idx) => {
                if (idx === playedIdx) {
                    expect(card).toBeNull();
                } else {
                    expect(card).toBeInstanceOf(Card);
                }
            });
        });
    });

    describe("endTurn", () => {
        it("should do nothing if it is not given id's turn", () => {
            const player1ID = "player1";
            const player2ID = "player2";
            const game = new Game(player1ID, player2ID);

            game.endTurn(player2ID);
            expect(game.getCurrentTurn()).toBe(player1ID);
        });

        it("should set the turn to the other player", () => {
            const player1ID = "player1";
            const player2ID = "player2";
            const game = new Game(player1ID, player2ID);

            game.endTurn(player1ID);
            expect(game.getCurrentTurn()).toBe(player2ID);
        });

        it("should not set the turn to the other player if the other player has stood", () => {
            const player1ID = "player1";
            const player2ID = "player2";
            const game = new Game(player1ID, player2ID);

            game.setStand(player1ID);
            game.endTurn(player1ID);
            expect(game.getCurrentTurn()).toBe(player2ID);

            game.endTurn(player2ID);
            expect(game.getCurrentTurn()).toBe(player2ID);
        });

        it("should deal a card (start next turn)", () => {
            const player1ID = "player1";
            const player2ID = "player2";
            const game = new Game(player1ID, player2ID);

            game.endTurn(player1ID);

            const player2Cards = game.getPlayer(player2ID).getActiveCards();
            expect(player2Cards[0]).toBeInstanceOf(Card);

            for (let i = 1; i < player2Cards.length; i++) {
                expect(player2Cards[i]).toBeUndefined();
            }
        });
    });

    describe("setStand", () => {
        it("should do nothing if it is not given id's turn", () => {
            const player1ID = "player1";
            const player2ID = "player2";
            const game = new Game(player1ID, player2ID);

            game.setStand(player2ID);

            expect(game.getPlayer(player1ID).getHasStood()).toBeFalsy();
            expect(game.getPlayer(player2ID).getHasStood()).toBeFalsy();
        });

        it("should set given id to stand (hasStood = true)", () => {
            const player1ID = "player1";
            const player2ID = "player2";
            const game = new Game(player1ID, player2ID);

            game.setStand(player1ID);

            expect(game.getPlayer(player1ID).getHasStood()).toBeTruthy();
            expect(game.getPlayer(player2ID).getHasStood()).toBeFalsy();
        });
    });
});
