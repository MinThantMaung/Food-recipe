import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { expect, test, vi } from "vitest";
import { ConfirmPasswordForm } from "./ConfirmPasswordForm";

test.each([
  {
    name: "shows an error when passwords do not match",
    password: "Recipe123!",
    confirmPassword: "Different123!",
    message: "Passwords do not match",
  },
  {
    name: "shows a length error when the password is too short",
    password: "Aa1!" + "a".repeat(3),
    confirmPassword: "Aa1!" + "a".repeat(3),
    message: "Password must be between 8 and 72 characters",
  },
  {
    name: "shows a length error when the password is too long",
    password: "Aa1!" + "a".repeat(69),
    confirmPassword: "Aa1!" + "a".repeat(69),
    message: "Password must be between 8 and 72 characters",
  },
  {
    name: "shows an error when the password has no lowercase letter",
    password: "AASC@!12314",
    confirmPassword: "AASC@!12314",
    message: "Password must contain at least one lowercase letter",
  },
  {
    name: "shows an error when the password has no uppercase letter",
    password: "abcde@!12314",
    confirmPassword: "abcde@!12314",
    message: "Password must contain at least one uppercase letter",
  },
  {
    name: "shows an error when the password has no number",
    password: "Abcdefgh!",
    confirmPassword: "Abcdefgh!",
    message: "Password must contain at least one number",
  },
  {
    name: "shows an error when the password has no special character",
    password: "Abcde12345",
    confirmPassword: "Abcde12345",
    message: "Password must contain at least one special character",
  },
  {
    name: "Password is required",
    password: "",
    confirmPassword: "",
    message: "Password is required",
  },
  {
    name: "Please confirm your password",
    password: "Aa1!" + "a".repeat(60),
    confirmPassword: "",
    message: "Please confirm your password",
  },
])("$name", async ({ password, confirmPassword, message }) => {
  const user = userEvent.setup();
  const action = vi.fn(() => null);

  const router = createMemoryRouter([
    {
      path: "/",
      element: <ConfirmPasswordForm />,
      action,
    },
  ]);

  render(<RouterProvider router={router} />);

  if (password) {
    await user.type(
      screen.getByLabelText("Password", { exact: true }),
      password,
    );
  }

  if (confirmPassword) {
    await user.type(
      screen.getByLabelText("Confirm password", { exact: true }),
      confirmPassword,
    );
  }

  await user.click(screen.getByRole("button", { name: "Create account" }));

  expect(await screen.findByText(message)).toBeInTheDocument();
  expect(action).not.toHaveBeenCalled();
});

test.each([
  { length: 8, password: "Aa1!" + "a".repeat(4) },
  { length: 64, password: "Aa1!" + "a".repeat(60) },
  { length: 72, password: "Aa1!" + "a".repeat(68) },
])(
  "submits matching passwords with $length characters",
  async ({ password }) => {
    const user = userEvent.setup();
    const action = vi.fn(() => null);

    const router = createMemoryRouter([
      {
        path: "/",
        element: <ConfirmPasswordForm />,
        action,
      },
    ]);

    render(<RouterProvider router={router} />);

    await user.type(
      screen.getByLabelText("Password", { exact: true }),
      password,
    );

    await user.type(
      screen.getByLabelText("Confirm password", { exact: true }),
      password,
    );

    await user.click(screen.getByRole("button", { name: "Create account" }));

    await waitFor(() => {
      expect(action).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.queryByText("Password must be between 8 and 72 characters"),
    ).not.toBeInTheDocument();
  },
);

test("submits when matching passwords are between 8 and 72 characters", async () => {
  const user = userEvent.setup();
  const password = "Aa1!" + "a".repeat(60); // 64 characters
  const action = vi.fn(async ({ request }: { request: Request }) => {
    const formData = await request.formData();

    return {
      method: request.method,
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
  });

  const router = createMemoryRouter([
    {
      path: "/",
      element: <ConfirmPasswordForm />,
      action,
    },
  ]);

  render(<RouterProvider router={router} />);

  await user.type(screen.getByLabelText("Password", { exact: true }), password);

  await user.type(
    screen.getByLabelText("Confirm password", { exact: true }),
    password,
  );

  await user.click(screen.getByRole("button", { name: "Create account" }));

  await waitFor(() => {
    expect(action).toHaveBeenCalledTimes(1);
  });

  await expect(action.mock.results[0].value).resolves.toEqual({
    method: "POST",
    password,
    confirmPassword: password,
  });

  expect(
    screen.queryByText("Password must be between 8 and 72 characters"),
  ).not.toBeInTheDocument();
});
