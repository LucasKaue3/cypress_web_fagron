class HomePage {
  selectors = {
    headerLogo: '.header-logo',
  };

  visit() {
    cy.visit('/');
    cy.get(this.selectors.headerLogo).should('be.visible');
  }

  visitPageRegister() {
    cy.visit('/register');
    cy.url().should('include', '/register');
  }
}

export default HomePage;
