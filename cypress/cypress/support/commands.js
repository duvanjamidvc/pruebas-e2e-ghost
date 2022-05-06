

Cypress.Commands.add('login', (username, password) => {
	const url = Cypress.config('baseUrlDashBoard');
	cy.log(`Logging in as ${username}`)
	cy.visit(url);
	cy.get('[name="identification"]').type(username);
	cy.get('[name="password"]').type(password);
	cy.get('#ember11').click();
	cy.intercept('GET', '**/ghost/**').as('goToDashBoard');
	cy.wait('@goToDashBoard').its('response.statusCode').should('be.oneOf', [200]);
});

/**
 *  Comando para cerrar la session del dashboard
 */
Cypress.Commands.add('closeDashBoardSession', () => {
	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url + '#/signout/');
});

Cypress.Commands.add('goToDashBoard', () => {
	const url = Cypress.config('baseUrlDashBoard');
	cy.visit(url);
	cy.intercept('GET', '**/ghost/**').as('goToDashBoard');
	cy.wait('@goToDashBoard');
});


Cypress.Commands.add("newTag", (newTag) => {
	const colorTag = cy.faker.datatype.hexaDecimal(8).split("0x")[1];
	cy.get('[href="#/tags/"]').parent().first().click();
	//da clic en crear tag
	cy.get('[href="#/tags/new/"]').click();
	//asigna variables
	cy.get('[id="tag-name"]').type(newTag);
	cy.get('[name="accent-color"]').first().type(colorTag);
	//guarda
	cy.get(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	).click();
	cy.wait(5000)
	//leva a tags de nuevo
	cy.get('[href="#/tags/"]').parent().first().click();
});

Cypress.Commands.add("editTag", (descEdit, newTag) => {
	cy.get('[href="#/tags/"]').parent().first().click();
	//navega a tag
	cy.get('[href="#/tags/' + newTag.toLowerCase() + '/"]')
		.first()
		.click();
	//actualiza descripción tag
	cy.get('[id="tag-description"]').type(descEdit);
	//guarda
	cy.get(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	).click();
	cy.wait(5000)
	//regresa a tags
	cy.get('[href="#/tags/"]').parent().first().click();
});

Cypress.Commands.add("goToGeneralSettings", () => {
	cy.get('[href="#/settings/"]').first().click();
	cy.get('[href="#/settings/general/"]').first().click();
});

Cypress.Commands.add("newMember", (emailMember) => {
	const newMember = cy.faker.name.firstName();
	const noteMember = cy.faker.lorem.paragraph();
	cy.get('[href="#/members/"]:visible').parent().first().click();
	cy.get('[href="#/members/new/"]').click();
	//asignar variables
	cy.get('[id="member-name"]').type(newMember, { force: true });
	cy.get('[id="member-email"]').type(emailMember);
	cy.get('[id="member-note"]').type(noteMember);
	//guardar
	cy.get(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	).click();
});
Cypress.Commands.add("deleteMember", (idMember) => {
	//ingresa a miembro a eliminar
	cy.get('[href="#/members/' + idMember + '/"]')
		.first()
		.click();
	//clic en eliminar
	cy.get(".view-actions > .dropdown > .gh-btn > span > svg").click();
	cy.get(
		".view-actions > .dropdown > .dropdown > li:nth-child(2) > .mr2"
	).click();
	//click en modal aceptar
	cy.get(".modal-footer > .gh-btn.gh-btn-red.gh-btn-icon.ember-view")
		.first()
		.click();
});
