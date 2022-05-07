/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, a) => {
	return false;
});

let usuarios;
describe('Posts', () => {

	before(() => {
		cy.fixture('users').then(users => {
			usuarios = users;
			cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		});
	});
	
	it('Como usuario inicio sesion, creo un post lo publico y luego lo edito y lo vuelvo a publicar', () => {
		let title = 'Titulo del post' + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPostWithoutBack(title, contenido);
		cy.publishPost();
		cy.validatePublishPostFromSettings();
		cy.intercept('**/ghost/api/**').as('backPostNew');
		cy.get('.gh-editor-back-button').click();
		cy.wait('@backPostNew').its('response.statusCode').should('be.oneOf', [200, 201]);
		cy.selectFirstPostOfListAndEdit(title, contenido);
		cy.publishPost();
		cy.validatePublishPostFromSettings();
	});

	after(function () {
		cy.closeDashBoardSession();
	});

});
