/// <reference types="cypress" />
/// <reference types="../../support" />

Cypress.on('uncaught:exception', (err, a) => {
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
	it('Crear pagina y publicarla con Link', () => {

		let title = 'Titulo de la pagina' + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPage(title, contenido);
		cy.createPageLink(title);
		cy.closeDashBoardSession();
		cy.validatePageByTitleAndLink(title, 1);
	});

	it('Crear pagina y publicarla', () => {

		let title = 'Titulo de la pagina' + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPage(title, contenido);
		cy.closeDashBoardSession();
		cy.validatePageLoadPublicLink(title);
		cy.goToDashBoard();
	});



	it('Eliminar pagina y link corespondiente', () => {

		let title = 'Titulo de la pagina' + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPage(title, contenido);
		cy.createPageLink(title);
		cy.closeDashBoardSession();
		cy.validatePageByTitleAndLink(title, 1);
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.deletePageLinkByTitle(title);
		cy.deletePageByTitle(title);
		cy.closeDashBoardSession();
		cy.validatePageByTitleAndLink(title, 0);
	});

	afterEach(function () {
		cy.closeDashBoardSession();
	});


});
