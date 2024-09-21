"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardType = void 0;
var CardType;
(function (CardType) {
    CardType["Standard"] = "standard";
    CardType["Plus"] = "plus";
    CardType["Minus"] = "minus";
    CardType["Double"] = "double";
    CardType["Cancel"] = "cancel";
})(CardType || (exports.CardType = CardType = {}));
/**
 * Represents a card
 */
class Card {
    #type;
    // display value and true value are stored separately, since they can be different
    // ex. for a minus 6 card, the display value is 6, but the true value is -6
    #displayValue;
    #trueValue;
    /**
     * Constructs a Card object
     * Sets value to a random number in [cardValMin, cardValMax)
     * @param type of card (from CardType)
     * @param cardValMin minimum card value
     * @param cardValMax maximum card value (non inclusive)
     */
    constructor(type, cardValMin, cardValMax) {
        if (cardValMax <= cardValMin) {
            throw RangeError("cardValMax must be less than to cardValMin");
        }
        // set type
        this.#type = type;
        // get display value
        this.#displayValue = Math.floor(Math.random() * (cardValMax - cardValMin) + cardValMin);
        // set true value (if possible)
        if (type === CardType.Standard || type === CardType.Plus) {
            this.#trueValue = this.#displayValue;
        }
        else if (type === CardType.Minus) {
            this.#trueValue = this.#displayValue * -1;
        }
    }
    /**
     * Gets type associated with card
     * @returns card type (CardType)
     */
    getType() {
        return this.#type;
    }
    /**
     * Gets display value associated with card
     * @returns display value (number)
     */
    getDisplayValue() {
        return this.#displayValue;
    }
    /**
     * Gets true value associated with card
     * @returns true value (number)
     */
    getTrueValue() {
        return this.#trueValue;
    }
    /**
     * Sets true value associated with card
     * standard, plus, minus cards can not have their true value set
     * @param value value to set true value to
     */
    setTrueValue(value) {
        if (this.#trueValue) {
            return;
        }
        this.#trueValue = value;
    }
}
exports.default = Card;
//# sourceMappingURL=Card.js.map