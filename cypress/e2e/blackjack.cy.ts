
describe('Blackjack Web App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081');
  });
  function isSplit(): Cypress.Chainable<boolean> {
    return cy.get('[data-testid="message"]').then(($body) => {
      const text = $body.text(); // Get the text content
      cy.log(text); // Log the text content for debugging
      return cy.wrap(text.includes('Split?')); // Wrap the result in a chainable object
    });
  }
  it('should display initial game elements', () => {
    cy.reload();
    cy.wait(500);
    // Check if the player money and bet input are visible
    cy.get('[data-testid="player-score"]').should('be.visible');
    cy.get('[data-testid="player-money"]').should('be.visible');
    cy.get('input[placeholder="Enter Bet Amount"]').should('be.visible');
    cy.get('[data-testid="bet-button"]').contains('Place Bet').should('be.visible');

    // Check that the player has a valid balance
    cy.get('[data-testid="player-money"]').contains('$2000');
  });

  it('should hide the score', () => {
    cy.reload();
    cy.wait(500);
    cy.get('[data-testid="player-score"]').should('contain.text', '???');
  });
  it('should place a bet and start the game', () => {
    cy.reload();
    cy.wait(500); // Wait for 500ms
    cy.get('[data-testid="bet-input"]').type('100');
    cy.get('[data-testid="bet-button"]').click();
    isSplit().then((result) => {
      if (result) {
        cy.get('[data-testid="yes-button"]').should('be.visible');
        cy.get('[data-testid="no-button"]').should('be.visible');
      } else {
        cy.get('[data-testid="hit-button"]').should('be.visible');
        cy.get('[data-testid="stand-button"]').should('be.visible');
      }
    });

  });
  it('should not allow an empty bet', () => {
    cy.reload();
    cy.wait(500);
    cy.get('[data-testid="bet-button"]').click();
    cy.get('[data-testid="message"]').should('be.visible');
    cy.get('[data-testid="message"]').should('contain.text', 'Invalid Bet Amount. Must be Between $1 and $2000');
  });
  it('should handle "Hit" correctly', () => {
    cy.reload();
    cy.wait(500);
    cy.get('input[placeholder="Enter Bet Amount"]').type('100');
    cy.get('[data-testid="bet-button"]').click();
    isSplit().then((result) => {
      if (result) {
        cy.get('[data-testid="yes-button"]').click();
        cy.get('[data-testid="hit-button"]').click();
        cy.get('[data-testid="message"]').then(($hand) => {
          if ($hand.text().includes('Playing first hand')) {
            cy.get('[data-testid="stand-button"]').click();
          }
        });
        cy.get('[data-testid="hit-button"]').click();
      }
    });

    cy.get('[data-testid="message"]').then(($body) => {
      if ($body.text().includes('Playing second hand?')) {
        cy.get('[data-testid="stand-button"]').click();
      }
    });
    cy.get('[data-testid="player-score"]').should('not.have.text', '???');
  });

  it('should handle "Stand" correctly', () => {
    cy.reload();
    cy.wait(500);
    cy.get('[data-testid="bet-input"]').type('100');
    cy.get('[data-testid="bet-button"]').click();
    isSplit().then((result) => {
      if (result) {
        // yup found it
        cy.get('[data-testid="yes-button"]').click();
        cy.get('[data-testid="stand-button"]').click();
        cy.get('[data-testid="stand-button"]').click();
      } else {
        // nope not here
        cy.get('[data-testid="stand-button"]').click();
        cy.get('[data-testid="player-score"]').should('not.have.text', '???');
        cy.get('[data-testid="player-hand-container"]').children().should('not.have.length.greaterThan', 2);
      }
    });
  });
  it('should handle "Split" action correctly', () => {

    cy.reload();
    cy.wait(500);
    cy.get('[data-testid="bet-input"]').type('100');
    cy.get('[data-testid="bet-button"]').click();
    isSplit().then((result) => {
      if (result) {
        cy.get('[data-testid="yes-button"]').should('be.visible');
        cy.get('[data-testid="no-button"]').should('be.visible');
        cy.get('[data-testid="message"]').should('be.visible');
        cy.get('[data-testid="message"]').should('contain.text', 'Split?');
        cy.get('[data-testid="yes-button"]').click();
        cy.get('[data-testid="player-money"]').should('contain.text', 'Money: $1800');
        cy.get('[data-testid="stand-button"]').click();
        cy.get('[data-testid="stand-button"]').click();
      }
    });

  });
  Cypress._.times(100, (i) => {
    it(`num ${i + 1} - test the thing conditionally`, () => {
      cy.reload();
      cy.wait(10);
      cy.get('[data-testid="bet-input"]').type('100');
      cy.get('[data-testid="bet-button"]').click();
      isSplit().then((result) => {
        if (result) {
          cy.get('[data-testid="yes-button"]').should('be.visible');
          cy.get('[data-testid="no-button"]').should('be.visible');
          cy.get('[data-testid="message"]').should('be.visible');
          cy.get('[data-testid="message"]').should('contain.text', 'Split?');
          cy.get('[data-testid="yes-button"]').click();
          cy.get('[data-testid="player-money"]').should('contain.text', 'Money: $1800');
          cy.get('[data-testid="stand-button"]').click();
          cy.get('[data-testid="stand-button"]').click();
        }
      });
    })
  })


});