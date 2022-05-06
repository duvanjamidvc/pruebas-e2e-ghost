/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, a) => {
	return false;
});

let usuarios;
describe('Cambiar contraseña de usuario', () => {

	before(() => {
		cy.fixture('users').then(users => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
	});

	it('Cambiar contraseña de usuario', () => {
		const url = Cypress.config('baseUrlDashBoard');
		cy.visit(url);
		cy.goUserProfile();

		const userPasswordOld = usuarios.admins[0].password;
		const userPasswordNew = 'Qwerty1234567';
		
		cy.changePassword(userPasswordOld, userPasswordNew);

		cy.closeDashBoardSession();
		
		cy.login(usuarios.admins[0].username, userPasswordNew)
		
		cy.goUserProfile();

		cy.changePassword(userPasswordNew, userPasswordOld);
		
	});
	
	afterEach(function () {
		cy.closeDashBoardSession();
	});

});
