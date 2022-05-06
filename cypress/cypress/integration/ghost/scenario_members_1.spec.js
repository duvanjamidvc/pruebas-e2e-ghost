/// <reference types="cypress" />

let usuarios;
describe("Members", () => {
  before(() => {
    cy.fixture("users").then((users) => {
      usuarios = users;
    });
  });

  beforeEach(() => {
    cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
  });

  it("create member  ", () => {
    const newMember = cy.faker.internet.email();
    cy.newMember(newMember);   
    cy.wait(500)
    //obtiene url para tomar id
    cy.url().then((url) => {
      const id = url.split("members/")[1];
      //valida si fue creado
      cy.get('[href="#/members/"]:visible').parent().first().click();
      cy.get("body").should("contain", newMember);
      cy.deleteMember(id);
    });
  
  });

  after(() => {
     cy.closeDashBoardSession();
  });
});

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
