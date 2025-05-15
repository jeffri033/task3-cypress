/// <reference types="cypress" />

describe("2. MODUL EMPLOYEE", function () {

    before(function () {
        // this runs ONCE before all tests in this block

        cy.fixture('data-test').as('dataTest');
        const url = Cypress.env('base_url');

        cy.visit(url);
    });



    it("SC 2.1 - Employee can submit 'Leave Request' successfully", function () {
        // =========    LOGIN EMPLOYEE   ==========
    
        const dataEmployee  = this.dataTest.employee;
    
        cy.login(dataEmployee.username, dataEmployee.password);



        // ============      ASSERTION SUCCESS LOGIN      ==========
        
        // verify URI is correct
        cy.url().should('include', '/dashboard/index');

        // verify Dashboard page
        cy.get(".oxd-topbar-header-breadcrumb-module").should('contain', 'Dashboard');




        // ============      APPLY LEAVE     ==========

        // click button Apply Leave
        cy.get('button[title="Apply Leave"]').click();

        // select Leave Type
        cy.contains('label', 'Leave Type')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-select-wrapper')
                  .click()
                  .find('.oxd-select-dropdown')
                  .contains('span', dataEmployee.leave.leaveType)
                  .click();

        // get Leave Balance
        cy.get('.orangehrm-leave-balance-text').should('contain.text', `${dataEmployee.leave.entitlement}.00 Day(s)`);


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


        // type Comments
        cy.contains('label', 'Comments')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-textarea')                
                  .type(dataEmployee.leave.comments);

        
        // click button Apply
        cy.get('button').contains('Apply').click();



        

        // =========      ASSERTION SUCCESS APPLY LEAVE     ==========

        // verify toast is visible and has success message
        cy.get('.oxd-toast').should('be.visible')           
                            .and('contain.text', 'Successfully Saved');




        // ==========      SEARCH LEAVE REQUEST THAT HAS BEEN SUBMITTED      =============

        // click sub menu "My Leave"
        cy.get('.oxd-topbar-body-nav-tab-item').contains('My Leave').click();
    
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


        // click button "Search"
        cy.get('button').contains('Search').click();




        // ==========      ASSERTION TO VERIFY DATA SEARCH RESULT      =============
        
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


    })

})