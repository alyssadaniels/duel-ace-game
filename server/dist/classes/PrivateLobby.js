"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a private lobby
 * Manages hosting/joining games
 */
class PrivateLobby {
    #waitingHosts = [];
    /**
     * Get waiting hosts
     * @returns waitingHosts
     */
    getWaitingHosts() {
        return this.#waitingHosts;
    }
    /**
     * Add player to waiting hosts
     * @param playerID
     */
    addHost(playerID) {
        if (this.#waitingHosts.includes(playerID)) {
            return;
        }
        this.#waitingHosts.push(playerID);
    }
    /**
     * Remove player from waiting hosts
     * @param playerID
     */
    removeHost(playerID) {
        const hostIdx = this.#waitingHosts.findIndex((id) => id === playerID);
        if (hostIdx > -1) {
            this.#waitingHosts.splice(hostIdx, 1);
        }
    }
    /**
     * Attempt to join hosted game
     * @param joinerID
     * @param hostID
     * @returns success?
     */
    joinGame(joinerID, hostID) {
        // check for host
        if (!this.#waitingHosts.includes(hostID)) {
            return false;
        }
        // check for duplicate
        if (joinerID === hostID) {
            return false;
        }
        // remove from pending hosts
        const hostIdx = this.#waitingHosts.findIndex((id) => id === hostID);
        if (hostIdx > -1) {
            this.#waitingHosts.splice(hostIdx, 1);
        }
        // remove joiner from pending hosts
        const joinerIdx = this.#waitingHosts.findIndex((id) => id === joinerID);
        if (joinerIdx > -1) {
            this.#waitingHosts.splice(joinerIdx, 1);
        }
        return true;
    }
}
exports.default = PrivateLobby;
//# sourceMappingURL=PrivateLobby.js.map