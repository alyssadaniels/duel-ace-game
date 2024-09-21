import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useGameObj from "../../src/hooks/useGameObj";
import { serverSocket } from "../setup";
import { CardType, GameObject } from "../../src/types";

describe("useGameObj", () => {
    // me
    const activeCards1 = [
        { type: CardType.Standard, displayValue: 2, trueValue: 2 },
        { type: CardType.Cancel, displayValue: 2, trueValue: -2 },
        { type: CardType.Standard, displayValue: 7, trueValue: 7 },
        null,
        null,
        null,
    ];
    const playableCards1 = [
        { type: CardType.Plus, displayValue: 3, trueValue: 3 },
        { type: CardType.Minus, displayValue: 6, trueValue: -6 },
    ];

    // other
    const activeCards2 = [
        { type: CardType.Standard, displayValue: 2, trueValue: 2 },
        { type: CardType.Standard, displayValue: 5, trueValue: 5 },
        null,
        null,
        null,
        null,
        null,
    ];
    const playableCards2 = [
        null,
        { type: CardType.Minus, displayValue: 3, trueValue: -3 },
    ];

    const gameObj: GameObject = {
        me: {
            activeCards: activeCards1,
            playableCards: playableCards1,
            hasStood: false,
            canPlay: true,
        },
        other: {
            activeCards: activeCards2,
            playableCards: playableCards2,
            hasStood: false,
            canPlay: true,
        },
        myTurn: true,
        amWinner: true,
    };

    it("should init gameObj to undefined", () => {
        const { result } = renderHook(useGameObj);

        expect(result.current).toBeUndefined();
    });

    it("should update gameObj when 'update-game' is emitted", async () => {
        const { result } = renderHook(useGameObj);

        serverSocket.emit("update-game", gameObj);

        await waitFor(() => expect(result.current).toStrictEqual(gameObj));
    });
});
