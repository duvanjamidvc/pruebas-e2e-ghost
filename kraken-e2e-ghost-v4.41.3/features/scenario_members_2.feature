Feature: Members
  @user1 @web
  Scenario: Como usuario inicio sesion, creo un miembro, lo valido, lo edito y elimino
    Given I navigate to page "<URL_GHOST>"
	  And I active screenshot "scenario_members_2"
    And I wait for 3 seconds
    When I login "<EMAIL>" "<PASSWORD>"
    And I wait for 5 seconds
	  And I take a screenshot
    And I click members
    And I wait for 2 seconds
	  And I take a screenshot
    And I click new member
    And I wait for 2 seconds
	  And I take a screenshot
    And I create member
    And I wait for 3 seconds
	  And I take a screenshot
    And I validate exist member
    And I wait for 3 seconds
	  And I take a screenshot
    Then I edit a member
    And I wait for 3 seconds
	  And I take a screenshot
    And I validate exist member
	  And I take a screenshot
    And I wait for 3 seconds
    And I delete a member
	  And I take a screenshot

