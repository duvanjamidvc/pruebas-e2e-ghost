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
	it('Crear post, publicarlo, editarlo, cambiar el estado a borrador y válido en la lista de post que el estado sea borrador', () => {
		let title = cy.faker.name.title();
		let contenido = cy.faker.lorem.sentence();
		cy.createPostWithoutBack(title, contenido);
		cy.publishPost();
		cy.backPage();

		cy.selectFirstPageOfListAndChangeState();

		cy.get('.gh-nav-view-list > li > a[href="#/posts/?type=draft"]').click();

		cy.validateDraftState(title, 1);
	});

	after(function () {
		// cy.closeDashBoardSession();
	});

});
