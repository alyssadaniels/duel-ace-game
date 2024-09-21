import {
    render,
    screen,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import PrivateMultiplayer from "../../src/private-multiplayer/PrivateMultiplayer";
import { exampleGameObj, serverSocket } from "../setup";

describe("PrivateMultiplayer", () => {
    it("should render lobby if no game defined", () => {
        render(<PrivateMultiplayer />, { wrapper: BrowserRouter });
        expect(screen.getByText(/join game/i));
        expect(screen.getByText(/host game/i));
    });

    it("should render game if game defined", async () => {
        render(<PrivateMultiplayer />, { wrapper: BrowserRouter });

        serverSocket.emit("update-game", exampleGameObj);
        await waitForElementToBeRemoved(() => screen.getByText(/join game/i));

        expect(screen.getAllByTestId("card"));
        expect(screen.getAllByTestId("card-slot"));
        expect(screen.getByText(/end turn/i));
        expect(screen.getByText(/stand/i));
    });

    it("should render game over modal if game has a winner", async () => {
        render(<PrivateMultiplayer />, { wrapper: BrowserRouter });

        exampleGameObj.amWinner = false;

        serverSocket.emit("update-game", exampleGameObj);
        await waitForElementToBeRemoved(() => screen.getByText(/join game/i));

        const modal = screen.getByRole("dialog");
        expect(modal).toHaveTextContent(/lose/i);
    });
});
