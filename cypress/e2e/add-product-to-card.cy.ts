describe("Add product to cart", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should be able to navigate to the product page and add it to the cart", () => {
    // procura o primeiro link que começa com /product e clica nele
    cy.get('a[href^="/product"]').first().click();

    // verifica se a url contém /product
    cy.url().should("include", "/product");
    // or
    cy.location("pathname").should("include", "/product");

    // clica no botão de adicionar ao carrinho
    cy.contains("Adicionar ao carrinho").click();

    cy.contains("Cart (1)").should("exist");
  });

  it("should not count duplicate products in the cart", () => {
    // procura o primeiro link que começa com /product e clica nele
    cy.get('a[href^="/product"]').first().click();

    // verifica se a url contém /product
    cy.url().should("include", "/product");
    // or
    cy.location("pathname").should("include", "/product");

    // clica no botão de adicionar ao carrinho
    cy.contains("Adicionar ao carrinho").click();
    cy.contains("Adicionar ao carrinho").click();

    cy.contains("Cart (1)").should("exist");
  });

  it("should be able to search for a product and add it to the cart", () => {
    // procura o input de busca e digita "product"
    cy.get('input[name="q"]').type("moletom").parent("form").submit();

    // procura o primeiro link que começa com /product e clica nele
    cy.get('a[href^="/product"]').first().click();

    // verifica se a url contém /product
    cy.url().should("include", "/product");
    // or
    cy.location("pathname").should("include", "/product");

    // clica no botão de adicionar ao carrinho
    cy.contains("Adicionar ao carrinho").click();

    cy.contains("Cart (1)").should("exist");
  });
});
