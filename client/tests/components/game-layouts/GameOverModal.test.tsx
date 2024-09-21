import { describe, expect, it } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import GameOverModal from "../../../src/components/game-layouts/GameOverModal";
import { BrowserRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import jest from "jest-mock";

describe("GameOverModal", () => {
    it("should display 'win' text if player won", () => {
        render(
            <GameOverModal amWinner={true} playerScore={14} otherScore={5} />,
            { wrapper: BrowserRouter }
        );

        expect(screen.getByText(/win/i));
    });

    it("should display 'lost' text if player lost", () => {
        render(
            <GameOverModal amWinner={false} playerScore={2} otherScore={10} />,
            { wrapper: BrowserRouter }
        );

        expect(screen.getByText(/lose/i));
    });

    it("should display scores of players", () => {
        render(
            <GameOverModal amWinner={true} playerScore={15} otherScore={10} />,
            { wrapper: BrowserRouter }
        );

        expect(screen.getByText(/opponent.*10/i));
        expect(screen.getByText(/your.*15/i));
    });

    it("should navigate home when home button clicked", async () => {
        // render
        render(
            <GameOverModal amWinner={true} playerScore={15} otherScore={10} />,
            { wrapper: BrowserRouter }
        );

        const user = userEvent.setup();
        const home = screen.getByText(/home/i);

        await user.click(home);

        expect(window.location.href).toBe(`${window.location.origin}/`);
    });

    it("should reload page when play again button pressed", async () => {
        // set up spy
        const originalWindowLocation = window.location;

        Object.defineProperty(window, "location", {
            configurable: true,
            value: { reload: jest.fn() },
        });

        // render
        render(
            <GameOverModal amWinner={true} playerScore={15} otherScore={10} />,
            { wrapper: BrowserRouter }
        );

        const user = userEvent.setup();
        const playAgain = screen.getByText(/play again/i);

        await user.click(playAgain);

        expect(window.location.reload).toHaveBeenCalledOnce();

        // clean up
        Object.defineProperty(window, "location", {
            configurable: true,
            value: originalWindowLocation,
        });
    });
});
