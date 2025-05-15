/// <reference types="cypress" />

describe("3. NEGATIVE TEST - USERNAME IS DUPLICATE", function () {

  before(function () {
    // this runs ONCE before all tests in this block

    cy.fixture('data-test').as('dataTest');
    const url = Cypress.env('base_url');

    cy.visit(url);
  });



  it("SC 3.2.1 - Form 'Add User' must show warning to validate that username already exist", function () {

    // =========    LOGIN ADMIN  ==========

    const dataAdmin     = this.dataTest.admin;
    const dataEmployee  = this.dataTest.employee;
 
    cy.login(dataAdmin.username, dataAdmin.password);



    // ============      ASSERTION SUCCESS LOGIN      ==========
    
    // verify URI is correct
    cy.url().should('include', '/dashboard/index');

    // verify Dashboard page
    cy.get(".oxd-topbar-header-breadcrumb-module").should('contain', 'Dashboard');




    // ===============     ENTER MENU ADMIN     ===============


    // click menu ADMIN
    cy.get('.oxd-main-menu-item').contains('Admin').click();


    // click button "Add" user
    cy.get('button').contains('Add').click();




    // ===============   FILL IN FORM "ADD USER"  ================

    // type 'Employee Name' searching keyword
    cy.contains('label', 'Employee Name')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('input[placeholder="Type for hints..."]')                
                  .type(dataEmployee.firstName);


    // select Employee Name from dropdown
    cy.contains('label', 'Employee Name')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-autocomplete-dropdown')                
                  .contains(dataEmployee.fullName)
                  .click();


    // select User Role as 'ESS'
    cy.contains('label', 'User Role')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-select-wrapper')
                  .click()
                  .find('.oxd-select-dropdown')
                  .contains('span', dataEmployee.role)
                  .click();


    // select Status as 'Enabled'
    cy.contains('label', 'Status')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-select-wrapper')
                  .click()
                  .find('.oxd-select-dropdown')
                  .contains('span', dataEmployee.status)
                  .click();
    
    // type Username    
    cy.contains('label', 'Username')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-input--active')                
                  .type(dataEmployee.username);


    // type password
    cy.contains('label', 'Password')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-input--active')                
                  .type(dataEmployee.password);


    // type Confirm Password
    cy.contains('label', 'Confirm Password')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-input--active')                
                  .type(dataEmployee.password);


    // save form "Add User"
    cy.get('button').contains('Save').click();




    // ==========      ASSERTION TO VERIFY USERNAME IS ALREADY EXIST      =============

    cy.get(".oxd-input-field-error-message").should('contain.text', 'Already exists')
                                            .and('be.visible');

                                      
  });


})