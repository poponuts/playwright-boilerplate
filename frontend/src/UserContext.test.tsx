import React from "react";
import { render, screen } from "@testing-library/react";
import { UserContext, UserProvider } from "./UserContext";

describe("UserContext", () => {
  it("sets data on load", async () => {
    const fetcher = () =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            id: 1,
            full_name: "AdaLovelace",
            email: "ada@gmail.com",
            phone_number: "112 358",
            avatar_url: "http://not.real.com/ada",
          }),
          {
            status: 200,
          }
        )
      );

    render(
      <UserProvider fetchfn={fetcher} userId={1}>
        <UserContext.Consumer>
          {({ fullName, phoneNumber }) => (
            <>
              <span data-testid="fullName">{fullName}</span>
              <span data-testid="phoneNumber">{phoneNumber}</span>
            </>
          )}
        </UserContext.Consumer>
      </UserProvider>
    );
    const fullNameElem = await screen.findByText(/AdaLovelace/i);
    expect(fullNameElem).toBeInTheDocument();
  });
});
