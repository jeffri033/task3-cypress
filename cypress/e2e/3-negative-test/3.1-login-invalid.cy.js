/// <reference types="cypress" />

describe("3. NEGATIVE TEST - LOGIN PAGE", function () {

    beforeEach(function () {
        // Code to run before each test
        const url = Cypress.env('base_url');

        cy.visit(url);
    });
       


    it("SC 3.1.1 - Form must show validation text if username and password are empty", function () {
        // click Login button
        cy.get(".orangehrm-login-button").click();

        // verify validation text
        cy.get(".oxd-input-field-error-message").should('contain.text', 'Required')
                                                .and('be.visible');
                                                
    })



    it("SC 3.1.2 - Form must show validation message if credential is invalid", function () {
        // type Username
        cy.get('input[name="username"]').type('invalid');
                
        // type Password
        cy.get('input[name="password"]').type('Admin123');
            
        // click Login button
        cy.get(".orangehrm-login-button").click();

        // verify error message
        cy.get(".oxd-alert--error").should('be.visible'); 
        cy.get(".oxd-alert--error").should('contain.text', 'Invalid credentials');        
    })


})