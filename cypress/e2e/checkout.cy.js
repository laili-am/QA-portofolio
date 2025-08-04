describe("Checkout", () => {
  beforeEach(() => {
    cy.loginPositive("standard_user", "secret_sauce");
    cy.get('button[id="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('button[name="checkout"]').click();
  });
  it("❌ Checkout empty First Name", () => {
    cy.checkoutNegativeandExpectError(
      "",
      "Doe",
      "123456",
      "Error: First Name is required"
    );
  });

  it("❌ Checkout empty Last Name", () => {
    cy.checkoutNegativeandExpectError(
      "John",
      "",
      "123456",
      "Error: Last Name is required"
    );
  });

  it("❌ Checkout empty Postal Code", () => {
    cy.checkoutNegativeandExpectError(
      "John",
      "Doe",
      "",
      "Error: Postal Code is required"
    );
  });

  it("✅ Checkout success", () => {
    cy.checkoutPositive("John", "Doe", "123456");
    cy.totalPricesCheck();
    cy.finishCheckout();
  });
});
