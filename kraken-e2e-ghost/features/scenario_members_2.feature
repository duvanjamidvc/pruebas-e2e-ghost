Feature: Members
  @user1 @web
  Scenario: Como usuario inicio sesion, creo un miembro, lo valido, lo edito y elimino
    Given I navigate to page "<URL_GHOST>"
    And I wait for 3 seconds
    When I login "<EMAIL>" "<PASSWORD>"
    And I wait for 5 seconds
    And I click members
    And I wait for 2 seconds
    And I click new member
    And I wait for 2 seconds
    And I create member
    And I wait for 3 seconds
    And I validate exist member
    And I wait for 3 seconds
    Then I edit a member
    And I wait for 3 seconds
    And I validate exist member
    And I wait for 3 seconds
    And I delete a member

