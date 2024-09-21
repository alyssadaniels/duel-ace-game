import { describe, expect, it } from "vitest";
import PlayCardPrompt from "../../../src/components/game-layouts/PlayCardPrompt";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/vitest";
import jest from "jest-mock";
import { userEvent } from "@testing-library/user-event";
import { emitSpy } from "../../setup";

describe("PlayCardPrompt", () => {
    it("should render two buttons - play on self and play on opponent", () => {
        render(
            <PlayCardPrompt cardID={1} setShowing={(state: boolean) => {}} />
        );

        expect(screen.getByText(/play on self/i)).toHaveRole("button");
        expect(screen.getByText(/play on opponent/i)).toHaveRole("button");
    });

    it("should call setShowing with false when clicked", async () => {
        // set up mock
        const setShowingMock = jest.fn();

        // render
        render(<PlayCardPrompt cardID={1} setShowing={setShowingMock} />);

        const user = userEvent.setup();

        const selfButton = screen.getByText(/play on self/i);
        await user.click(selfButton);

        expect(setShowingMock).toHaveBeenCalledWith(false);

        const opponentButton = screen.getByText(/play on opponent/i);
        await user.click(opponentButton);

        expect(setShowingMock).toHaveBeenCalledTimes(2);
        expect(setShowingMock).toHaveBeenLastCalledWith(false);
    });

    it("should emit 'play-card' with playedOnSelf = true when 'play on self' button clicked", async () => {
        // render
        render(<PlayCardPrompt cardID={0} setShowing={() => {}} />);

        const button = screen.getByText(/play on self/i);
        const user = userEvent.setup();

        await user.click(button);

        expect(emitSpy).toHaveBeenCalledWith("play-card", {
            playOnSelf: true,
            cardID: 0,
        });
    });

    it("should emit 'play-card' with playedOnSelf = false when 'play on opponent' button clicked", async () => {
        // render
        render(<PlayCardPrompt cardID={0} setShowing={() => {}} />);

        const button = screen.getByText(/play on opponent/i);
        const user = userEvent.setup();

        await user.click(button);

        expect(emitSpy).toHaveBeenCalledWith("play-card", {
            playOnSelf: false,
            cardID: 0,
        });
    });
});
