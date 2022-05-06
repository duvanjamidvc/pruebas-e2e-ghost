// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
  const url = Cypress.config("baseUrlDashBoard");
  cy.log(`Logging in as ${username}`);
  cy.visit(url);
  cy.get('[name="identification"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get("#ember11").click();
});

Cypress.Commands.add("closeDashBoardSession", () => {
  const url = Cypress.config("baseUrlDashBoard");
  cy.visit(url + "#/signout/");
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
