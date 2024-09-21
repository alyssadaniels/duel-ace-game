import { describe, expect, it } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Card, { DisplayType } from "../../../src/components/cards/Card";
import { userEvent } from "@testing-library/user-event";
import { emitSpy } from "../../setup";

describe("Card", () => {
    it("should be a button when playable", () => {
        render(
            <Card
                id={1}
                color="bg-green-500"
                displayType={DisplayType.Playable}
            >
                placeholder
            </Card>
        );

        expect(screen.getByRole("button"));
    });

    it("should show play card prompt when clicked", async () => {
        render(
            <Card
                id={1}
                color="bg-green-500"
                displayType={DisplayType.Playable}
            >
                placeholder
            </Card>
        );

        const user = userEvent.setup();
        const button = screen.getByRole("button");

        await user.click(button);

        expect(screen.getByText(/play on self/i)).toHaveRole("button");
        expect(screen.getByText(/play on opponent/i)).toHaveRole("button");
    });

    it("should hide play card prompt when prompt button is clicked", async () => {
        render(
            <Card
                id={1}
                color="bg-green-500"
                displayType={DisplayType.Playable}
            >
                placeholder
            </Card>
        );

        const user = userEvent.setup();

        // open
        const button = screen.getByRole("button");
        await user.click(button);

        // close (using first button)
        const playButton1 = screen.getByText(/play on self/i);
        await user.click(playButton1);

        expect(screen.getAllByRole("button")).toHaveLength(1);
        expect(screen.queryByText(/play on self/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/play on opponent/i)).not.toBeInTheDocument();

        // open
        await user.click(button);

        // close (using second button)
        const playButton2 = screen.getByText(/play on opponent/i);
        await user.click(playButton2);

        expect(screen.getAllByRole("button")).toHaveLength(1);
        expect(screen.queryByText(/play on self/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/play on opponent/i)).not.toBeInTheDocument();
    });

    it("should emit play (with card info) prompt button is clicked", async () => {
        // render
        render(
            <Card
                id={1}
                color="bg-green-500"
                displayType={DisplayType.Playable}
            >
                placeholder
            </Card>
        );

        const user = userEvent.setup();

        // open
        const button = screen.getByRole("button");
        await user.click(button);

        // click
        const playButton1 = screen.getByText(/play on self/i);
        await user.click(playButton1);

        expect(emitSpy).toHaveBeenCalledWith("play-card", {
            playOnSelf: true,
            cardID: 1,
        });
    });

    it("should not be a button if not playable", () => {
        render(
            <>
                <Card
                    id={1}
                    color="bg-green-500"
                    displayType={DisplayType.Unplayable}
                >
                    placeholder
                </Card>
                <Card
                    id={1}
                    color="bg-green-500"
                    displayType={DisplayType.Display}
                >
                    placeholder
                </Card>
            </>
        );

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
});
