import Card, { CardType } from "./Card";
import Player from "./Player";

/**
 * Represents a single game
 */
export default class Game {
    #players: { [id: string]: Player } = {};
    #currentTurn: string;
    #winner: string | undefined;

    /**
     * Creates a game
     * @param player1ID id of first player, currentTurn will be set to this id
     * @param player2ID id of second player
     */
    constructor(player1ID: string, player2ID: string) {
        // set player data
        this.#players[player1ID] = new Player();

        this.#players[player2ID] = new Player();

        // set game data
        this.#currentTurn = player1ID;

        // start current turn
        this.#startCurrentTurn();
    }

    /**
     * Set current turn to not current turn player
     */
    #toggleTurn() {
        const otherPlayerID = this.#getOtherPlayerID(this.#currentTurn);

        // if other player has stood don't switch turn
        if (this.#players[otherPlayerID].getHasStood() === true) {
            return;
        }

        this.#currentTurn = otherPlayerID;

        return;
    }

    /**
     * Gets id of player that does not have id knownPlayerID
     * @param knownPlayerID id of known player
     * @returns other player ID
     */
    #getOtherPlayerID(knownPlayerID: string): string {
        let otherID: string;

        for (let id in this.#players) {
            if (id !== knownPlayerID) {
                otherID = id;
            }
        }

        return otherID;
    }

    /**
     * Gets player data for specific player
     * @param id of player
     * @returns player data for player with given id
     */
    getPlayer(id: string): Player {
        return this.#players[id];
    }

    /**
     * Get player data for other player (with id != given id)
     * @param id of known player
     * @returns player data for other player
     */
    getOtherPlayer(id: string): Player {
        const otherPlayerID = this.#getOtherPlayerID(id);
        return this.#players[otherPlayerID];
    }

    /**
     * Gets game winner
     * @returns winner
     */
    getWinner(): string | undefined {
        return this.#winner;
    }

    /**
     * Gets current turn
     * @returns player id of current turn
     */
    getCurrentTurn(): string {
        return this.#currentTurn;
    }

    /**
     * Play a card. Playing a card ends the player's turn
     * @param playerID of player that is playing card
     * @param playOnSelf should play on self or other player
     * @param cardIdx of card. id is in reference to the player's playable cards
     */
    playCard(playerID: string, playOnSelf: boolean, cardIdx: number): void {
        // make sure player exists
        if (!this.#players[playerID]) {
            return;
        }

        // make sure it is the player's turn & haven't already played
        if (
            this.#currentTurn !== playerID ||
            !this.#players[playerID].getCanPlay()
        ) {
            return;
        }

        // get playedOn id
        let playedOnID: string;

        if (playOnSelf === true) {
            playedOnID = playerID;
        } else {
            playedOnID = this.#getOtherPlayerID(playerID);
        }

        // make sure played on has not stood
        if (this.#players[playedOnID].getHasStood()) {
            return;
        }

        // make sure player has the card
        const card = this.#players[playerID].removePlayableCard(cardIdx);

        if (!card) {
            return;
        }

        // add card to other player
        this.#players[playedOnID].addToActiveCards(card);

        // set can play
        this.#players[playerID].setCanPlay(false);
    }

    /**
     * Ends turn for playerID
     * @param playerID of requesting player
     */
    endTurn(playerID: string): void {
        // make sure state matches
        if (this.#currentTurn != playerID) {
            return;
        }

        // make checks

        // total == 21 - win
        if (this.#players[playerID].getScore() === 21) {
            this.#winner = playerID;
        }

        // total > 21 - loss
        if (this.#players[playerID].getScore() > 21) {
            this.#winner = this.#getOtherPlayerID(playerID);
        }

        // slots filled - stand
        if (this.#players[playerID].isActiveCardsFull()) {
            this.#players[playerID].setHasStood();
        }

        // both players stood - end game
        let bothStood = true;
        let maxScore: { id: string; score: number };

        for (let id in this.#players) {
            // check if stood
            if (!this.#players[id].getHasStood()) {
                bothStood = false;
            }

            // record score
            const playerScore = this.#players[id].getScore();

            if (
                !maxScore ||
                (maxScore.score < playerScore && playerScore < 22)
            ) {
                maxScore = {
                    id: id,
                    score: playerScore,
                };
            }
        }

        // set winner
        if (bothStood) {
            this.#winner = maxScore.id;
        }

        // end turn
        this.#toggleTurn();

        // start current turn
        if (!this.#winner) {
            this.#startCurrentTurn();
        }
    }

    /**
     * Set player to stand
     * @param playerID of requesting player
     */
    setStand(playerID: string): void {
        // make sure state matches
        if (this.#currentTurn != playerID) {
            return;
        }

        // set state
        this.#players[playerID].setHasStood();
    }

    /**
     * Starts the current turn (by adding a random standard card to the current player's active cards)
     */
    #startCurrentTurn() {
        // create card
        const card = new Card(CardType.Standard, 2, 10);

        // add to current turn player
        this.#players[this.#currentTurn].addToActiveCards(card);

        // allow player to play a card
        this.#players[this.#currentTurn].setCanPlay(true);
    }
}
