describe("Search Product", () => {
  it("should be able to search for a products", () => {
    cy.searchByQuery("moletom");

    cy.location("pathname").should("include", "/search");
    cy.location("search").should("include", "?q=moletom");

    // procura o primeiro link que começa com /product e clica nele
    cy.get('a[href^="/product"]').should("exist");
  });

  it("should not be able to visit the search page without a query", () => {
    // evitar erro do next
    cy.on("uncaught:exception", () => {
      return false;
    });
    cy.visit("/search");

    cy.location("pathname").should("equal", "/");
  });
});
