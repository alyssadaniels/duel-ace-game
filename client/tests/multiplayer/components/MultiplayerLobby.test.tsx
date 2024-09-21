import {
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
import MultiplayerLobby from "../../../src/multiplayer/components/MultiplayerLobby";
import { emitSpy, serverSocket } from "../../setup";

describe("MultiplayerLobby", () => {
    it("should emit 'find-multiplayer-game' on initial render", () => {
        render(<MultiplayerLobby />, { wrapper: BrowserRouter });
        expect(emitSpy).toHaveBeenCalledWith("find-multiplayer-game");
    });

    it("should render searching for opponent", () => {
        render(<MultiplayerLobby />, { wrapper: BrowserRouter });
        expect(screen.getByText(/searching for opponent/i));
    });

    it("should render join button when receive 'game-found'", async () => {
        render(<MultiplayerLobby />, { wrapper: BrowserRouter });

        serverSocket.emit("game-found");
        const button = await screen.findByRole("button");

        expect(button).toHaveTextContent(/join/i);
    });

    it("should emit 'confirmed-multiplayer-join' when join button clicked", async () => {
        render(<MultiplayerLobby />, { wrapper: BrowserRouter });

        serverSocket.emit("game-found");

        const button = await screen.findByRole("button");
        const user = userEvent.setup();

        await user.click(button);

        expect(emitSpy).toHaveBeenCalledWith("confirmed-multiplayer-join");
    });

    it("should redirect to home page if 'join-failed' is user's fault", async () => {
        render(<MultiplayerLobby />, { wrapper: BrowserRouter });

        serverSocket.emit("game-found");
        await waitForElementToBeRemoved(() => screen.getByText(/searching/i));

        serverSocket.emit("join-failed", { myFault: true });
        await waitFor(() =>
            expect(window.location.href).toBe(`${window.location.origin}/`)
        );
    });

    it("should render searching for opponent if 'join-failed' is not user's fault", async () => {
        render(<MultiplayerLobby />, { wrapper: BrowserRouter });

        serverSocket.emit("game-found");
        await waitForElementToBeRemoved(() => screen.getByText(/searching/i));

        serverSocket.emit("join-failed", { myFault: false });
        await waitFor(() =>
            expect(screen.getByText(/searching/i)).toBeInTheDocument()
        );
    });
});
