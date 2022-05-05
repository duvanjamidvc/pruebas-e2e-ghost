Feature: Members

@user1 @web
Scenario: Como usuario inicio sesion, creo un miembro
  Given I navigate to page "<URL_GHOST>"
  And I wait for 3 seconds
  When I enter email "<EMAIL>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click login
  And I wait for 5 seconds
  And I click members
  And I wait for 2 seconds
  And I click new member
  And I wait for 2 seconds
  And I create member
  And I wait for 3 seconds