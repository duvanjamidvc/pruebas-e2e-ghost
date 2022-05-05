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
    const url = Cypress.config('baseUrlDashBoard');
    cy.log(`Logging in as ${username}`)
    cy.visit(url);
    cy.get('[name="identification"]').type(username);
    cy.get('[name="password"]').type(password);
    cy.get('#ember11').click();
});

Cypress.Commands.add('closeDashBoardSession', () => {
    const url = Cypress.config('baseUrlDashBoard');
    cy.visit(url + '#/signout/');
});