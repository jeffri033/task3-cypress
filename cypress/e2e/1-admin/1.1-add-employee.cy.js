/// <reference types="cypress" />

describe("1. MODUL ADMIN", function () {

  before(function () {
    // this runs ONCE before all tests in this block

    cy.fixture('data-test').as('dataTest');
    const url = Cypress.env('base_url');

    cy.visit(url);
  });



  it("SC 1.1 - Admin can add data 'New Employee' and create new 'User Account' successfully", function () {

    // =========    LOGIN ADMIN  ==========

    const dataAdmin     = this.dataTest.admin;
    const dataEmployee  = this.dataTest.employee;
 
    cy.login(dataAdmin.username, dataAdmin.password);



    // ============      ASSERTION SUCCESS LOGIN      ==========
    
    // verify URI is correct
    cy.url().should('include', '/dashboard/index');

    // verify Dashboard page
    cy.get(".oxd-topbar-header-breadcrumb-module").should('contain', 'Dashboard');






    // ===========    ENTER MENU PIM    ============

    // click menu PIM    
    cy.get('.oxd-main-menu-item').contains('PIM').click();
   

    // click button "Add Employee"
    cy.get('button').contains('Add').click();

    


    // ==========     FILL IN FORM "ADD EMPLOYEE"     ==========

    // type first name
    cy.get('input[name="firstName"]').type(dataEmployee.firstName);

    // type middle name
    cy.get('input[name="middleName"]').type(dataEmployee.middleName);

    // type last name
    cy.get('input[name="lastName"]').type(dataEmployee.lastName);


    // upload "Employee Profile Photo"
    cy.get('input[type=file].oxd-file-input').selectFile('cypress/assets/user-icon.png', { force: true });



    // generate "Employee ID" between 1000 and 9999
    cy.generateRandomNumber(1000, 9999).then((employeeId) => {       
        // type Employee ID
        cy.contains('label', 'Employee Id')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-input--active') 
                  .clear()            
                  .type(employeeId);


        // save form "Add Employee"
        cy.get('button').contains('Save').click();




        // =========      ASSERTION SUCCESS ADD EMPLOYEE     ==========

        // verify toast is visible and has success message
        cy.get('.oxd-toast').should('be.visible')           
                            .and('contain.text', 'Successfully Saved');



        // verify employee ID is correct    
        cy.contains('label', 'Employee Id')
                .parents('.oxd-input-group__label-wrapper')
                .next()
                .find('.oxd-input--active') 
                .should('have.value', employeeId);
    });

  


    // ===========    ASSERTION TO VERIFY DATA NEW EMPLOYEE HAS BEEN ADDED SUCCESSFULLY   ============
    
    
    // verify employee name is correct    
    cy.get('input[name="firstName"]').should('have.value', dataEmployee.firstName);
    cy.get('input[name="middleName"]').should('have.value', dataEmployee.middleName);
    cy.get('input[name="lastName"]').should('have.value', dataEmployee.lastName);


    // verify employee image is displayed
    cy.get('img.employee-image')
            .should('be.visible')
            .and(($img) => {
                // ensures image is loaded
                expect($img[0].naturalWidth).to.be.greaterThan(0); 
            });


    // verify employee image source is not empty
    cy.get('img.employee-image')
            .should('have.attr', 'src')
            .and('not.be.empty');

    




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




    // =========      ASSERTION TO VERIFY DATA USER HAS BEEN ADDED SUCCESSFULLY   ==========

    // verify toast is visible and has success message
    cy.get('.oxd-toast').should('be.visible')           
                        .and('contain.text', 'Successfully Saved');



    
    // ==========      SEARCH DATA USER THAT HAS BEEN ADDED     =============
    
    // type Username    
    cy.wait(3000);
    cy.contains('label', 'Username')
                  .parents('.oxd-input-group__label-wrapper')
                  .next()
                  .find('.oxd-input--active')                
                  .type(dataEmployee.username);


    // click button "Search"
    cy.get('button').contains('Search').click();




    // ==========      ASSERTION TO VERIFY DATA USER THAT HAS BEEN ADDED      =============

    // verify search result
    cy.get('.oxd-text--span').should('be.visible')           
                             .and('contain.text', '(1) Record Found');


    // verify data Username
    cy.get('.oxd-table-cell').eq(1).find('div').should('contain.text', dataEmployee.username);

    // verify data User Role
    cy.get('.oxd-table-cell').eq(2).find('div').should('contain.text', dataEmployee.role);

    // verify data Employee Long Name
    cy.get('.oxd-table-cell').eq(3).find('div').should('contain.text', dataEmployee.longName);

    // verify data Status
    cy.get('.oxd-table-cell').eq(4).find('div').should('contain.text', dataEmployee.status);
                     
  });


})