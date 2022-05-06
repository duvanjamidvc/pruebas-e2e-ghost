/// <reference types="cypress" />
/// <reference types="../../support" />

Cypress.on('uncaught:exception', (err, a) => {
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

	it('Ingresar a post publicados y crear filtro', () => {


		const url = Cypress.config('baseUrlDashBoard');
		cy.visit(url);

		const newTag = cy.faker.commerce.productAdjective().toUpperCase();
		cy.newTag(newTag);

		// accede al menu de post publicados
		cy.get('.gh-nav-view-list > li > a[href="#/posts/?type=published"]').click();

		// // esperamos que cargue la pagina
		cy.intercept('**/ghost/api/**').as('loadPagePublishedPost');
		cy.wait('@loadPagePublishedPost');
		cy.wait(3000);

		// da clic en el menu de filtro por tag
		cy.get('.gh-contentfilter > .gh-contentfilter-tag').click();

		// selecciona el segundo tag desplegado
		cy.get('ul.ember-power-select-options').children('li').contains(newTag).click();

		// da clic en el segundo tag desplegado

		// da clic en el boton para guardar el filtro 
		cy.get('.view-actions > .gh-contentfilter > .dropdown > .gh-btn-save-view').click()
		// en el popUp pone un nombre al filtro
		cy.get('#view-name').clear().type(newTag.trim());

		// le pone un color al filtro
		cy.get('#view-pink').parent().click();
		// da clic en guardar
		cy.get(' .modal-content > .modal-footer > .ember-view ').click()
		// valida el que el filtro se muestre en el menu lateral
		cy.get(`.gh-nav-view-list  li  a[title="${newTag.trim()}"]`).children('span.gh-nav-viewname').should('have.text', newTag.trim());

	});

	it('Crear post publico', () => {

		let title = 'Titulo del post' + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPost(title, contenido);

		cy.closeDashBoardSession();

		cy.validatePostPublicByTitle(title, 1);

	});


	it('Eliminar post publicado', () => {

		let title = 'Titulo del post' + new Date().getTime();
		let contenido = cy.faker.lorem.paragraph();

		cy.createPost(title, contenido);

		cy.closeDashBoardSession();

		cy.validatePostPublicByTitle(title, 1);

		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);

		cy.deletePostByTitle(title);

		cy.closeDashBoardSession();

		cy.validatePostPublicByTitle(title, 0);

	});

	afterEach(function () {
		cy.closeDashBoardSession();
	});

});
