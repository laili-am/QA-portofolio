describe("Component", () => {
  beforeEach(() => {
    cy.loginPositive("standard_user", "secret_sauce");
  });
  it("✅ Detail Component Check", () => {
    cy.get(".inventory_item_name").first().click();
    cy.get(".inventory_details_back_button").click();
  });
  it("✅ Dropdown Component Check", () => {
    cy.get("#react-burger-menu-btn").should("exist");
    cy.get(".shopping_cart_link").should("exist");

    // dropdown //
    // a-z
    let initialProductNames;
    cy.get(".inventory_item_name").then(($elements) => {
      initialProductNames = Cypress._.map($elements, "innerText");
      cy.log(
        "Initial product names (before any sorting):",
        initialProductNames
      );
    });
    cy.get("span.select_container").click();
    cy.get("select.product_sort_container").select("az");
    cy.get("select.product_sort_container option:selected")
      .should("have.text", "Name (A to Z)")
      .should("have.value", "az");
    cy.get(".inventory_item_name").then(($elements) => {
      const sortedNamesFromUI = Cypress._.map($elements, "innerText");
      cy.log("Names from UI after sorting (A to Z):", sortedNamesFromUI);
      const expectedSortedNames = [...initialProductNames].sort((a, b) =>
        a.localeCompare(b)
      );
      cy.log(
        "Expected sorted names (A to Z - JS sort):",
        expectedSortedNames,
        JSON.stringify(expectedSortedNames, null, 2)
      );
      expect(sortedNamesFromUI).to.deep.equal(expectedSortedNames);
    });

    // z - a
    cy.get("span.select_container").click();
    cy.get("select.product_sort_container").select("za");
    cy.get("select.product_sort_container option:selected")
      .should("have.text", "Name (Z to A)")
      .should("have.value", "za");
    cy.get(".inventory_item_name").then(($elements) => {
      const sortedNamesFromUI = Cypress._.map($elements, "innerText");
      cy.log("Names from UI after sorting (Z to A):", sortedNamesFromUI);
      const expectedSortedNames = [...initialProductNames].sort((a, b) =>
        b.localeCompare(a)
      );
      cy.log(
        "Expected sorted names (Z to A - JS sort):",
        expectedSortedNames,
        JSON.stringify(expectedSortedNames, null, 2)
      );
      expect(sortedNamesFromUI).to.deep.equal(expectedSortedNames);
    });

    // low - high
    let initialProductPrices;
    cy.get(".inventory_item_price").then(($elements) => {
      initialProductPrices = Cypress._.map($elements, (el) => {
        return parseFloat(el.innerText.replace("$", ""));
      });
      cy.log(
        "Initial product prices (before any sorting - as numbers):",
        initialProductPrices
      );
    });
    cy.get("span.select_container").click();
    cy.get("select.product_sort_container").select("lohi");
    cy.get("select.product_sort_container option:selected")
      .should("have.text", "Price (low to high)")
      .should("have.value", "lohi");
    cy.get(".inventory_item_price").then(($elements) => {
      const sortedPrices = Cypress._.map($elements, (el) => {
        return parseFloat(el.innerText.replace("$", ""));
      });
      cy.log("Actual sorted prices (from DOM - as numbers):", sortedPrices);
      const expectedSortedPrices = [...initialProductPrices].sort(
        (a, b) => a - b
      );
      cy.log(
        "Expected sorted prices (Low to High - JS sort - as numbers):",
        expectedSortedPrices,
        JSON.stringify(expectedSortedPrices, null, 2)
      );
      expect(sortedPrices).to.deep.equal(expectedSortedPrices);
    });

    // high - low
    cy.get("span.select_container").click();
    cy.get("select.product_sort_container").select("hilo");
    cy.get("select.product_sort_container option:selected")
      .should("have.text", "Price (high to low)")
      .should("have.value", "hilo");
    cy.get(".inventory_item_price").then(($elements) => {
      const sortedPrices = Cypress._.map($elements, (el) => {
        return parseFloat(el.innerText.replace("$", ""));
      });
      cy.log("Actual sorted prices (from DOM - as numbers):", sortedPrices);
      const expectedSortedPrices = [...initialProductPrices].sort(
        (a, b) => b - a
      );
      cy.log(
        "Expected sorted prices (Low to High - JS sort - as numbers):",
        expectedSortedPrices,
        JSON.stringify(expectedSortedPrices, null, 2)
      );
      expect(sortedPrices).to.deep.equal(expectedSortedPrices);
    });
  });
});
