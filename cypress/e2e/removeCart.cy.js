describe("Remove cart", () => {
  before(() => {
    cy.loginPositive("standard_user", "secret_sauce");
  });
  it("✅ Remove Cart", () => {
    it("Checkout success", () => {
      cy.get('button[id="add-to-cart-sauce-labs-backpack"]').click();
      cy.get(".shopping_cart_link").click();
      cy.get('button[name="checkout"]').click();
    });
    cy.get('button[id="add-to-cart-sauce-labs-backpack"]').click();
    cy.get("a.shopping_cart_link").click();
    cy.get('button[name="remove-sauce-labs-backpack"]').click();
  });
});
