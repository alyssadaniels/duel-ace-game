import { describe, it, expect } from "vitest";
import GamesManager from "../../src/classes/GamesManager";

describe("GamesManager", () => {
    describe("constructor", () => {
        it("should initialize games to empty object", () => {
            const manager = new GamesManager();
            expect(manager.getGames()).toStrictEqual({});
        });
    });

    describe("getOpponentID", () => {
        it("should return undefined if given player does not have game", () => {
            const manager = new GamesManager();

            // empty
            expect(manager.getOpponentID("player")).toBeUndefined();

            // add games
            manager.initMultiplayerGame(["player1", "player2"]);
            manager.initMultiplayerGame(["player3", "player4"]);

            expect(manager.getOpponentID("player")).toBeUndefined();
        });

        it("should return opponent's id", () => {
            const manager = new GamesManager();

            // add games
            manager.initMultiplayerGame(["player1", "player2"]);
            manager.initMultiplayerGame(["player3", "player4"]);

            expect(manager.getOpponentID("player3")).toBe("player4");
        });
    });

    describe("initMultiplayerGame", () => {
        it("should initialize empty game with references by each player", () => {
            const manager = new GamesManager();

            manager.initMultiplayerGame(["player1", "player2"]);

            expect(manager.getGame("player1")).toBeDefined();
            expect(manager.getGame("player1").game).toBe(
                manager.getGame("player2").game
            );
        });
    });

    describe("doCPUTurn", () => {
        it("should return false if it is not CPU's turn", () => {
            const manager = new GamesManager();

            // game does not exist
            expect(manager.doCPUTurn("player1")).toBeFalsy();

            // not cpu's turn
            manager.initSingleplayerGame("player1");
            expect(manager.doCPUTurn("player1")).toBeFalsy();

            // multiplayer game
            manager.initMultiplayerGame(["player2", "player3"]);
            expect(manager.doCPUTurn("player2")).toBeFalsy();
        });

        it("should do the CPU's turn", () => {
            const manager = new GamesManager();
            manager.initSingleplayerGame("player");
            manager.endTurn("player");

            manager.doCPUTurn("player");

            expect(manager.getGame("player").game.getCurrentTurn()).toBe(
                "player"
            );
        });
    });

    describe("initSinglePlayerGame", () => {
        it("should create a game with cpu", () => {
            const manager = new GamesManager();

            manager.initSingleplayerGame("player");
            expect(manager.getGame("player").otherID).toBe("cpu");
        });
    });

    describe("leaveAllGames", () => {
        it("should do nothing if player has no games", () => {
            const manager = new GamesManager();
            manager.leaveAllGames("player");
        });

        it("should set player to stand for multiplayer games they are in", () => {
            const manager = new GamesManager();

            manager.initMultiplayerGame(["player1", "player2"]);
            manager.leaveAllGames("player1");

            expect(
                manager
                    .getGame("player2")
                    .game.getOtherPlayer("player2")
                    .getHasStood()
            ).toBeTruthy();

            expect(manager.getGame("player2").game.getCurrentTurn()).toBe(
                "player2"
            );
        });

        it("should remove games that player is in", () => {
            const manager = new GamesManager();

            manager.initMultiplayerGame(["player1", "player2"]);
            manager.leaveAllGames("player1");

            expect(manager.getGame("player1")).toBeUndefined();
        });
    });
});
