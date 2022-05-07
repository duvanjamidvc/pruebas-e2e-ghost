/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, a) => {
	return false;
});

let usuarios;
describe('Pages', () => {

	before(() => {
		cy.fixture('users').then(users => {
			usuarios = users;
			cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		});
	});
	it('Crear pagina, publicarla, editarla, cambiar el estado a borrador y válido en la lista de paginas que el estado sea borrador', () => {
		let title = cy.faker.name.title();
		let contenido = cy.faker.lorem.sentence();
		cy.createPageWithoutBack(title, contenido);
		cy.intercept('**/ghost/api/**').as('backPageEdit');
		cy.get('.gh-editor-back-button').click();
		cy.wait('@backPageEdit').its('response.statusCode').should('be.oneOf', [200, 201]);
		cy.filterPublishPage();
		cy.selectFirstPageOfListAndChangeState();
		cy.intercept('**/ghost/api/**').as('backPagePublish');
		cy.get('.gh-editor-back-button').click();
		cy.wait('@backPagePublish').its('response.statusCode').should('be.oneOf', [200, 201]);
		cy.filterDraftPage();
		cy.validateDraftStatePage(title, 1);
	});

	after(function () {
		cy.closeDashBoardSession();
	});

});
