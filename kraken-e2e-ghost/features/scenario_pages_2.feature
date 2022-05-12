Feature: Pages

  @user1 @web
  Scenario: Como usuario inicio sesion, creo una página, la publico y valido la publicación, luego edito la página, la público y valido la publicación
    Given I navigate to page "<URL_GHOST>"
	  And I active screenshot "scenario_pages_2"
    And I wait for 2 seconds
    When I login "<EMAIL>" "<PASSWORD>"
    And I wait for 5 seconds
	  And I take a screenshot
    And I click pages
    And I wait for 2 seconds
	  And I take a screenshot
    And I click new page
    And I wait for 2 seconds
	  And I take a screenshot
    And I write title a page
    And I wait for 2 seconds
	  And I take a screenshot
    And I publish a page and verify
    And I wait for 5 seconds
	  And I take a screenshot
    And I click an exist page
    And I wait for 2 seconds
	  And I take a screenshot
    And I write content of page
    And I wait for 2 seconds
	  And I take a screenshot
    Then I publish a page and verify
    And I wait for 5 seconds
	  And I take a screenshot
