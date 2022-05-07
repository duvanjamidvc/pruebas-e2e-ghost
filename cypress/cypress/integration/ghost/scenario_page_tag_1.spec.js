/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, a) => {
	return false;
});

let usuarios;
describe('page and tag', () => {

	before(() => {
		cy.fixture('users').then(users => {
			usuarios = users;
			cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		});
	});
	
	it('Como usuario quiero crear un tag y asignarselo a una página', () => {
		const newTag = cy.faker.commerce.productAdjective();
		cy.newTag(newTag);
		
		let title = 'Titulo del post' + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPageWithTag(title, contenido, newTag);
	});

	after(function () {
		cy.closeDashBoardSession();
	});

});
