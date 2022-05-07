
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


/**
 *  Comando para crear un post sin volver atras a la lista de posts
 */
Cypress.Commands.add('createPostWithoutBack', (title, content) => {

	cy.log(`Creando post con titulo ${title}  y contenido  ${content}`);
	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	// accede al menu de post nuevo
	cy.get('.gh-nav-list.gh-nav-manage  li  a[href="#/editor/post/"]').click();
	//llena el titulo del post 
	cy.get('textarea.gh-editor-title').clear().type(title);

	cy.intercept('**/ghost/api/**').as('publishPost');
	// llena el contenido 
	cy.get('article.koenig-editor').type(content);
	// esperamos que el guardado sea existoso
	cy.wait('@publishPost').its('response.statusCode').should('be.oneOf', [200, 201]);
	
})

/**
 * Comando para Publicar un post
 */
Cypress.Commands.add('publishPost', () => {
	// vamos al menu publicar
	cy.get('.gh-publishmenu-trigger').click();
	// clic en el boton publicar
	cy.intercept('**/ghost/api/**').as('publish');
	cy.get('button.gh-publishmenu-button').click();
	cy.wait('@publish').its('response.statusCode').should('be.oneOf', [200, 201]);
});

/**
 * Comando para Validar que el post tenga enlace publico en los settings del post  
 */
Cypress.Commands.add('validatePublishPostFromSettings', (title, content) => {
	cy.get('.settings-menu-toggle').click();
	cy.wait(100);
	cy.get('.post-view-link').click();
});

/**
 * Comando para Seleccionar el primer post listado publicado y editadorlo
 */
Cypress.Commands.add('selectFirstPostOfListAndEdit', (title, content) => {
	// accede al menu de post publicados
	cy.intercept('**/ghost/api/**').as('loadPosts');
	cy.get('.gh-nav-view-list > li > a[href="#/posts/?type=published"]').click();
	cy.wait('@loadPosts').its('response.statusCode').should('be.oneOf', [200, 201]);
	//buscamos el post en la lista y accedemos
	cy.get('li.gh-posts-list-item>a>h3.gh-content-entry-title').contains(title).eq(0).parent('a').parent('li').click();
	cy.get('.koenig-editor__editor-wrapper').type(cy.faker.lorem.sentence());

});

/**
 * Comando para seleccionar y editar para cambiar el estado a borrador de la primera pagina de la lista de paginas
 */
Cypress.Commands.add('selectFirstPostOfListAndChangeState', (title) => {
	cy.get('li.gh-posts-list-item>a>h3.gh-content-entry-title').contains(title).eq(0).parent('a').parent('li').click();
	cy.get('.gh-publishmenu').click();
	cy.get('.gh-publishmenu-radio:not(.active)').click();
	cy.get('.gh-publishmenu-button').click();
	cy.get('.gh-main').click();
	cy.wait(200);
});

/**
 * Comando para validar por el titulo de la pagina o post, si esta en estado borrador
 */
Cypress.Commands.add('validateDraftStatePost', (title, ocurrencias) => {
	cy.get('.view-container ol li:nth-child(2) .gh-post-list-title .gh-content-entry-title').contains(title).should('have.length', ocurrencias);
});
