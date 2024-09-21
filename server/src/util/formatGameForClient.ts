import Card, { CardType } from "../classes/Card";
import Game from "../classes/Game";

interface CardData {
    type: CardType;
    displayValue: number;
    trueValue: number;
}

// in form of "me", "my", etc. so client does not have to reason what data is linked to them and what data is for other player
interface FormattedGameData {
    me: {
        activeCards: CardData[];
        playableCards: CardData[];
        hasStood: boolean;
        canPlay: boolean;
    };
    other: {
        activeCards: CardData[];
        playableCards: CardData[];
        hasStood: boolean;
        canPlay: boolean;
    };
    myTurn: boolean;
    amWinner: undefined | boolean;
}

/**
 * Format cards
 * @param cards to format
 * @returns array of card data
 */
function formatCardsForClient(cards: Card[]): CardData[] {
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
export default function formatGameForClient(
    game: Game,
    clientID: string
): FormattedGameData {
    const me = game.getPlayer(clientID);
    const meActiveCards = formatCardsForClient(me.getActiveCards());
    const mePlayableCards = formatCardsForClient(me.getPlayableCards());

    const other = game.getOtherPlayer(clientID);
    const otherActiveCards = formatCardsForClient(other.getActiveCards());
    const otherPlayableCards = formatCardsForClient(other.getPlayableCards());

    // get winner
    let winner: undefined | boolean;
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
