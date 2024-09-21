import { describe, expect, it } from "vitest";
import { CardType } from "../../../src/types";
import ActiveCards from "../../../src/components/game-layouts/ActiveCards";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("ActiveCards", () => {
    const cards = [
        { type: CardType.Minus, displayValue: 5, trueValue: 5 },
        { type: CardType.Minus, displayValue: 2, trueValue: -2 },
        { type: CardType.Minus, displayValue: 8, trueValue: 8 },
        null,
        null,
        null,
        null,
    ];

    const expectedSum = 11;

    it("should render a card for every card in active cards and a slot for every open space", () => {
        render(<ActiveCards cards={cards} hasStood={true} />);

        expect(screen.queryAllByTestId("card")).toHaveLength(3);
        expect(screen.queryAllByTestId("card-slot")).toHaveLength(
            cards.length - 3
        );
    });
    
    it("should render a score equal to the total of the active cards' true values", () => {
        render(<ActiveCards cards={cards} hasStood={true} />);
        expect(screen.getByText(String(expectedSum)));
    });
});
