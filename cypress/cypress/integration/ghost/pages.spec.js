/// <reference types="cypress" />
/// <reference types="../../support" />

Cypress.on('uncaught:exception', (err, a) => {
	// cy.task('log', { 'message': `An exception occurred: ${err}` });
	return false;
});

let usuarios;
describe('Crear una subcategoría de filtrado los post publicados', () => {

	before(() => {
		cy.fixture('users').then(users => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
	});

	it('Eliminar pagina publicada', () => {

		let title = 'Titulo de la pagina' + new Date().getTime();
		let contenido = 'Contenido de la pagina' + new Date().getTime();

		cy.createPage(title, contenido);
		cy.createPageLink(title);
		cy.closeDashBoardSession();
		cy.validatePageByTitle(title, 1);
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.deletePageLinkByTitle(title);
		// cy.deletePageByTitle(title);
		// cy.closeDashBoardSession();
		// cy.validatePageByTitle(title, 0);
	});

});
