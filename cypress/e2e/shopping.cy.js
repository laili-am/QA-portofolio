describe("Shopping Component", () => {
  beforeEach(() => {
    cy.loginPositive("standard_user", "secret_sauce");
    cy.get('button[id="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
  });
  it("✅ Shopping Component Check", () => {
    cy.get(".shopping_cart_badge").should("exist");
    cy.get(".title").should("exist");
    cy.get(".cart_quantity_label").should("exist");
    cy.get(".cart_desc_label").should("exist");

    cy.get('button[id="continue-shopping"]')
      .click()
      .url()
      .should("include", "/inventory.html");

    cy.get(".shopping_cart_link").click().url().should("include", "/cart.html");
    cy.get('button[name="checkout"]')
      .click()
      .url()
      .should("include", "/checkout-step-one.html");
    cy.get('button[id="cancel"]').click().url().should("include", "/cart.html");
  });
});
