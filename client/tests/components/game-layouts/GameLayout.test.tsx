import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import GameLayout from "../../../src/components/game-layouts/GameLayout";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { emitSpy, exampleGameObj } from "../../setup";

describe("GameLayout", () => {
    it("should render nothing if game object is undefined", () => {
        render(<GameLayout gameObj={undefined} />);
        expect(screen).toBeEmptyDOMElement;
    });

    it("should should render active cards for both players, playable cards for both players, and end turn/stand buttons", () => {
        render(<GameLayout gameObj={exampleGameObj} />);

        expect(screen.queryAllByTestId("card")).toHaveLength(8);
        expect(screen.queryAllByTestId("card-slot")).toHaveLength(9);
        expect(screen.getByText(/end turn/i));
        expect(screen.getByText(/stand/i));
    });

    it("should disable buttons if it is not the player's turn", () => {
        exampleGameObj.myTurn = false;
        render(<GameLayout gameObj={exampleGameObj} />);

        expect(screen.getByText(/end turn/i)).toBeDisabled();
        expect(screen.getByText(/stand/i)).toBeDisabled();
    });

    it("should emit 'end-turn' when end turn clicked", async () => {
        exampleGameObj.myTurn = true;
        render(<GameLayout gameObj={exampleGameObj} />);

        const button = screen.getByText(/end turn/i);
        const user = userEvent.setup();

        await user.click(button);

        expect(emitSpy).toHaveBeenCalledWith("end-turn");
    });

    it("should emit 'stand' when stand button clicked", async () => {
        exampleGameObj.myTurn = true;
        render(<GameLayout gameObj={exampleGameObj} />);

        const button = screen.getByText(/stand/i);
        const user = userEvent.setup();

        await user.click(button);

        expect(emitSpy).toHaveBeenCalledWith("stand");
    });
});
