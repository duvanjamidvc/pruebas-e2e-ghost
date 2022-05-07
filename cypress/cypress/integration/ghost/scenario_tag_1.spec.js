/// <reference types="cypress" />

let usuarios;
describe('Tag', () => {

  before(() => {
    cy.fixture('users').then(users => {
      usuarios = users;
    });
  });

  beforeEach(() => {
    cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
  });

  it('create tag ', () => {
    const newTag = cy.faker.commerce.productAdjective()+cy.faker.datatype.number();
    cy.newTag(newTag);
    //valida que la lista contenga el nuevo tag
    cy.get('a[href="#/tags/'+newTag.toLowerCase()+'/"]').should('contain',newTag)
  });


  afterEach(() => {
   cy.closeDashBoardSession();
  })

});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
