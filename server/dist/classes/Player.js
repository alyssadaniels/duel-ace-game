"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importStar(require("./Card"));
const MAX_ACTIVE_CARDS = 7;
const MAX_PLAYABLE_CARDS = 2;
// options are double, cancel, minus, plus with value 3-7
const PLAYABLE_CARD_OPTIONS = [];
[(Card_1.CardType.Double, Card_1.CardType.Cancel, Card_1.CardType.Minus, Card_1.CardType.Plus)].forEach((type) => {
    PLAYABLE_CARD_OPTIONS.push({ type: type, minValue: 3, maxValue: 7 });
});
/**
 * Creates a random card given the options
 * @param options card types to chooses from
 * @returns new Card object
 */
function createRandomCard(options) {
    // get type
    const randomIdx = Math.floor(Math.random() * options.length);
    // return card
    return new Card_1.default(options[randomIdx].type, options[randomIdx].minValue, options[randomIdx].maxValue);
}
/**
 * Represents player data in a game
 */
class Player {
    #activeCards = new Array(MAX_ACTIVE_CARDS);
    #playableCards = new Array(MAX_PLAYABLE_CARDS);
    #hasStood = false;
    #canPlay = true;
    constructor() {
        // set playable cards at random
        for (let i = 0; i < this.#playableCards.length; i++) {
            this.#playableCards[i] = createRandomCard(PLAYABLE_CARD_OPTIONS);
        }
    }
    /**
     * Get active cards
     * @returns active cards
     */
    getActiveCards() {
        return this.#activeCards;
    }
    /**
     * Get if active cards are full (has no empty slots)
     * @returns whether active cards is full or not
     */
    isActiveCardsFull() {
        for (let i = 0; i < this.#activeCards.length; i++) {
            if (!this.#activeCards[i]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Get playable cards
     * @returns playable cards
     */
    getPlayableCards() {
        return this.#playableCards;
    }
    /**
     * Get hasStood
     * @returns whether player has stood or not
     */
    getHasStood() {
        return this.#hasStood;
    }
    /**
     * Set hasStood to true
     */
    setHasStood() {
        this.#hasStood = true;
    }
    /**
     * Get can play
     * @returns whether player can play a card or not
     */
    getCanPlay() {
        return this.#canPlay;
    }
    /**
     * Set canPlay
     * @param canPlay
     */
    setCanPlay(canPlay) {
        this.#canPlay = canPlay;
    }
    getScore() {
        let score = 0;
        for (let i = 0; i < this.#activeCards.length; i++) {
            if (this.#activeCards[i]) {
                score += this.#activeCards[i].getTrueValue();
            }
        }
        return score;
    }
    /**
     * Removes card with given index from playable cards
     * @param idx of card to remove
     * @returns card that was removed
     */
    removePlayableCard(idx) {
        const card = this.#playableCards[idx];
        // check card exists
        if (!card) {
            return card;
        }
        this.#playableCards[idx] = null;
        return card;
    }
    /**
     * Add card to active cards
     * @param card to add
     * @returns success?
     */
    addToActiveCards(card) {
        // find next empty slot
        for (let i = 0; i < this.#activeCards.length; i++) {
            if (!this.#activeCards[i]) {
                // set true value (if applicable)
                if (card.getType() === Card_1.CardType.Double) {
                    if (i - 1 >= 0) {
                        const previousCard = this.#activeCards[i - 1];
                        card.setTrueValue(previousCard.getTrueValue());
                    }
                    else {
                        // no previous card
                        card.setTrueValue(0);
                    }
                }
                else if (card.getType() === Card_1.CardType.Cancel) {
                    if (i - 1 >= 0) {
                        const previousCard = this.#activeCards[i - 1];
                        card.setTrueValue(previousCard.getTrueValue() * -1);
                    }
                    else {
                        // no previous card
                        card.setTrueValue(0);
                    }
                }
                this.#activeCards[i] = card;
                return true;
            }
        }
        // no empty slot found
        return false;
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map