import Game from "./Game";
const CPU_ID = "cpu";

/**
 * Manages active games
 */
export default class GamesManager {
    #games: { [playerID: string]: { game: Game; otherID: string } } = {};

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
    getGame(playerID: string): { game: Game; otherID: string } {
        return this.#games[playerID];
    }

    /**
     * Get ID of opponent of playerID
     * @param playerID
     */
    getOpponentID(playerID: string): string {
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
    initMultiplayerGame(playerIDs: [string, string]): void {
        this.leaveAllGames(playerIDs[0]);
        this.leaveAllGames(playerIDs[1]);

        // shuffle for random player 1
        if (Math.random() > 0.5) {
            const temp = playerIDs[0];

            playerIDs[0] = playerIDs[1];
            playerIDs[1] = temp;
        }

        // create game
        const game = new Game(playerIDs[0], playerIDs[1]);

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
    playCard(playerID: string, playOnSelf: boolean, cardID: number): void {
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
    endTurn(playerID: string): void {
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
    setStand(playerID: string): void {
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
    doCPUTurn(playerID: string): boolean {
        // make sure game exists
        if (
            !this.#games[playerID] ||
            this.#games[playerID].otherID !== CPU_ID
        ) {
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
    initSingleplayerGame(playerID: string): void {
        this.leaveAllGames(playerID);

        this.#games[playerID] = {
            game: new Game(playerID, CPU_ID),
            otherID: CPU_ID,
        };
    }

    /**
     * Removes player for games they are in (should just be 1 or less)
     * @param playerID
     * @return array of ids effected (there were active games for playerID vs id)
     */
    leaveAllGames(playerID: string): string[] {
        // check for active multiplayer games
        if (!this.#games[playerID]) {
            return;
        }

        if (this.#games[playerID].otherID === CPU_ID) {
            // if game is singleplayer, delete game
            delete this.#games[playerID];
        } else {
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
