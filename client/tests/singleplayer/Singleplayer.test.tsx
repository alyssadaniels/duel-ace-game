import {
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import SinglePlayer from "../../src/singleplayer/SinglePlayer";
import { emitSpy, exampleGameObj, serverSocket } from "../setup";

describe("Singleplayer", () => {
    it("should emit 'start-singleplayer-game' on first render", () => {
        render(<SinglePlayer />, {
            wrapper: BrowserRouter,
        });

        expect(emitSpy).toHaveBeenCalledWith("start-singleplayer-game");
    });

    it("should render navbar (and nothing else) if no game defined", () => {
        render(<SinglePlayer />, {
            wrapper: BrowserRouter,
        });

        expect(screen.getByText(/duel/i));
        expect(screen.getByText(/ace/i));

        expect(screen.queryAllByTestId("card"));
        expect(screen.queryAllByTestId("card-slot"));
        expect(screen.queryByText(/end turn/i));
        expect(screen.queryByText(/stand/i));
    });

    it("should render game if game defined", async () => {
        render(<SinglePlayer />, { wrapper: BrowserRouter });

        serverSocket.emit("update-game", exampleGameObj);
        await screen.findAllByTestId("card");

        expect(screen.getAllByTestId("card"));
        expect(screen.getAllByTestId("card-slot"));
        expect(screen.getByText(/end turn/i));
        expect(screen.getByText(/stand/i));
    });

    it("should render game over modal if game has a winner", async () => {
        render(<SinglePlayer />, { wrapper: BrowserRouter });

        exampleGameObj.amWinner = true;

        serverSocket.emit("update-game", exampleGameObj);
        await screen.findAllByTestId("card");

        const modal = screen.getByRole("dialog");
        expect(modal).toHaveTextContent(/win/i);
    });
});
