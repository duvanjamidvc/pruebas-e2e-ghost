Feature: Pages

@user1 @web
Scenario: Como usuario inicio sesion, creo una página, la publico y valido la publicación, luego la edito, cambio el estado a no publicado y valido en la lista de paginas que el estado sea borrador
  Given I navigate to page "<URL_GHOST>"
  And I wait for 2 seconds
  When I enter email "<EMAIL>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click login
  And I wait for 3 seconds
  And I click pages
  Then I wait for 2 seconds
  And I click new page
  And I wait for 2 seconds
  And I write title a page
  Then I wait for 2 seconds
  And I publish a page and verify
  And I wait for 5 seconds
  And I click an exist page
  And I wait for 2 seconds
  And I change state to draft
  And I wait for 2 seconds
  And I verify page state is draft
  And I wait for 5 seconds
