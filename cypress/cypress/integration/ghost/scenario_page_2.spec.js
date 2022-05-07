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

	it('Crear pagina, publicarla, editarla y verificar que se publicó a traves del link generado en el las configuraciones del post', () => {
		let title = cy.faker.name.title();
		let contenido = cy.faker.lorem.sentence();
		cy.createPageWithoutBack(title, contenido);
		cy.get('a[href="#/pages/"]').click();
		cy.filterPublishPage();
		cy.selectFirstPageOfListAndEdit();
		cy.publishPage();
		cy.validatePublishPageFromSettings();
	});

	after(function () {
		cy.closeDashBoardSession();
	});

});
