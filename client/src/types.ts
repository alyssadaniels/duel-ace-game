// card types, each card type represents a different in game action
export enum CardType {
    Standard = "standard",
    Plus = "plus",
    Minus = "minus",
    Double = "double",
    Cancel = "cancel",
}

// represents game card
export interface GameCard {
    type: CardType;
    displayValue: number;
    trueValue: number;
}

// represents game object
export interface GameObject {
    me: {
        activeCards: (GameCard | undefined | null)[];
        playableCards: (GameCard | undefined | null)[];
        hasStood: boolean;
        canPlay: boolean;
    };
    other: {
        activeCards: (GameCard | undefined | null)[];
        playableCards: (GameCard | undefined | null)[];
        hasStood: boolean;
        canPlay: boolean;
    };
    myTurn: boolean;
    amWinner: undefined | boolean;
}
