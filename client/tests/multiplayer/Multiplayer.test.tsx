import { describe, expect, it } from "vitest";
import Multiplayer from "../../src/multiplayer/Multiplayer";
import { BrowserRouter } from "react-router-dom";
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import { exampleGameObj, serverSocket } from "../setup";
import "@testing-library/jest-dom";

describe("Multiplayer", () => {
    it("should render lobby if no game defined", () => {
        render(<Multiplayer />, { wrapper: BrowserRouter });
        expect(screen.getByText(/searching/i));
    });

    it("should render game if game defined", async () => {
        render(<Multiplayer />, { wrapper: BrowserRouter });

        serverSocket.emit("update-game", exampleGameObj);
        await waitForElementToBeRemoved(() => screen.getByText(/searching/i));

        expect(screen.getAllByTestId("card"));
        expect(screen.getAllByTestId("card-slot"));
        expect(screen.getByText(/end turn/i));
        expect(screen.getByText(/stand/i));
    });

    it("should render game over modal if game has a winner", async () => {
        render(<Multiplayer />, { wrapper: BrowserRouter });

        exampleGameObj.amWinner = true;

        serverSocket.emit("update-game", exampleGameObj);
        await waitForElementToBeRemoved(() => screen.getByText(/searching/i));

        const modal = screen.getByRole("dialog");
        expect(modal).toHaveTextContent(/win/i);
    });
});
