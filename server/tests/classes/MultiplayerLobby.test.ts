import { describe, it, expect } from "vitest";
import MultiplayerLobby from "../../src/classes/MultiplayerLobby";

describe("MultiplayerLobby", () => {
    describe("constructor", () => {
        it("should initialize pendingConfirmations to an empty dict", () => {
            const lobby = new MultiplayerLobby();
            expect(lobby.getPendingConfirmations()).toStrictEqual({});
        });

        it("should initialize queue to an empty list", () => {
            const lobby = new MultiplayerLobby();
            expect(lobby.getQueue()).toStrictEqual([]);
        });
    });

    describe("getOtherPendingConfirmation", () => {
        it("should return undefined if knownID doesn't exist", () => {
            const lobby = new MultiplayerLobby();

            // empty queue
            expect(lobby.getOtherPendingConfirmation("player")).toBeUndefined();

            // add to queue
            lobby.queuePlayer("player1");
            lobby.queuePlayer("player2");
            lobby.queuePlayer("player3");
            lobby.matchPlayers();

            expect(lobby.getOtherPendingConfirmation("player")).toBeUndefined();
        });

        it("should return associated player with knownID", () => {
            const lobby = new MultiplayerLobby();

            // add to queue
            lobby.queuePlayer("player1");
            lobby.queuePlayer("player2");
            lobby.queuePlayer("player3");
            lobby.matchPlayers();

            // confirmed false
            expect(lobby.getOtherPendingConfirmation("player1")).toStrictEqual({
                otherID: "player1",
                confirmed: false,
            });

            // confirmed true
            lobby.confirmMatch("player2");

            expect(lobby.getOtherPendingConfirmation("player1")).toStrictEqual({
                otherID: "player1",
                confirmed: true,
            });
        });
    });

    describe("queuePlayer", () => {
        it("should do nothing if player is already in queue", () => {
            const lobby = new MultiplayerLobby();
            const playerID = "player";
            lobby.queuePlayer(playerID);

            // add again
            lobby.queuePlayer(playerID);

            expect(lobby.getQueue()).toStrictEqual([playerID]);
        });

        it("should add player to queue", () => {
            const lobby = new MultiplayerLobby();

            lobby.queuePlayer("player1");
            expect(lobby.getQueue()).toStrictEqual(["player1"]);

            lobby.queuePlayer("player2");
            expect(lobby.getQueue()).toStrictEqual(["player1", "player2"]);

            lobby.queuePlayer("player3");
            expect(lobby.getQueue()).toStrictEqual([
                "player1",
                "player2",
                "player3",
            ]);
        });
    });

    describe("removePlayerFromQueue", () => {
        it("should do nothing if player is not in queue", () => {
            const lobby = new MultiplayerLobby();

            // empty queue
            lobby.removePlayerFromQueue("player");
            expect(lobby.getQueue()).toStrictEqual([]);

            // add players
            lobby.queuePlayer("player1");
            lobby.queuePlayer("player2");

            lobby.removePlayerFromQueue("player");
            expect(lobby.getQueue()).toStrictEqual(["player1", "player2"]);
        });

        it("should remove player from queue", () => {
            const lobby = new MultiplayerLobby();

            // add players
            lobby.queuePlayer("player1");
            lobby.queuePlayer("player2");

            lobby.removePlayerFromQueue("player2");
            expect(lobby.getQueue()).toStrictEqual(["player1"]);
        });
    });

    describe("matchPlayers", () => {
        it("should do nothing if there are < 2 players in queue", () => {
            const lobby = new MultiplayerLobby();

            // empty
            lobby.matchPlayers();
            expect(lobby.getQueue()).toStrictEqual([]);
            expect(lobby.getPendingConfirmations()).toStrictEqual({});

            // add player
            lobby.queuePlayer("player1");

            lobby.matchPlayers();
            expect(lobby.getQueue()).toStrictEqual(["player1"]);
            expect(lobby.getPendingConfirmations()).toStrictEqual({});
        });

        it("should return an empty array if there are < 2 players in queue", () => {
            const lobby = new MultiplayerLobby();

            // empty
            expect(lobby.matchPlayers()).toStrictEqual([]);

            // add player
            lobby.queuePlayer("player1");

            expect(lobby.matchPlayers()).toStrictEqual([]);
        });

        it("should move players from queue to pending confirmations if matched", () => {
            const lobby = new MultiplayerLobby();

            // add players
            lobby.queuePlayer("player1");
            lobby.queuePlayer("player2");
            lobby.queuePlayer("player3");

            lobby.matchPlayers();

            expect(lobby.getQueue()).toStrictEqual(["player3"]);
            expect(lobby.getPendingConfirmation("player1")).toStrictEqual({
                otherID: "player2",
                confirmed: false,
            });
            expect(lobby.getPendingConfirmation("player2")).toStrictEqual({
                otherID: "player1",
                confirmed: false,
            });
        });

        it("should return the matched players", () => {
            const lobby = new MultiplayerLobby();

            // add players
            lobby.queuePlayer("player1");
            lobby.queuePlayer("player2");
            lobby.queuePlayer("player3");

            expect(lobby.matchPlayers()).toStrictEqual(["player1", "player2"]);
        });
    });

    describe("confirmMatch", () => {
        it("should do nothing if player is not in pendingConfirmations", () => {
            const lobby = new MultiplayerLobby();

            // empty
            lobby.confirmMatch("player");
            expect(lobby.getQueue()).toStrictEqual([]);
            expect(lobby.getPendingConfirmations()).toStrictEqual({});

            // add players
            lobby.queuePlayer("player1");
            lobby.queuePlayer("player2");
            lobby.matchPlayers();

            lobby.confirmMatch("player");

            expect(lobby.getQueue()).toStrictEqual([]);
            expect(lobby.getPendingConfirmations()).toStrictEqual({
                player1: { otherID: "player2", confirmed: false },
                player2: { otherID: "player1", confirmed: false },
            });
        });

        it("should set player confirmation to true", () => {
            const lobby = new MultiplayerLobby();

            // add players
            lobby.queuePlayer("player1");
            lobby.queuePlayer("player2");
            lobby.matchPlayers();

            lobby.confirmMatch("player2");
            expect(lobby.getPendingConfirmations()).toStrictEqual({
                player1: { otherID: "player2", confirmed: false },
                player2: { otherID: "player1", confirmed: true },
            });
        });
    });

    describe("deletePendingConfirmation", () => {
        it("should do nothing if id is not in pendingConfirmations", () => {
            const lobby = new MultiplayerLobby();

            // empty
            lobby.deletePendingConfirmation("player");
            expect(lobby.getQueue()).toStrictEqual([]);
            expect(lobby.getPendingConfirmations()).toStrictEqual({});

            // add players
            lobby.queuePlayer("player1");
            lobby.queuePlayer("player2");
            lobby.matchPlayers();

            lobby.deletePendingConfirmation("player");

            expect(lobby.getQueue()).toStrictEqual([]);
            expect(lobby.getPendingConfirmations()).toStrictEqual({
                player1: { otherID: "player2", confirmed: false },
                player2: { otherID: "player1", confirmed: false },
            });
        });

        it("should return an empty list if id is not in pendingConfirmations", () => {
            const lobby = new MultiplayerLobby();

            // empty
            expect(lobby.deletePendingConfirmation("player")).toStrictEqual([]);

            // add players
            lobby.queuePlayer("player1");
            lobby.queuePlayer("player2");
            lobby.matchPlayers();

            expect(lobby.deletePendingConfirmation("player")).toStrictEqual([]);
        });

        it("should delete both associated ids", () => {
            const lobby = new MultiplayerLobby();

            // add players
            lobby.queuePlayer("player1");
            lobby.queuePlayer("player2");
            lobby.queuePlayer("player3");
            lobby.queuePlayer("player4");

            lobby.matchPlayers();
            lobby.matchPlayers();

            lobby.deletePendingConfirmation("player1");

            expect(lobby.getQueue()).toStrictEqual([]);
            expect(lobby.getPendingConfirmations()).toStrictEqual({
                player3: { otherID: "player4", confirmed: false },
                player4: { otherID: "player3", confirmed: false },
            });
        });

        it("should return ids for deleted confirmations", () => {
            const lobby = new MultiplayerLobby();

            // add players
            lobby.queuePlayer("player1");
            lobby.queuePlayer("player2");
            lobby.queuePlayer("player3");
            lobby.queuePlayer("player4");

            lobby.matchPlayers();
            lobby.matchPlayers();

            expect(lobby.deletePendingConfirmation("player1")).toStrictEqual([
                "player1",
                "player2",
            ]);
        });
    });
});
