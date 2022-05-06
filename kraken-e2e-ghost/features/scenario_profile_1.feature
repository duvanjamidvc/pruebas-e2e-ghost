Feature: Profile
  @user1 @web
  Scenario: Como usuario inicio sesion, cambio la contraseña, hago Sign out e inicio sesion de nuevo
    Given I navigate to page "<URL_GHOST>"
    And I wait for 3 seconds
    When I login "<EMAIL>" "<PASSWORD>"
    And I wait for 5 seconds
    And I click profile
    And I change password "<PASSWORD>" "<NEW_PASSWORD>"
    And I wait for 7 seconds
    And I Sign out
    And I wait for 3 seconds
    Then I login "<EMAIL>" "<NEW_PASSWORD>"
    And I wait for 5 seconds
    And I click profile
    And I change password "<NEW_PASSWORD>" "<PASSWORD>"
    And I wait for 3 seconds
