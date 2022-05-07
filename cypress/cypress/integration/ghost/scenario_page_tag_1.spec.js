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
		const newTag = cy.faker.commerce.productAdjective()+cy.faker.datatype.number();
		cy.newTag(newTag);
		
		let title = 'Titulo del page' + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPageWithTag(title, contenido, newTag);

		cy.publishPage();
		cy.wait(100);
		cy.get('.post-view-link').click();
	});

	after(function () {
		cy.closeDashBoardSession();
	});

});
