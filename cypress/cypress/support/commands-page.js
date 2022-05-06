
/**
 *  Comando para crear un post
 */
Cypress.Commands.add('createPage', (title, content) => {

	cy.log(`Creando pagina con titulo ${title}  y contenido  ${content}`);

	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	// accede al menu pages
	cy.get('.gh-nav-list.gh-nav-manage  li  a[href="#/pages/"]').click();

	// // esperamos que cargue el contenido
	// cy.intercept('**/ghost/**').as('createPage');
	// cy.wait('@createPage');
	// clic en el boton de crear pagina
	cy.get('section.view-actions>a[href="#/editor/page/"]').click({ force: true });
	//llena el titulo del post 
	cy.get('textarea.gh-editor-title').clear().type(title);
	// llena el contenido 
	cy.get('article.koenig-editor').type(content);
	// esperamos que el guardado sea existoso
	cy.intercept('**/ghost/api/**').as('publishPage');
	cy.wait('@publishPage').its('response.statusCode').should('be.oneOf', [200, 201]);
	// vamos al menu publicar
	cy.get('.gh-publishmenu.ember-view').click();
	// clic en el boton publicar
	cy.get('.gh-publishmenu-footer>button.gh-publishmenu-button').click();
	// vamos atras
	cy.get('.gh-editor-back-button').click();
});



Cypress.Commands.add('createPageLink', (title) => {

	let titleToLink = title.replace(/\s/gi, '-').toLowerCase();

	cy.log(`Creando link de pagina con titulo ${title}  y link to ${titleToLink}`);

	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	// accede al menu de configuracion
	cy.get('a[href="#/settings/"]').click();

	// clic en el boton navegacion
	cy.get('a[href="#/settings/navigation/"]').click();

	//llena el titulo de la pagina
	cy.get('#settings-navigation .gh-blognav-line  .gh-blognav-label').last().find('input.ember-text-field').clear().type(title);

	// lena el link de la pagina
	cy.get('#settings-navigation  .gh-blognav-line  .gh-blognav-url').last().find('input.ember-text-field').type(titleToLink);
	// da clic en guardar
	cy.get('.view-actions>button').click();


});

Cypress.Commands.add('deletePageLinkByTitle', (title) => {

	let titleToLink = title.replace(/\s/gi, '-').toLowerCase();

	cy.log(`Eliminando link de pagina con titulo ${title}  y link to ${titleToLink}`);

	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	// accede al menu de configuracion
	cy.get('a[href="#/settings/"]').click();

	// clic en el boton navegacion
	cy.get('a[href="#/settings/navigation/"]').click();

	//llena el titulo de la pagina
	cy.get('#settings-navigation .gh-blognav-line  .gh-blognav-label')
		.find('input.ember-text-field')
		.each(($input) => {
			if ($input.val() === title) {
				cy.wrap($input)
					.parent('.gh-blognav-label')
					.parent('.gh-blognav-line')
					.parent('.gh-blognav-item')
					.find('.gh-blognav-delete')
					.click();
			}
		});
});
/**
 *  Comando para eliminar el primer post basado en el titulo
 */
Cypress.Commands.add('deletePageByTitle', (title) => {
	cy.log(`Boorando pagina con titulo ${title} `);

	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	// accede al menu pages
	cy.get('.gh-nav-list.gh-nav-manage  li  a[href="#/pages/"]').click();

	// // esperamos que cargue el contenido
	// cy.intercept('**/ghost/api/**').as('deletePageByTitle');
	// cy.wait('@deletePageByTitle');

	//buscamos la pagina en la lista y accedemos
	cy.get('li.gh-posts-list-item>a.gh-post-list-title>h3.gh-content-entry-title')
		.each(($item) => {
			let content = $item.text();
			cy.log(`titulo ${content} ${title}`);
			if (content == title) {
				cy.log(`titulo ${content} `);
				cy.wrap($item)
					.click();
			}
		});

	//abrimos el menu lateral derecho
	cy.get('.settings-menu-toggle').click();
	// eliminarmos el post
	cy.get('.settings-menu-delete-button').click();
	// damos clic en eliminar en el mensaje de confirmacion
	cy.get(' .modal-content > .modal-footer > .ember-view ').click();

});


/**
 *  Comando para validar numero de veces que aparece una pagina publicado
 */
Cypress.Commands.add('validatePageByTitle', (title, ocurrencias) => {
	let titleToLink = title.replace(/\s/gi, '-').toLowerCase();
	cy.log(`Validando que la pagina con titulo ${title}  y  ${titleToLink} este publicada`);
	const url = Cypress.config('baseUrl');
	cy.visit(url);
	cy.get('.navbar a.menu-item-link[href$="/' + titleToLink + '/"]').should('have.length', ocurrencias);
});


