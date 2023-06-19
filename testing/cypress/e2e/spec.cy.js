describe("Home Tests", () => {
  it("open the home page and verify the url and the title", () => {
    cy.visit("https://freelancers-nine.vercel.app/");
    cy.url().should("include", "freelancers");
  });
});

describe("Freelancer platform", () => {
  it("category filter works correctly", () => {
    cy.visit("https://freelancers-nine.vercel.app/");

    let categoryName;
    // Clicking on a category button
    cy.get(".category-filter-button")
      .first()
      .then(($button) => {
        categoryName = $button.text();
        $button.click();
      });

    cy.wait(2000);

    // Checking that the first five entries in the first
    // 5 rows have skills related to the category
    for (let i = 0; i < 5; i++) {
      cy.get(".data-grid-container .MuiDataGrid-row")
        .eq(i)
        .find(".MuiDataGrid-cellContent")
        .eq(5)
        .then(($cell) => {
          expect($cell.text()).to.include(categoryName);
        });
    }
  });
});
