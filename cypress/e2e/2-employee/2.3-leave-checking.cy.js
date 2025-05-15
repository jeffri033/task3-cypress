/// <reference types="cypress" />

describe("2. Employee", function () {

    before(function () {
        // this runs ONCE before all tests in this block

        cy.fixture('data-test').as('dataTest');
        const url = Cypress.env('base_url');

        cy.visit(url);
    });


    it("SC 2.3 - Employee can check 'Leave Request' is succesfully approved", function () {
        // =========    LOGIN EMPLOYEE    ==========
    
        const dataEmployee  = this.dataTest.employee;
    
        cy.login(dataEmployee.username, dataEmployee.password);
       



        // ============      ASSERTION SUCCESS LOGIN      ==========
        
        // verify URI is correct
        cy.url().should('include', '/dashboard/index');

        // verify Dashboard page
        cy.get(".oxd-topbar-header-breadcrumb-module").should('contain', 'Dashboard');




        // ============      LEAVE STATUS CHECKING     ==========

        // click button My Leave
        cy.get('button[title="My Leave"]').click();


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

        
        // click button Apply
        cy.get('button').contains('Search').click();




        // ==========      ASSERTION TO VERIFY LEAVE STATUS HAS BEEN APPROVED     =============

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
        cy.get('.oxd-table-cell').eq(6).find('div').should('contain.text', dataEmployee.leave.approvalStatus);

        // verify data Comments
        cy.get('.oxd-table-cell').eq(7).find('div').should('contain.text', dataEmployee.leave.comments);


    })

})