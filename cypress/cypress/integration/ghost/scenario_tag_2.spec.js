/// <reference types="cypress" />

let usuarios;
describe("Tag", () => {
  before(() => {
    cy.fixture("users").then((users) => {
      usuarios = users;
    });
  });

  beforeEach(() => {
    cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
	cy.screenshot('edit-tag/clicking-login')
  });

  it("Edit tag ", () => {
	const stage ='edit-tag'
    const newTag = cy.faker.commerce.productAdjective()+cy.faker.datatype.number();
    cy.newTag(newTag,stage);
    const descEdit = cy.faker.lorem.paragraph();
    cy.editTag(descEdit, newTag,stage);
    //valida que contenga la descripción editada en el tag
    cy.get('a[href="#/tags/' + newTag.toLowerCase() + '/"]').should(
      "contain",
      descEdit
    );
  });

  

  afterEach(() => {
    cy.closeDashBoardSession();
  });
});

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
