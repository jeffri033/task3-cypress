/// <reference types="cypress" />

describe("1. MODUL ADMIN", function () {

  before(function () {
    // this runs ONCE before all tests in this block

    cy.fixture('data-test').as('dataTest');
    const url = Cypress.env('base_url');

    cy.visit(url);
  });



  it("SC 1.2 - Admin can add 'Leave Entitlement' successfully", function () {
    // =========    LOGIN ADMIN   ==========
 
    const dataAdmin     = this.dataTest.admin;
    const dataEmployee  = this.dataTest.employee;
 
    cy.login(dataAdmin.username, dataAdmin.password);



    // ============      ASSERTION SUCCESS LOGIN      ==========
    
    // verify URI is correct
    cy.url().should('include', '/dashboard/index');

    // verify Dashboard page
    cy.get(".oxd-topbar-header-breadcrumb-module").should('contain', 'Dashboard');




    
    // ===========   ENTER MENU LEAVE   ============

    // click menu Leave
    cy.get('.oxd-main-menu li').contains('a', 'Leave').click();

    // click sub menu "Entitlements"
    cy.get('.oxd-topbar-body-nav ul li').contains('span', 'Entitlements').click();

    // select dropdown option "Add Entitlements"
    cy.get('.oxd-dropdown-menu li').contains('a', 'Add Entitlements').click();



    
    // ==========     FILL IN FORM "ADD ENTITLEMENTS"     ==========

    // click radio button "Individual Employee"
    cy.get('.oxd-radio-wrapper').find('input[type="radio"][value="0"]').check();


    // type "Employee Name" searching keyword
    cy.contains('label', 'Employee Name')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('input[placeholder="Type for hints..."]')                
                  .type(dataEmployee.firstName);


    // select Employee Name
    cy.contains('label', 'Employee Name')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-autocomplete-dropdown')                
                  .contains(dataEmployee.fullName)
                  .click();


    // select Leave Type
    cy.contains('label', 'Leave Type')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-select-wrapper')
                  .click()
                  .find('.oxd-select-dropdown')
                  .scrollTo('bottom', { duration: 1000 })
                  .contains('span', dataEmployee.leave.leaveType)
                  .click();


    // input number of Entitlement
    cy.contains('label', 'Entitlement')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('input')                
                  .type(dataEmployee.leave.entitlement);



    // =========     ADDING ENTITLEMENT    =========
    
    // save form "Add Entitlements"
    cy.get('button').contains('Save').click();


    // confirm "Updating Entitlement"
    cy.get(".orangehrm-modal-footer").contains('button', 'Confirm').click();
    




    // =========      ASSERTION TO VERIRY SUCCESS ADD ENTITLEMENT     ==========

    // verify toast is visible and has success message
    cy.get('.oxd-toast').should('be.visible')           
                        .and('contain.text', 'Successfully Saved');



    // ==========      ASSERTION TO VERIFY DATA ENTITLEMENT HAS BEEN ADDED      =============

    // verify data Leave Type
    cy.get('.oxd-table-cell').eq(1).find('div').should('contain.text', dataEmployee.leave.leaveType);

    // verify data Entitlement Type
    cy.get('.oxd-table-cell').eq(2).find('div').should('contain.text', 'Added');

    // verify data Days
    cy.get('.oxd-table-cell').eq(5).find('div').should('contain.text', dataEmployee.leave.entitlement);


  })

})