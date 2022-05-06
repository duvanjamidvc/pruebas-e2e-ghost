/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, a) => {
	return false;
});

let usuarios;
describe('Cambiar nombre de usuario', () => {

	before(() => {
		cy.fixture('users').then(users => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
	});

	it('Cambiar nombre de usuario', () => {
		const url = Cypress.config('baseUrlDashBoard');
		cy.visit(url);
		cy.goUserProfile();

		const nameUser = cy.faker.name.findName();
		cy.get('#user-name').clear().type(nameUser, {force: true});
		
		cy.saveUserProfile();

		cy.get('.gh-user-avatar').click();		
		cy.get('.gh-user-name').should('have.text',nameUser);
	});
	
	afterEach(function () {
		cy.closeDashBoardSession();
	});

});
