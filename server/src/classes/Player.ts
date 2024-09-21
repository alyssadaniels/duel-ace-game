import Card, { CardType } from "./Card";

const MAX_ACTIVE_CARDS = 7;
const MAX_PLAYABLE_CARDS = 2;

// options are double, cancel, minus, plus with value 3-7
const PLAYABLE_CARD_OPTIONS = [];
[(CardType.Double, CardType.Cancel, CardType.Minus, CardType.Plus)].forEach(
    (type) => {
        PLAYABLE_CARD_OPTIONS.push({ type: type, minValue: 3, maxValue: 7 });
    }
);

/**
 * Creates a random card given the options
 * @param options card types to chooses from
 * @returns new Card object
 */
function createRandomCard(
    options: { type: CardType; minValue: number; maxValue: number }[]
): Card {
    // get type
    const randomIdx: number = Math.floor(Math.random() * options.length);

    // return card
    return new Card(
        options[randomIdx].type,
        options[randomIdx].minValue,
        options[randomIdx].maxValue
    );
}

/**
 * Represents player data in a game
 */
export default class Player {
    #activeCards: Card[] = new Array(MAX_ACTIVE_CARDS);
    #playableCards: Card[] = new Array(MAX_PLAYABLE_CARDS);
    #hasStood: boolean = false;
    #canPlay: boolean = true;

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
    getActiveCards(): Card[] {
        return this.#activeCards;
    }

    /**
     * Get if active cards are full (has no empty slots)
     * @returns whether active cards is full or not
     */
    isActiveCardsFull(): boolean {
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
    getPlayableCards(): Card[] {
        return this.#playableCards;
    }

    /**
     * Get hasStood
     * @returns whether player has stood or not
     */
    getHasStood(): boolean {
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
    getCanPlay(): boolean {
        return this.#canPlay;
    }

    /**
     * Set canPlay
     * @param canPlay
     */
    setCanPlay(canPlay: boolean) {
        this.#canPlay = canPlay;
    }

    getScore(): number {
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
    removePlayableCard(idx: number): Card {
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
    addToActiveCards(card: Card): boolean {
        // find next empty slot
        for (let i = 0; i < this.#activeCards.length; i++) {
            if (!this.#activeCards[i]) {
                // set true value (if applicable)
                if (card.getType() === CardType.Double) {
                    if (i - 1 >= 0) {
                        const previousCard = this.#activeCards[i - 1];
                        card.setTrueValue(previousCard.getTrueValue());
                    } else {
                        // no previous card
                        card.setTrueValue(0);
                    }
                } else if (card.getType() === CardType.Cancel) {
                    if (i - 1 >= 0) {
                        const previousCard = this.#activeCards[i - 1];

                        card.setTrueValue(previousCard.getTrueValue() * -1);
                    } else {
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
