"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("./Game"));
const CPU_ID = "cpu";
/**
 * Manages active games
 */
class GamesManager {
    #games = {};
    /**
     * Get games
     * @returns games
     */
    getGames() {
        return this.#games;
    }
    /**
     * Get game for playerID
     * @param playerID
     */
    getGame(playerID) {
        return this.#games[playerID];
    }
    /**
     * Get ID of opponent of playerID
     * @param playerID
     */
    getOpponentID(playerID) {
        if (!this.#games[playerID]) {
            return;
        }
        const otherID = this.#games[playerID].otherID;
        return otherID;
    }
    /**
     * Initialize a multiplayer game
     * The newly created game is referenced by both games[player1] and games[player2] for immediate access
     * @param playerIDs
     */
    initMultiplayerGame(playerIDs) {
        this.leaveAllGames(playerIDs[0]);
        this.leaveAllGames(playerIDs[1]);
        // shuffle for random player 1
        if (Math.random() > 0.5) {
            const temp = playerIDs[0];
            playerIDs[0] = playerIDs[1];
            playerIDs[1] = temp;
        }
        // create game
        const game = new Game_1.default(playerIDs[0], playerIDs[1]);
        this.#games[playerIDs[0]] = {
            game: game,
            otherID: playerIDs[1],
        };
        this.#games[playerIDs[1]] = {
            game: game,
            otherID: playerIDs[0],
        };
    }
    /**
     * Play card in given player's game
     * @param playerID
     * @param playOnSelf
     * @param cardID
     */
    playCard(playerID, playOnSelf, cardID) {
        // check game exists
        if (!this.#games[playerID]) {
            return;
        }
        this.#games[playerID].game.playCard(playerID, playOnSelf, cardID);
    }
    /**
     * End turn for given player
     * @param playerID
     */
    endTurn(playerID) {
        // make sure game exists
        if (!this.#games[playerID]) {
            return;
        }
        // end turn
        this.#games[playerID].game.endTurn(playerID);
    }
    /**
     * Set player to stand, also ends player's turn
     * @param playerID
     */
    setStand(playerID) {
        // make sure game exists
        if (this.#games[playerID]) {
            return;
        }
        // stand
        this.#games[playerID].game.setStand(playerID);
        // end turn
        this.#games[playerID].game.endTurn(playerID);
    }
    /**
     * Execute cpu turn for player's singleplayer game
     * @param playerID real player id
     */
    doCPUTurn(playerID) {
        // make sure game exists
        if (!this.#games[playerID] ||
            this.#games[playerID].otherID !== CPU_ID) {
            return;
        }
        // check for state
        if (this.#games[playerID].game.getCurrentTurn() !== CPU_ID) {
            return false;
        }
        // TODO fix so cpu actions are staggered (?)
        if (this.#games[playerID].game.getPlayer(CPU_ID).getScore() > 15) {
            this.#games[playerID].game.setStand(CPU_ID);
        }
        this.#games[playerID].game.endTurn(CPU_ID);
    }
    /**
     * Starts single player game
     * @param playerID
     */
    initSingleplayerGame(playerID) {
        this.leaveAllGames(playerID);
        this.#games[playerID] = {
            game: new Game_1.default(playerID, CPU_ID),
            otherID: CPU_ID,
        };
    }
    /**
     * Removes player for games they are in (should just be 1 or less)
     * @param playerID
     * @return array of ids effected (there were active games for playerID vs id)
     */
    leaveAllGames(playerID) {
        // check for active multiplayer games
        if (!this.#games[playerID]) {
            return;
        }
        if (this.#games[playerID].otherID === CPU_ID) {
            // if game is singleplayer, delete game
            delete this.#games[playerID];
        }
        else {
            // if game is multiplayer, force disconnecting player to stand
            // TODO: if current turn is not disconnecting player, it will appear as if the disconnecting player has acted not on their turn
            this.#games[playerID].game.getPlayer(playerID).setHasStood();
            // end turn
            this.#games[playerID].game.endTurn(playerID);
            // delete - since games are stored in two places (one for each player), this will not effect the other player
            delete this.#games[playerID];
        }
    }
}
exports.default = GamesManager;
//# sourceMappingURL=GamesManager.js.map