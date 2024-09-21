import { describe, expect, it } from "vitest";
import CopyButton from "../../src/components/CopyButton";
import userEvent from "@testing-library/user-event";
import React from "react";
import { render, screen } from "@testing-library/react";

describe("CopyButton", () => {
    it("should copy text when clicked", async () => {
        const testText = "test text";
        render(<CopyButton text={testText} title="test title" />);

        const user = userEvent.setup();

        const button = screen.getByRole("button");
        await user.click(button);

        expect(await navigator.clipboard.readText()).toBe(testText);
    });
});
