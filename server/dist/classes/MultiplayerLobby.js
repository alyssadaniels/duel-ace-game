"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a multiplayer lobby, manages queue and match confirmations
 */
class MultiplayerLobby {
    #queue = [];
    #pendingConfirmations = {};
    /**
     * Get queue
     * @returns queue
     */
    getQueue() {
        return this.#queue;
    }
    /**
     * Get pending confirmations
     * @returns pendingConfirmations
     */
    getPendingConfirmations() {
        return this.#pendingConfirmations;
    }
    /**
     * Get pending confirmation for given player
     * @param playerID
     */
    getPendingConfirmation(playerID) {
        return this.#pendingConfirmations[playerID];
    }
    /**
     * Get matching confirmation for knownID
     * @param knownID
     */
    getOtherPendingConfirmation(knownID) {
        if (!this.#pendingConfirmations[knownID]) {
            return;
        }
        const otherID = this.#pendingConfirmations[knownID].otherID;
        return this.#pendingConfirmations[otherID];
    }
    /**
     * Add player to queue
     * @param playerID
     */
    queuePlayer(playerID) {
        // check if already queued or match found
        if (this.#queue.includes(playerID) ||
            this.#pendingConfirmations[playerID]) {
            return;
        }
        this.#queue.push(playerID);
    }
    removePlayerFromQueue(playerID) {
        const queueingIdx = this.#queue.findIndex((id) => id === playerID);
        if (queueingIdx > -1) {
            this.#queue.splice(queueingIdx, 1);
        }
    }
    /**
     * Match first 2 players in queue
     */
    matchPlayers() {
        const matchedPlayers = [undefined, undefined];
        // get first two lobby slots
        if (this.#queue[0] && this.#queue[1]) {
            for (let i = 0; i < matchedPlayers.length; i++) {
                matchedPlayers[i] = this.#queue.shift();
            }
        }
        // check if there are any matched players
        if (!matchedPlayers[0] || !matchedPlayers[1]) {
            return [];
        }
        // set pending confirmations
        this.#pendingConfirmations[matchedPlayers[1]] = {
            otherID: matchedPlayers[0],
            confirmed: false,
        };
        this.#pendingConfirmations[matchedPlayers[0]] = {
            otherID: matchedPlayers[1],
            confirmed: false,
        };
        return matchedPlayers;
    }
    /**
     * Confirm match for given player
     * @param playerID
     */
    confirmMatch(playerID) {
        // check for existence
        if (!this.#pendingConfirmations[playerID]) {
            return;
        }
        // set to true
        this.#pendingConfirmations[playerID].confirmed = true;
    }
    /**
     * Delete pending confirmations
     * Confirmations should be deleted together
     * @param knownID
     * @returns deleted ids
     */
    deletePendingConfirmation(knownID) {
        if (!this.#pendingConfirmations[knownID]) {
            return [];
        }
        const otherID = this.#pendingConfirmations[knownID].otherID;
        const ids = [knownID, otherID];
        delete this.#pendingConfirmations[knownID];
        delete this.#pendingConfirmations[otherID];
        return ids;
    }
}
exports.default = MultiplayerLobby;
//# sourceMappingURL=MultiplayerLobby.js.map