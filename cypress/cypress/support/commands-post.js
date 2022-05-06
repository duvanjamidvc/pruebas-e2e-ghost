
/**
 *  Comando para crear un post
 */
Cypress.Commands.add('createPost', (title, content) => {

	cy.log(`Creando post con titulo ${title}  y contenido  ${content}`);
	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	// accede al menu de post nuevo
	cy.get('.gh-nav-list.gh-nav-manage  li  a[href="#/editor/post/"]').click();
	//llena el titulo del post 
	cy.get('textarea.gh-editor-title').clear().type(title);
	// llena el contenido 
	cy.get('article.koenig-editor').type(content);
	// esperamos que el guardado sea existoso
	cy.intercept('**/ghost/api/**').as('publishPost');
	cy.wait('@publishPost').its('response.statusCode').should('be.oneOf', [200, 201]);
	// vamos al menu publicar
	cy.get('.gh-publishmenu-trigger').click();
	// clic en el boton publicar
	cy.get('button.gh-publishmenu-button').click();
	// vamos atras
	cy.get('.gh-editor-back-button').click();
});

/**
 *  Comando para eliminar el primer post basado en el titulo
 */
Cypress.Commands.add('deletePostByTitle', (title) => {

	cy.log(`Borrando post con titulo ${title}  `);

	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);

	// esperamos que el guardado sea existoso
	cy.intercept('**/ghost/api/**').as('deletePost');
	cy.wait('@deletePost').its('response.statusCode').should('be.oneOf', [204, 200, 201]);

	// accede al menu de post publicados
	cy.get('.gh-nav-view-list > li > a[href="#/posts/?type=published"]').click();
	//buscamos el post en la lista y accedemos
	cy.get('li.gh-posts-list-item>a>h3.gh-content-entry-title').contains(title).eq(0).parent('a').parent('li').click();
	//abrimos el menu lateral derecho
	cy.get('.settings-menu-toggle').click();
	// eliminarmos el post
	cy.get('.settings-menu-delete-button').click();
	// damos clic en eliminar en el mensaje de confirmacion
	cy.get(' .modal-content > .modal-footer > .ember-view ').click();

});


/**
 *  Comando para validar numero de veces que aparece un post publicado
 */
Cypress.Commands.add('validatePostPublicByTitle', (title, ocurrencias) => {

	cy.log(`Validando post publico con titulo ${title}  `);

	const url = Cypress.config('baseUrl');
	cy.visit(url);
	cy.get('.post-card.post h2.post-card-title').contains(title).should('have.length', ocurrencias);

});


