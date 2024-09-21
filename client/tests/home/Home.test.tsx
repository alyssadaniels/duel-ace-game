import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../../src/home/Home";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Home", () => {
    it("should render offline if not connected", () => {
        render(<Home isConnected={false} numUsers={2} />, {
            wrapper: BrowserRouter,
        });

        expect(screen.getByText(/offline/i));
    });

    it("should render connected if connected", () => {
        render(<Home isConnected={true} numUsers={1} />, {
            wrapper: BrowserRouter,
        });

        expect(screen.getByText(/connected/i));
    });

    it("should render number of users", () => {
        const numUsers = 5;
        render(<Home isConnected={true} numUsers={numUsers} />, {
            wrapper: BrowserRouter,
        });

        expect(screen.getByText(new RegExp(`${numUsers}`)));
    });

    it("should hide logo and render rules when how to play is clicked", async () => {
        render(<Home isConnected={true} numUsers={2} />, {
            wrapper: BrowserRouter,
        });

        const button = screen.getByText(/how to play/i);
        const user = userEvent.setup();

        await user.click(button);

        // on duel ace from the nav bar
        expect(screen.queryAllByText(/duel/i)).toHaveLength(1);

        expect(screen.getByText(/goal/i));
        expect(screen.getByText(/how to play/i));
        expect(screen.getByText(/special cards/i));
    });

    it("should render logo and hide rules when hide rules is clicked", async () => {
        render(<Home isConnected={true} numUsers={2} />, {
            wrapper: BrowserRouter,
        });

        const rulesButton = screen.getByText(/how to play/i);

        const user = userEvent.setup();
        await user.click(rulesButton);

        const hideButton = screen.getByText(/hide rules/i);
        await user.click(hideButton);

        expect(screen.queryAllByText(/duel/i)).toHaveLength(2);

        expect(screen.queryByText(/goal/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/special cards/i)).not.toBeInTheDocument();
    });

    it("should navigate to singleplayer when singleplayer button clicked", async () => {
        render(<Home isConnected={true} numUsers={2} />, {
            wrapper: BrowserRouter,
        });

        const button = screen.getByText(/single player/i);

        const user = userEvent.setup();
        await user.click(button);

        expect(window.location.href).toBe(
            `${window.location.origin}/singleplayer`
        );
    });

    it("should navigate to multiplayer when multiplayer button clicked", async () => {
        render(<Home isConnected={true} numUsers={2} />, {
            wrapper: BrowserRouter,
        });

        const button = screen.getByText(/find a match/i);

        const user = userEvent.setup();
        await user.click(button);

        expect(window.location.href).toBe(
            `${window.location.origin}/multiplayer`
        );
    });

    it("should navigate to private when private button clicked", async () => {
        render(<Home isConnected={true} numUsers={2} />, {
            wrapper: BrowserRouter,
        });

        const button = screen.getByText(/private game/i);

        const user = userEvent.setup();
        await user.click(button);

        expect(window.location.href).toBe(
            `${window.location.origin}/private-multiplayer`
        );
    });
});
