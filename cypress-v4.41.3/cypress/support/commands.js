Cypress.Commands.add("login", (username, password) => {
	const url = Cypress.config("baseUrlDashBoard");
	cy.log(`Logging in as ${username}`);
	cy.visit(url);
	cy.get('[name="identification"]').type(username);
	cy.get('[name="password"]').type(password);
	cy.get("#ember11").click();
	cy.intercept("GET", "**/ghost/**").as("goToDashBoard");
	cy.wait("@goToDashBoard")
		.its("response.statusCode")
		.should("be.oneOf", [200]);
});

/**
 *  Comando para cerrar la session del dashboard
 */
Cypress.Commands.add("closeDashBoardSession", () => {
	const url = Cypress.config("baseUrlDashBoard");
	cy.visit(url);

	cy.intercept("GET", "**/ghost/**").as("goToDashBoardToCloseSession");
	cy.wait("@goToDashBoardToCloseSession");

	cy.get(".gh-user-avatar").parent().parent().click();
	cy.get(".user-menu-signout").click();
});

Cypress.Commands.add("goToDashBoard", () => {
	const url = Cypress.config("baseUrlDashBoard");
	cy.visit(url);
	cy.intercept("GET", "**/ghost/**").as("goToDashBoard");
	cy.wait("@goToDashBoard");
});


Cypress.Commands.add("newTag", (newTag, stage) => {
	const colorTag = "000000";
	cy.get('a[href="#/tags/"]').parent().first().click();
	cy.wait(5000);
	cy.screenshot(`${stage}/clicking-tags`);
	//da clic en crear tag
	cy.get('section.view-actions>a[href="#/tags/new/"]').click();
	cy.screenshot(`${stage}/clicking-new-tag`);
	//asigna variables
	cy.get('[id="tag-name"]').type(newTag);
	cy.get('[name="accent-color"]').first().type(colorTag);
	//guarda
	cy.get(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	).click();
	cy.wait(1000);
	cy.screenshot(`${stage}/clicking-save-tag`);
	cy.wait(3000);
	//leva a tags de nuevo
	cy.get('a[href="#/tags/"]').parent().first().click();
});

Cypress.Commands.add("editTag", (descEdit, newTag, stage) => {
	cy.get('a[href="#/tags/"]').parent().first().click();
	cy.screenshot(`${stage}/clicking-tags-edit`);
	//navega a tag
	cy.get('a[href="#/tags/' + newTag.toLowerCase() + '/"]')
		.first()
		.click();
	cy.screenshot(`${stage}/clicking-tag-detail`);
	//actualiza descripción tag
	cy.get('[id="tag-description"]').type(descEdit);
	//guarda
	cy.get(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	).click();
	cy.wait(4000);
	cy.screenshot(`${stage}/clicking-tag-edit-save`);
	//regresa a tags
	cy.get('a[href="#/tags/"]').parent().first().click();
});

Cypress.Commands.add("deleteTag", (newTag, stage) => {
	cy.get('a[href="#/tags/"]').parent().first().click();
	cy.screenshot(`${stage}/clicking-tags-edit`);
	//navega a tag
	cy.get('a[href="#/tags/' + newTag.toLowerCase() + '/"]')
		.first()
		.click();
	cy.screenshot(`${stage}/clicking-tag-detail`);
	//elimina descripción tag
	cy.get('.gh-main > .gh-canvas > div > .gh-btn ').click();
	cy.screenshot(`${stage}/clicking-delete-tag`);
	cy.wait(3000);
	cy.get('.fullscreen-modal > .modal-content > .modal-footer > .gh-btn-red ').click()
	cy.screenshot(`${stage}/clicking-delete-tag-confirm`);
	cy.wait(3000);
});

Cypress.Commands.add("goToGeneralSettings", (stage) => {
	cy.get('a[href="#/settings/"]').first().click();
	cy.screenshot(`${stage}/clicking-settings`);
	cy.get('a[href="#/settings/general/"]').first().click();
	cy.screenshot(`${stage}/clicking-general-settings`);
});
