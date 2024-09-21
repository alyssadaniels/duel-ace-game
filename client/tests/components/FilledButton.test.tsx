import { describe, it, expect } from "vitest";
import FilledButton from "../../src/components/FilledButton";
import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import jest from "jest-mock";
import "@testing-library/jest-dom/vitest";

describe("FilledButton", () => {
    it("should call onClick function when clicked", async () => {
        const onClickMock = jest.fn();

        render(<FilledButton onClick={onClickMock}>placeholder</FilledButton>);

        const user = userEvent.setup();

        const button = screen.getByRole("button");
        await user.click(button);

        expect(onClickMock).toHaveBeenCalledOnce();
    });

    it("should render children", () => {
        const innerText = "placeholder";
        render(<FilledButton onClick={() => {}}>{innerText}</FilledButton>);

        expect(screen.getByText(innerText));
    });

    it("should be disabled if disabled prop = true", () => {
        render(
            <FilledButton onClick={() => {}} disabled={true}>
                placeholder
            </FilledButton>
        );

        expect(screen.getByRole("button")).toBeDisabled();
    });
});
