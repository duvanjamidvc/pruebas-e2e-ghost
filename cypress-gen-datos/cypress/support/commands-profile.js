/**
 *  Comando para ingresar al perfil del usuario
 */
Cypress.Commands.add('goUserProfile', () => {
	cy.get('.gh-user-avatar').click();
	cy.intercept('**/ghost/api/**').as('viewProfile');
	cy.get('a[href*="#/settings/staff"]').click();
	cy.wait('@viewProfile').its('response.statusCode').should('be.oneOf', [204, 200, 201]);
});


Cypress.Commands.add('saveUserProfile', () => {
	cy.intercept('**/ghost/api/**').as('saveUserProfile');
	cy.get('.view-actions .gh-btn').click();
	cy.wait('@saveUserProfile').its('response.statusCode').should('be.oneOf', [204, 200, 201]);
});


Cypress.Commands.add('changePassword', (userPasswordOld, userPasswordNew) => {
	cy.get('#user-password-old').clear().type(userPasswordOld, {force: true});
	cy.get('#user-password-new').clear().type(userPasswordNew, {force: true});
	cy.get('#user-new-password-verification').clear().type(userPasswordNew, {force: true});
	
	cy.intercept('**/ghost/api/**').as('changePassword');
	cy.get('.button-change-password').click();
	cy.wait('@changePassword').its('response.statusCode').should('be.oneOf', [204, 200, 201]);
});
