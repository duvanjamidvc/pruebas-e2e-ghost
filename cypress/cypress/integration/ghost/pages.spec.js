/// <reference types="cypress" />
/// <reference types="../../support" />

Cypress.on('uncaught:exception', (err, a) => {
	// cy.task('log', { 'message': `An exception occurred: ${err}` });
	return false;
});

let usuarios;
describe('Pages', () => {

	before(() => {
		cy.fixture('users').then(users => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
	});
	it('Crear pagina y publicarla', () => {

		let title = 'Titulo de la pagina' + new Date().getTime();
		let contenido = 'Contenido de la pagina' + new Date().getTime();

		cy.createPage(title, contenido);
		cy.createPageLink(title);
		cy.closeDashBoardSession();
		cy.validatePageByTitle(title, 1);
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
		cy.deletePageByTitle(title);
		cy.closeDashBoardSession();
		cy.validatePageByTitle(title, 0);
	});

	afterEach(function () {
		cy.closeDashBoardSession();
	});


});
