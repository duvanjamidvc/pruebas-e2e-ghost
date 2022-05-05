/// <reference types="cypress" />

let usuarios;
describe('example to-do app', () => {

  before(() => {
    cy.fixture('users').then(users => {
      usuarios = users;
    });
  });

  beforeEach(() => {
    cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
  });

  it('Ingresar ', () => {

    const url = Cypress.config('baseUrlDashBoard');
    cy.visit(url);

  });

  // it('can add new todo items', () => {

  // });

  afterEach(() => {
    cy.closeDashBoardSession();
  })

});
