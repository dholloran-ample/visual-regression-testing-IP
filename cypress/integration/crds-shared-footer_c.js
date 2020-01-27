// Tests built around our Storybook
describe('Social links have the correct links', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9009/iframe.html?id=footer--static-footer&amp;viewMode=story');
  });

  it('Checks the Twitter link', () => {
    cy.get('a[data-automation-id="ftr-twitter-account"]')
      .first()
      .should('have.attr', 'href')
      .and('include', 'https://twitter.com/crdschurch/');
  });

  it('Checks the Facebook link', () => {
    cy.get('a[data-automation-id="ftr-facebook-account"]')
      .first()
      .should('have.attr', 'href')
      .and('include', 'https://www.facebook.com/crdschurch/?_rdr=p');
  });

  it('Checks the YouTube link', () => {
    cy.get('a[data-automation-id="ftr-youtube-account"]')
      .first()
      .should('have.attr', 'href')
      .and('include', 'https://www.youtube.com/user/crdschurch');
  });

  it('Checks the Instagram link', () => {
    cy.get('a[data-automation-id="ftr-instagram-account"]')
      .first()
      .should('have.attr', 'href')
      .and('include', 'https://www.instagram.com/crdschurch/');
  });
});

function iget(doc, selector) {
  return cy.wrap(doc.find(selector));
}
