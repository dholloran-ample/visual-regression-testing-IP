// <reference types="Cypress" />

import { test_user } from '../fixtures/test_users';

    describe('NDTT', () => {
  it.only("NDTT verify component loaded in storybook", ()=> {


var email = "connectuser1@test.com"
var password = "Password123"
cy.login(email, password)

let cookieValue;

cy.getCookie('intsessionId')
    .should('have.property', 'value')
    .then((cookie) => {
        cookieValue = cookie.value;
      
      cy.visit('https://crds-components-int.netlify.com/?path=/story/personalization--crds-tithe-challenge')
      cy.get('#sessionId').type(cookie).type('{enter}');
      
      cy.wait(3000)
      cy.get('#storybook-preview-iframe')
         
    })

  })

    

    it("NDTT GraphQL EndPoint", ()=> {

      var email = "connectuser1@test.com"
      var password = "Password123"
      cy.login(email, password)
      
      let cookieValue;
      
      cy.getCookie('intsessionId')
          .should('have.property', 'value')
          .then((cookie) => {
              cookieValue = cookie.value;
              cy.visit('https://api-int.crossroads.net/graphql-gateway/')
      
            
            cy.get(':nth-child(1) > .close > svg > [x1="46"]').click({force: true});
            cy.get(':nth-child(2) > .close > svg > [x1="4"]').click();
            cy.get('.kzBZrp > .close > svg').click();
           
            cy.get('.sc-jWBwVP')
              .type('graphql-gateway/')

      
            cy.get('.sc-bZQynM > .CodeMirror > .CodeMirror-scroll > .CodeMirror-sizer > [style="position: relative; top: 0px;"] > .CodeMirror-lines > [style="position: relative; outline: none;"] > .CodeMirror-code > [style="position: relative;"] > .CodeMirror-line')
              .type('{ user { nickName   imageUrl     groups(id: 198153) {    endDate    id       name         userStartDate     userEndDate }         }' ,{parseSpecialCharSequences: false})  
            
            cy.get('.sc-cvbbAY > :nth-child(1)').click()
      
            cy.get('button').contains('HTTP Headers').click();
      
          
            cy.get('.sc-gPEVay > .CodeMirror > .CodeMirror-scroll > .CodeMirror-sizer > [style="position: relative; top: 0px;"] > .CodeMirror-lines > [style="position: relative; outline: none;"] > .CodeMirror-code > [style="position: relative;"] > .CodeMirror-line')
            .type('{"Authorization":"'+cookie+'"}' ,{parseSpecialCharSequences: false} )
   
            // press play button
            cy.get('.sc-bwzfXH > svg > path').click()
          
            // add verification for user here
            cy.get(':nth-child(4) > [role="presentation"] > .cm-string').contains("Connect1")

            cy.get(':nth-child(5) > [role="presentation"] > .cm-string').contains("ministryplatformapi/files/10e70163-b9f1-474a-84e3-261b5af3e235")

            cy.get(':nth-child(9) > [role="presentation"] > .cm-string').contains("198153")

            cy.get(':nth-child(10) > [role="presentation"] > .cm-string').contains("NDTT - Blessed Life")

            cy.get(':nth-child(11) > [role="presentation"] > .cm-number').contains(1572393600)

            
           //click 1st new tab
           cy.get('.sc-eLExRp > svg').click()

           cy.get('.sc-jWBwVP')
             .type('graphql-gateway/')

           cy.get('.sc-bZQynM > .CodeMirror > .CodeMirror-scroll > .CodeMirror-sizer > [style="position: relative; top: 0px;"] > .CodeMirror-lines > [style="position: relative; outline: none;"] > .CodeMirror-code > [style="position: relative;"] > .CodeMirror-line')
              .type( 'query donations($startDate: Int!= 1572220800) {  user {  donations(   filters: {   startDate: $startDate  statuses: [1, 2, 4]  programs: [3, 146]    includeCogiver: true includeSoftDonations: true  }   ) {  id   amount  date   }      recurringGifts(programs: [3, 146], active: true, includeCogiver: true) {    id  amount  active  }  } }'  ,{parseSpecialCharSequences: false})  
            
           cy.get('.sc-cvbbAY > :nth-child(1)').click()
      
           cy.get('button').contains('HTTP Headers').click();
                
           cy.get('.sc-gPEVay > .CodeMirror > .CodeMirror-scroll > .CodeMirror-sizer > [style="position: relative; top: 0px;"] > .CodeMirror-lines > [style="position: relative; outline: none;"] > .CodeMirror-code > [style="position: relative;"] > .CodeMirror-line')
             .type('{"Authorization":"'+cookie+'"}' ,{parseSpecialCharSequences: false} )

            // press play button
           cy.get('.sc-bwzfXH > svg > path').click()

           //add validation
           cy.get(':nth-child(6) > [role="presentation"] > .cm-string').contains("52772698")
                     
           cy.get(':nth-child(7) > [role="presentation"] > .cm-number').contains(1)
                      
           cy.get(':nth-child(8) > [role="presentation"] > .cm-number').contains(1572430320)

           cy.get(':nth-child(11) > [role="presentation"] > .cm-string').contains("52773831")

           cy.get(':nth-child(12) > [role="presentation"] > .cm-number').contains(10)

           cy.get(':nth-child(13) > [role="presentation"] > .cm-number').contains(1573118340)
         
           //click 2nd new tab
          cy.get('.sc-eLExRp > svg').click()

          cy.get('.sc-jWBwVP')
          .type('graphql-gateway/')
          
          cy.get('.sc-bZQynM > .CodeMirror > .CodeMirror-scroll > .CodeMirror-sizer > [style="position: relative; top: 0px;"] > .CodeMirror-lines > [style="position: relative; outline: none;"] > .CodeMirror-code > [style="position: relative;"] > .CodeMirror-line')
          .type('{  feelingResponses {  id  value } }' ,{parseSpecialCharSequences: false})  
        
          cy.get('.sc-cvbbAY > :nth-child(1)').click()
  
          cy.get('button').contains('HTTP Headers').click();
        
          cy.get('.sc-gPEVay > .CodeMirror > .CodeMirror-scroll > .CodeMirror-sizer > [style="position: relative; top: 0px;"] > .CodeMirror-lines > [style="position: relative; outline: none;"] > .CodeMirror-code > [style="position: relative;"] > .CodeMirror-line')
          .type('{"Authorization":"'+cookie+'"}' ,{parseSpecialCharSequences: false} )
          
         // press play button
         cy.get('.sc-bwzfXH > svg > path').click()

        // add validation

        cy.get(':nth-child(5) > [role="presentation"] > .cm-string').contains("0")

        cy.get(':nth-child(6) > [role="presentation"] > .cm-string').contains("#Blessed")

        cy.get(':nth-child(9) > [role="presentation"] > .cm-string').contains("1")

        cy.get(':nth-child(10) > [role="presentation"] > .cm-string').contains("Discouraged")

        cy.get(':nth-child(13) > [role="presentation"] > .cm-string').contains("2")

        cy.get(':nth-child(14) > [role="presentation"] > .cm-string').contains("Nervous")
 
        cy.get(':nth-child(17) > [role="presentation"] > .cm-string').contains("3")

        cy.get(':nth-child(18) > [role="presentation"] > .cm-string').contains("Meh")

        cy.get(':nth-child(21) > [role="presentation"] > .cm-string').contains("4")
 
        cy.get(':nth-child(22) > [role="presentation"] > .cm-string').contains("Hopeful")

        cy.get(':nth-child(25) > [role="presentation"] > .cm-string').contains("5")

        cy.get(':nth-child(26) > [role="presentation"] > .cm-string').contains("Excited")


        //click 3rd new tab
        cy.get('.sc-eLExRp > svg').click()    

          })
              
      })
})
