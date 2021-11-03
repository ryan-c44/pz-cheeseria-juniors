/// <reference types="cypress" />

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
    
  })

  it('Add items to cart', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();
    cy.get('[data-cy=badge-count]').should('have.text', '2');

  })

  it('Purchase items', () => {

    //Add items with id 6,7
    cy.get('[data-cy=add-to-cart-6]').click();
    cy.get('[data-cy=add-to-cart-7]').click();

    // Validate badge count
    cy.get('[data-cy=badge-count]').should('have.text', '2');

    //Open the cart
    cy.get('[data-cy=open-cart]').click();

    // Validate text
    cy.get('[data-cy=cart]').should('contain.text', 'Your Shopping Cart');
    
    // Purchase validation
    const purchaseButton = cy.get('[data-cy=purchase-btn]');
    purchaseButton.should('be.visible');
    purchaseButton.should('have.text', 'Purchase');
    purchaseButton.click();

    cy.get('[data-cy=cart]').should('not.be.visible');

    // Wait for refetch
    cy.wait(500);
  
    cy.get('[data-cy=open-purchases]').click();

    // Series of purchase list validations
    const purchaseList = cy.get('[data-cy=purchases]');
    purchaseList.should('be.visible');
    purchaseList.should('contain.text', 'Purchase History');
    purchaseList.should('not.contain.text', 'No recent purchases.');
    purchaseList.should('contain.text', 'MAASDAM');
    purchaseList.should('contain.text', 'ROYALP TILSIT');
    purchaseList.should('contain.text', 'Total: $140');
    purchaseList.should('contain.text', 'Total: $625.57');

  })

})

