/// <reference types="Cypress" />

import { test_user } from '../fixtures/test_users';

    describe('NDTT', () => {
        it('Verify NDTT stages', () => {
  //  cy.visit('https://int.crossroads.net/')      
  // cy.get('.col-sm-12 > .component-header').should('contain', 'Take a step toward trusting God with your finances');

               //Test NDTT before logged in
      //         intsessionId
//Cypress.Cookies.preserveOnce(intsession_id,)
var email = "connectuser1@test.com"
var password = "Password123"
cy.login(email, password)

let cookieValue;

cy.getCookie('intsessionId')
    .should('have.property', 'value')
    .then((cookie) => {
        cookieValue = cookie.value;

 ///       cy.visit('https://int.crossroads.net/signin')
        
cy.visit('https://crds-components-int.netlify.com/?path=/story/personalization--crds-mysite')

//cy.get('[name="password"]')
//.clear()
//.type(cookieValue)    
    })




            //Test NDTT once logged in
        //  const username = 'fakeUser@gmail.com';
       //   const password = 'password12345';
  //       cy.login(test_user.email, test_user.password)
   //      cy.getCookie(name)

  
       
     
        })
    })
