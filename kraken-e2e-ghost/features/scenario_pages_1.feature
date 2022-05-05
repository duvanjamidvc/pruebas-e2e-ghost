Feature: Pages

@user1 @web
Scenario: Como usuario inicio sesion, creo una pagina, la público y validó la publicación
  Given I navigate to page "<URL_GHOST>"
  And I wait for 3 seconds
  When I enter email "<EMAIL>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click login
  And I wait for 5 seconds
  And I click pages
  Then I wait for 2 seconds
  And I click new page
  And I wait for 2 seconds
  And I write title a page
  Then I wait for 2 seconds
  And I publish a page and verify
  And I wait for 5 seconds