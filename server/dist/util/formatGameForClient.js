"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formatGameForClient;
/**
 * Format cards
 * @param cards to format
 * @returns array of card data
 */
function formatCardsForClient(cards) {
    return cards.map((card) => {
        if (card) {
            return {
                type: card.getType(),
                displayValue: card.getDisplayValue(),
                trueValue: card.getTrueValue(),
            };
        }
    });
}
/**
 * Formats a game for a specific client
 * @param game game to format
 * @param clientID of client game will be sent to
 * @returns formatted game object, with "me" referring to client
 */
function formatGameForClient(game, clientID) {
    const me = game.getPlayer(clientID);
    const meActiveCards = formatCardsForClient(me.getActiveCards());
    const mePlayableCards = formatCardsForClient(me.getPlayableCards());
    const other = game.getOtherPlayer(clientID);
    const otherActiveCards = formatCardsForClient(other.getActiveCards());
    const otherPlayableCards = formatCardsForClient(other.getPlayableCards());
    // get winner
    let winner;
    if (game.getWinner()) {
        winner = game.getWinner() === clientID;
    }
    return {
        me: {
            activeCards: meActiveCards,
            playableCards: mePlayableCards,
            hasStood: me.getHasStood(),
            canPlay: me.getCanPlay(),
        },
        other: {
            activeCards: otherActiveCards,
            playableCards: otherPlayableCards,
            hasStood: other.getHasStood(),
            canPlay: other.getCanPlay(),
        },
        myTurn: game.getCurrentTurn() === clientID,
        amWinner: winner,
    };
}
//# sourceMappingURL=formatGameForClient.js.map