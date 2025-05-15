// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('login', (username, password) => {
  // type Username
  cy.get('input[name="username"]').type(username);
    
  // type Password
  cy.get('input[name="password"]').type(password);
   
  // click Login button
  cy.get(".orangehrm-login-button").click();

});


Cypress.Commands.add('generateRandomNumber', (min, max) => {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return cy.wrap(random); // wrap it so Cypress can yield it
});