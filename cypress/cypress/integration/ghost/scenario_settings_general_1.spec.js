/// <reference types="cypress" />

let usuarios;
describe("General Settings", () => {
  before(() => {
    cy.fixture("users").then((users) => {
      usuarios = users;
    });
  });

  beforeEach(() => {
    cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
  });

  it("set private site and validate incorrect password ", () => {
    const url = Cypress.config("baseUrl");
    const newPassword = cy.faker.internet.password();
    const incorrectPassword = newPassword + cy.faker.datatype.number();
    cy.goToGeneralSettings();
    //valida si el sitioes privado y si no lo es asigna privado
    cy.get("body").then(($body) => {
      if ($body.find('[name="general[password]"]').length <= 0) {
        cy.get(
          "body > div.gh-app > div > main > section > div:nth-child(4) > section > div > div.gh-expandable-header > div.for-switch > label > span"
        ).click();
      }
      //asigna contraseña
      cy.get('[name="general[password]"]').type(newPassword);
    });
    //guarda
    cy.get(
      ".gh-canvas-header > .gh-canvas-header-content > .view-actions "
    ).click();
    // esperamos que el guardado sea existoso
   
    cy.wait(5000)
    //visita el sitio
    cy.visit(url);
    //digita contraseña incorrecta
    cy.get('[name="password"]').type(incorrectPassword);
    cy.get('button[type="submit"]').click();
    //verifica que la contraseña sea incorrecta
    cy.get(
      ".gh-flow-content-wrap > .gh-flow-content > .gh-signin > .form-group "
    ).should("contain", "Incorrect password.");
  });

  it("Set public site", () => {
    cy.goToGeneralSettings();
    //vuelve a poner el sitio como publico
    cy.get(
      "body > div.gh-app > div > main > section > div:nth-child(4) > section > div > div.gh-expandable-header > div.for-switch > label > span"
    ).click();
    //guarda
    cy.get(
      ".gh-canvas-header > .gh-canvas-header-content > .view-actions "
    ).click();
    cy.wait(500);
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
