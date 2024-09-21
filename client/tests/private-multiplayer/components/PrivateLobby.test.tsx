import {
    findByRole,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import PrivateLobby from "../../../src/private-multiplayer/components/PrivateLobby";
import { emitSpy, serverSocket } from "../../setup";

describe("PrivateLobby", () => {
    it("should render input and join button when join game is clicked", async () => {
        render(<PrivateLobby />, { wrapper: BrowserRouter });

        const user = userEvent.setup();

        const button = screen.getByText(/join game/i);
        await user.click(button);

        expect(screen.getByRole("textbox"));
        // one for original join game and one for new join button
        expect(screen.getAllByText(/join/i)).toHaveLength(2);
    });

    it("should emit 'join-private-game' when join button is clicked", async () => {
        render(<PrivateLobby />, { wrapper: BrowserRouter });

        const user = userEvent.setup();
        await user.click(screen.getByText(/join game/i));

        const button = screen.getAllByText(/join/i)[1];
        await user.click(button);

        expect(emitSpy).toHaveBeenCalledWith(
            "join-private-game",
            expect.anything(),
            expect.anything()
        );
    });

    it("should render join code when host is clicked", async () => {
        render(<PrivateLobby />, { wrapper: BrowserRouter });

        const user = userEvent.setup();

        const button = screen.getByText(/host/i);
        await user.click(button);

        expect(screen.getByText(/join code/i));
    });

    it("should emit 'request-to-host' when host is clicked", async () => {
        render(<PrivateLobby />, { wrapper: BrowserRouter });

        const user = userEvent.setup();

        const button = screen.getByText(/host/i);
        await user.click(button);

        expect(emitSpy).toHaveBeenCalledWith("request-to-host");
    });
});
