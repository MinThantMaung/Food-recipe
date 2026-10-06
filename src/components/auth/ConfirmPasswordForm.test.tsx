import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import { ConfirmPasswordForm } from "./ConfirmPasswordForm";

test("shows an error when passwords do not match", async () => {
  const user = userEvent.setup();

  const router = createMemoryRouter([
    {
      path: "/",
      element: <ConfirmPasswordForm />,
    },
  ]);

  render(<RouterProvider router={router} />);

  await user.type(
    screen.getByLabelText("Password", { exact: true }),
    "Recipe123!",
  );

  await user.type(
    screen.getByLabelText("Confirm password", { exact: true }),
    "Different123!",
  );

  await user.click(screen.getByRole("button", { name: "Create account" }));

  expect(await screen.findByText("Passwords do not match")).toBeInTheDocument();
});

test("shows a length error when the password is too short", async () => {
  const user = userEvent.setup();

  const router = createMemoryRouter([
    {
      path: "/",
      element: <ConfirmPasswordForm />,
    },
  ]);

  render(<RouterProvider router={router} />);

  await user.type(screen.getByLabelText("Password", { exact: true }), "Ab1!!");

  await user.type(
    screen.getByLabelText("Confirm password", { exact: true }),
    "Ab1!",
  );

  await user.click(screen.getByRole("button", { name: "Create account" }));

  expect(
    await screen.findByText("Password must be between 8 and 72 characters"),
  ).toBeInTheDocument();
});

test("shows a length error when the password is too long", async () => {
  const user = userEvent.setup();
  const longPassword = "Aa1!" + "a".repeat(71);

  const router = createMemoryRouter([
    {
      path: "/",
      element: <ConfirmPasswordForm />,
    },
  ]);

  render(<RouterProvider router={router} />);

  await user.type(screen.getByLabelText("Password", { exact: true }), longPassword);

  await user.type(
    screen.getByLabelText("Confirm password", { exact: true }),
    longPassword,
  );

  await user.click(screen.getByRole("button", { name: "Create account" }));

  expect(
    await screen.findByText("Password must be between 8 and 72 characters"),
  ).toBeInTheDocument();
});

