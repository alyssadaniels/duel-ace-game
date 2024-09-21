import { describe, it, expect } from "vitest";
import PrivateLobby from "../../src/classes/PrivateLobby";

describe("PrivateLobby", () => {
    describe("constructor", () => {
        it("should initialize waitingHosts to empty array", () => {
            const lobby = new PrivateLobby();
            expect(lobby.getWaitingHosts()).toStrictEqual([]);
        });
    });

    describe("addHost", () => {
        it("should add id to waiting hosts", () => {
            const playerID = "player";
            const lobby = new PrivateLobby();
            lobby.addHost(playerID);

            expect(lobby.getWaitingHosts()).toStrictEqual([playerID]);
        });

        it("should do nothing if id is already in list", () => {
            const playerID = "player";
            const lobby = new PrivateLobby();
            lobby.addHost(playerID);

            // add again
            lobby.addHost(playerID);

            expect(lobby.getWaitingHosts()).toStrictEqual([playerID]);
        });
    });

    describe("removeHost", () => {
        it("should do nothing if id not in waiting hosts", () => {
            const lobby = new PrivateLobby();

            // no hosts
            lobby.removeHost("player");
            expect(lobby.getWaitingHosts()).toStrictEqual([]);

            // add hosts
            lobby.addHost("player1");
            lobby.addHost("player2");
            lobby.addHost("player3");

            lobby.removeHost("player");
            expect(lobby.getWaitingHosts()).toStrictEqual([
                "player1",
                "player2",
                "player3",
            ]);
        });

        it("should remove id from waiting hosts", () => {
            const lobby = new PrivateLobby();
            const playerID = "player";

            // add hosts
            lobby.addHost("player1");
            lobby.addHost(playerID);
            lobby.addHost("player2");

            lobby.removeHost(playerID);
            expect(lobby.getWaitingHosts()).toStrictEqual([
                "player1",
                "player2",
            ]);
        });
    });

    describe("joinGame", () => {
        it("should return false if host is not in waitingHosts", () => {
            const lobby = new PrivateLobby();

            // no hosts
            expect(lobby.joinGame("player1", "player2")).toBeFalsy();

            // add hosts
            lobby.addHost("player1");
            lobby.addHost("player2");

            expect(lobby.joinGame("player1", "player4")).toBeFalsy();
        });

        it("should return false if host and joiner are the same", () => {
            const lobby = new PrivateLobby();

            // add hosts
            lobby.addHost("player1");
            lobby.addHost("player2");

            expect(lobby.joinGame("player1", "player1")).toBeFalsy();
        });

        it("should return true on success", () => {
            const lobby = new PrivateLobby();

            // add hosts
            lobby.addHost("player1");
            lobby.addHost("player2");

            expect(lobby.joinGame("player", "player1")).toBeTruthy();
        });

        it("should remove joiner and host from waitingHosts", () => {
            const lobby = new PrivateLobby();

            // add hosts
            lobby.addHost("player1");
            lobby.addHost("player2");
            lobby.addHost("player3");

            lobby.joinGame("player1", "player2");

            expect(lobby.getWaitingHosts()).toStrictEqual(["player3"]);
        });
    });
});
