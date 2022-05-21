/**
 * Comando para publicar una pagina 
 */
Cypress.Commands.add('publishPage', () => {
	// vamos al menu publicar
	cy.get('.gh-publishmenu.ember-view').click();
	// clic en el boton publicar
	cy.intercept('**/ghost/api/**').as('publish');
	cy.get('.gh-publishmenu-footer>button.gh-publishmenu-button').click();
	cy.wait('@publish').its('response.statusCode').should('be.oneOf', [200, 201]);
});

/**
 *  Comando para ir a crear un page
 */
 Cypress.Commands.add('GoCreatePage', () => {
	// accede al menu pages
	cy.get('.gh-nav-list.gh-nav-manage  li  a[href="#/pages/"]').click();
	// clic en el boton de crear pagina
	cy.get('section.view-actions>a[href="#/editor/page/"]').click({ force: true });	
});

/**
 *  Comando para publicar un page con expert
 */
 Cypress.Commands.add('CreatePageExcerpt', (newTittle,newExcerpt) => {
	cy.get('textarea.gh-editor-title').clear().type(newTittle);
	cy.get('.settings-menu-toggle').click();
	cy.get('#custom-excerpt').type(newExcerpt);
	cy.wait(5000)
});

/**
 * Comando para validar por el titulo de la pagina o post, si esta en estado borrador
 */
Cypress.Commands.add('validateDraftStatePage', (title, ocurrencias) => {
	cy.get('.view-container ol li:nth-child(2) .gh-post-list-title .gh-content-entry-title').contains(title).should('have.length', ocurrencias);
});

