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
	cy.screenshot('create-tag/clicking-login')
  });

  it('create tag ', () => {
	const stage ='create-tag'
    const newTag = cy.faker.commerce.productAdjective()+cy.faker.datatype.number();
    cy.newTag(newTag,stage);
    //valida que la lista contenga el nuevo tag
	cy.screenshot('create-tag/clicking-all-tags')
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
