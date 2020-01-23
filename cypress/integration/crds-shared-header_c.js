describe('Integration test with visual testing', function() {
  it('Loads the header', function() {
    // Load the page or perform any other interactions with the app.
    cy.visit('?path=/story/header--crds-shared-header');

    // Take a snapshot for visual diffing
    cy.percySnapshot();
  });
});

describe('My First Test', function() {
  console.log(process.env);
  it('Does not do much!', function() {
    cy.visit('?path=/story/header--crds-shared-header');
    expect(Cypress.env('STORYBOOK_CYPRESS_URL')).to.equal('http://localhost:9009');
  });
});
