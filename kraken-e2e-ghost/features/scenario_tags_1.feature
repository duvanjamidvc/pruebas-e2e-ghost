Feature: Tags
  @user1 @web
  Scenario: Como usuario inicio sesion, creo un tag lo valido 
    Given I navigate to page "<URL_GHOST>"
    And I wait for 3 seconds
    When I login "<EMAIL>" "<PASSWORD>"
    And I wait for 5 seconds
  	And I take a screenshot
    And I click Tags
	  And I take a screenshot
    And I wait for 2 seconds
    And I click new Tag
	  And I take a screenshot
    And I wait for 2 seconds
    And I create Tag
	  And I take a screenshot
    And I wait for 3 seconds
    Then I validate exist Tag
	  And I take a screenshot
    

