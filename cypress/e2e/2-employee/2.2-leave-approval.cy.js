/// <reference types="cypress" />

describe("2. MODUL ADMIN", function () {

  before(function () {
    // this runs ONCE before all tests in this block

    cy.fixture('data-test').as('dataTest');
    const url = Cypress.env('base_url');

    cy.visit(url);
  });



  it("SC 2.2 - Admin can approve 'Leave Request' successfully", function () {
        // =========    LOGIN ADMIN  ==========
    
        const dataAdmin     = this.dataTest.admin;
        const dataEmployee  = this.dataTest.employee;
    
        cy.login(dataAdmin.username, dataAdmin.password);



        // ============      ASSERTION SUCCESS LOGIN      ==========
        
        // verify URI is correct
        cy.url().should('include', '/dashboard/index');

        // verify Dashboard page
        cy.get(".oxd-topbar-header-breadcrumb-module").should('contain', 'Dashboard');



        // ============     SEARCH LEAVE DATA    ==========

        // click button Apply Leave
        cy.get('button[title="Leave List"]').click();


        // select From Date
        cy.contains('label', 'From Date')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-date-wrapper')
                  .click()
                  .find('.oxd-input')
                  .click()
                  .type(dataEmployee.leave.fromDate);


        // select To Date
        cy.contains('label', 'To Date')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-date-wrapper')
                  .click()
                  .find('.oxd-input')
                  .click()
                  .clear()
                  .type(dataEmployee.leave.toDate);


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

        

        // click button "Search"
        cy.get('button').contains('Search').click();



        // ============      ASSERTION SEARCH DATA RESULT      ==========

        // verify search result
        cy.get('.oxd-text--span').should('be.visible')           
                                 .and('contain.text', '(1) Record Found');


        // verify data Date
        cy.get('.oxd-table-cell').eq(1).find('div').should('contain.text', dataEmployee.leave.leavePeriod);

        // verify data Employee Name
        cy.get('.oxd-table-cell').eq(2).find('div').should('contain.text', dataEmployee.fullName);

        // verify data Leave Type
        cy.get('.oxd-table-cell').eq(3).find('div').should('contain.text', dataEmployee.leave.leaveType);

        // verify data Leave Balance
        cy.get('.oxd-table-cell').eq(4).find('div').should('contain.text', dataEmployee.leave.leaveBalance);
    
        // verify data Number Of Day
        cy.get('.oxd-table-cell').eq(5).find('div').should('contain.text', dataEmployee.leave.numberOfDay);

        // verify data Status
        cy.get('.oxd-table-cell').eq(6).find('div').should('contain.text', dataEmployee.leave.requestStatus);

        // verify data Comments
        cy.get('.oxd-table-cell').eq(7).find('div').should('contain.text', dataEmployee.leave.comments);



        // =========      LEAVE APPROVAL      =========

        // click button APPROVE
        cy.get('.oxd-table-cell').eq(8).find('button').contains('Approve').click();




        // =========      ASSERTION TO VERIFY LEAVE REQUEST HAS BEEN APPROVED SUCCESFULLY    ==========

        // verify toast is visible and has success message
        cy.get('.oxd-toast').should('be.visible')           
                            .and('contain.text', 'Successfully Updated');


    })


})