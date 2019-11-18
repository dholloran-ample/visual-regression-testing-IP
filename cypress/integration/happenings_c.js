/// <reference types="Cypress" />

context('Happenings', () => {
    beforeEach(() => {
      cy.visit('https://int.crossroads.net/')
    })

    describe('Happenings', () => {
        it('Verify Happenings', () => {
          // https://on.cypress.io/should
          cy.getCookies().should('have.length', 1).should((cookies) => {

            // each cookie has these properties
            expect(cookies[0]).to.have.property('name', 'session_id')
            expect(cookies[0]).to.have.property('value')
            expect(cookies[0]).to.have.property('httpOnly')
            expect(cookies[0]).to.have.property('secure')
            expect(cookies[0]).to.have.property('domain')
            expect(cookies[0]).to.have.property('path')
            expect(cookies[0]).to.have.property('bitmovin')
            expect(cookies[0]).to.have.property('sessionid')

          cy.get('crds-site-happenings')
            .find('tbody tr:last')
            .should('have.class', 'success')
            .find('td')
            .first()
            // checking the text of the <td> element in various ways
            .should('have.text', 'Column content')
            .should('contain', 'Column content')
            .should('have.html', 'Column content')
            // chai-jquery uses "is()" to check if element matches selector
            .should('match', 'td')
            // to match text content against a regular expression
            // first need to invoke jQuery method text()
            // and then match using regular expression
            .invoke('text')
            .should('match', /column content/i)
    
          // a better way to check element's text content against a regular expression
          // is to use "cy.contains"
          // https://on.cypress.io/contains
          cy.get('.assertion-table')
            .find('tbody tr:last')
            // finds first <td> element with text content matching regular expression
            .contains('td', /column content/i)
            .should('be.visible')
    
          // for more information about asserting element's text
          // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
        })
    })
})
})