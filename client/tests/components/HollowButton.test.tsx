import { describe, expect, it } from "vitest";
import HollowButton from "../../src/components/HollowButton";
import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import jest from "jest-mock";
import "@testing-library/jest-dom/vitest";

describe("HollowButton", () => {
    it("should call onClick function when clicked", async () => {
        const onClickMock = jest.fn();

        render(<HollowButton onClick={onClickMock}>placeholder</HollowButton>);

        const user = userEvent.setup();

        const button = screen.getByRole("button");
        await user.click(button);

        expect(onClickMock).toHaveBeenCalledOnce();
    });

    it("should render children", () => {
        const innerText = "placeholder";
        render(<HollowButton onClick={() => {}}>{innerText}</HollowButton>);

        expect(screen.getByText(innerText));
    });
});
