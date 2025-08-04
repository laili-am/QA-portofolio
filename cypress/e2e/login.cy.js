describe("Login", () => {
  it("❌ Empty username", () => {
    cy.loginNegativeAndExpectError(
      "",
      "secret_sauce",
      "Epic sadface: Username is required"
    );
  });

  it("❌ Empty password", () => {
    cy.loginNegativeAndExpectError(
      "standard_user",
      "",
      "Epic sadface: Password is required"
    );
  });

  it("❌ Wrong password or username", () => {
    cy.loginNegativeAndExpectError(
      "wrong_user",
      "wrong_password",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("✅ Login success all users", () => {
    cy.fixture("users.json").then((users) => {
      users.forEach((user) => {
        cy.log(`Testing user: ${user.username}`);

        if (user.status_login === "valid") {
          cy.loginPositive(user.username, user.password);
          cy.logout();
        } else {
          cy.loginNegativeAndExpectError(
            user.username,
            user.password,
            user.message
          );
        }
      });
    });
  });
});
