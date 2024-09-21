import { describe, expect, it } from "vitest";
import { CardType } from "../../../src/types";
import PlayableCards from "../../../src/components/game-layouts/PlayableCards";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("PlayableCards", () => {
    const cards = [
        { type: CardType.Double, displayValue: 5, trueValue: 5 },
        { type: CardType.Cancel, displayValue: 2, trueValue: -2 },
        { type: CardType.Minus, displayValue: 8, trueValue: 8 },
        null,
    ];

    it("should render a card for every card in active cards and a slot for every open space", () => {
        render(<PlayableCards cards={cards} canPlay={false} />);

        expect(screen.getAllByTestId("card")).toHaveLength(3);
        expect(screen.getAllByTestId("card-slot")).toHaveLength(1);
    });
    it("should render clickable cards when canPlay is true", () => {
        render(<PlayableCards cards={cards} canPlay={true} />);

        const cardElements = screen.getAllByTestId("card");
        const buttonElements = screen.getAllByRole("button");

        // cards and buttons should be the same
        for (let i = 0; i < cardElements.length; i++) {
            expect(cardElements[i]).toBe(buttonElements[i]);
        }
    });
    it("should render non clickable cards when canPlay is false", () => {
        render(<PlayableCards cards={cards} canPlay={false} />);

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
});
