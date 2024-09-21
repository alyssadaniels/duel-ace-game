import { describe, it, expect } from "vitest";
import NavigationBar from "../../src/components/NavigationBar";
import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import jest from "jest-mock";

describe("NavigationBar", () => {
    it("should render home link", () => {
        render(<NavigationBar />, { wrapper: BrowserRouter });
        expect(screen.getByRole("link")).toHaveAttribute("href", "/");
    });

    it("should navigate to home page when home link clicked", async () => {
        render(<NavigationBar />, { wrapper: BrowserRouter });

        const user = userEvent.setup();

        const link = screen.getByRole("link");
        await user.click(link);

        expect(window.location.href).toBe(`${window.location.origin}/`);
    });

    it("should show confirmation before navigating if interceptNavigation true", async () => {
        // set up spy
        jest.spyOn(window, "confirm").mockImplementation(
            (message?: string) => !!message
        );

        // render
        render(<NavigationBar interceptNavigation={true} />, {
            wrapper: BrowserRouter,
        });

        const user = userEvent.setup();

        const link = screen.getByRole("link");
        await user.click(link);

        expect(window.confirm).toHaveBeenCalledOnce();
    });
});
