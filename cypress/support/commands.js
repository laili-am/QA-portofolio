Cypress.Commands.add("loginPositive", (username, password) => {
  cy.visit("/");
  cy.get(".login_logo").should("exist");
  cy.get('input[name="user-name"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('input[type="submit"]').click();

  cy.url().should("include", "/inventory.html");
  cy.contains("Swag Labs").should("be.visible");
});

Cypress.Commands.add(
  "loginNegativeAndExpectError",
  (username, password, expectedErrorMessage) => {
    cy.visit("/");
    cy.get(".login_logo").should("exist");
    cy.get('input[name="user-name"]').clear();
    cy.get('input[name="password"]').clear();

    if (username) {
      cy.get('input[name="user-name"]').type(username);
    }
    if (password) {
      cy.get('input[name="password"]').type(password);
    }

    cy.get('input[type="submit"]').click();

    cy.get("div.error-message-container")
      .contains(expectedErrorMessage)
      .should("be.visible");
  }
);

Cypress.Commands.add("logout", () => {
  cy.get('button[id="react-burger-menu-btn"]').click();
  cy.contains("a", "Logout").click();
  cy.url().should("include", "/");
});

Cypress.Commands.add("checkoutPositive", (firstName, lastName, postalCode) => {
  cy.get('input[name="firstName"]').type(firstName);
  cy.get('input[name="lastName"]').type(lastName);
  cy.get('input[name="postalCode"]').type(postalCode);
  cy.get('input[type="submit"]').click();
});

Cypress.Commands.add(
  "checkoutNegativeandExpectError",
  (firstName, lastName, postalCode, expectedErrorMessage) => {
    if (firstName) {
      cy.get('input[name="firstName"]').type(firstName);
    }
    if (lastName) {
      cy.get('input[name="lastName"]').type(lastName);
    }
    if (postalCode) {
      cy.get('input[name="postalCode"]').type(postalCode);
    }
    cy.get('input[type="submit"]').click();
    cy.get("div.error-message-container")
      .contains(expectedErrorMessage)
      .should("be.visible");
  }
);

Cypress.Commands.add("totalPricesCheck", () => {
  const tax = 0.08;
  cy.get(".summary_subtotal_label")
    .invoke("text")
    .then((subtotalPriceString) => {
      const price = parseFloat(subtotalPriceString.replace(/[^0-9.]/g, ""));
      const finalPriceExpected = price + price * tax;

      const expectedTaxAmount = price * tax;
      cy.get(".summary_tax_label")
        .invoke("text")
        .then((actualTaxString) => {
          const actualTaxAmount = parseFloat(
            actualTaxString.replace(/[^0-9.]/g, "")
          );
          expect(actualTaxAmount).to.be.closeTo(expectedTaxAmount, 0.001);
        });

      cy.get(".summary_total_label")
        .invoke("text")
        .then((actualPriceString) => {
          const finalPrice = parseFloat(
            actualPriceString.replace(/[^0-9.]/g, "")
          );
          expect(finalPrice).to.be.closeTo(finalPriceExpected, 0.001);
          cy.wrap(finalPrice).should("be.closeTo", finalPriceExpected, 0.001);
        });
    });
});

Cypress.Commands.add("finishCheckout", () => {
  cy.get('button[name="finish"]').click();
  cy.contains("Thank you for your order!").should("be.visible");
  cy.contains(
    "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
  ).should("be.visible");
  cy.get('button[name="back-to-products"]').click();
  cy.url().should("include", "/inventory.html");
});
