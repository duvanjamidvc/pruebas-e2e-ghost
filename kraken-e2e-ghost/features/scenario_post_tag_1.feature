Feature: Post-tag
  @user1 @web
  Scenario: Como usuario inicio sesion, creo un tag creo un post le asigno el tag y valido
    Given I navigate to page "<URL_GHOST>"
	And I active screenshot "scenario_post_tag_1"
    And I wait for 3 seconds
    When I login "<EMAIL>" "<PASSWORD>"
    And I wait for 5 seconds
	And I click Tags
    And I wait for 2 seconds
	And I take a screenshot
    And I click new Tag
    And I wait for 2 seconds
	And I take a screenshot
    And I create Tag
    And I wait for 3 seconds
	And I take a screenshot
	And I click posts
	And I wait for 2 seconds
	And I take a screenshot
	And I click new post
	And I wait for 2 seconds
	And I take a screenshot
	And I write title a post
	And I wait for 2 seconds
	And I take a screenshot
	And I update tag post
	And I take a screenshot
	And I publish a post
	And I wait for 5 seconds
	And I take a screenshot
	And I click posts
	And I wait for 3 seconds
	And I take a screenshot
	And I click in tag filter
	And I wait for 2 seconds
	And I take a screenshot
	And I click in item with tag name
	And I wait for 2 seconds
	And I take a screenshot
	Then I validad set post tag
	And I take a screenshot
	And I go dashboard
	And I wait for 5 seconds
	And I click Tags 
	And I wait for 5 seconds
	And I validate exist Tag
	And I wait for 5 seconds
	And I delete a tag