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
		cy.backPage();
		cy.filterPublishPage();
		cy.selectFirstPageOfListAndChangeState();
		cy.backPage();
		cy.filterDraftPage();
		cy.validateDraftState(title, 1);
	});

	after(function () {
		cy.closeDashBoardSession();
	});

});
