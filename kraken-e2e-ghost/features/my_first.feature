Feature: My feature

@user1 @web
Scenario: Como usuario 2 inicio sesion y mandó un mensaje al usuario 1
  Given I navigate to page "<URL_GHOST>"
  And I wait for 3 seconds
  When I enter email "<EMAIL>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click login
  And I wait for 70 seconds
  And I click posts
  And I wait for 10 seconds