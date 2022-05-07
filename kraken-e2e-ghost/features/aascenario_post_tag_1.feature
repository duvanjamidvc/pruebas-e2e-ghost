Feature: Settings
  @user1 @web
  Scenario: Como usuario inicio sesion, cambio contraseña del sitio y la valido 
    Given I navigate to page "<URL_GHOST>"
    And I wait for 3 seconds
    When I login "<EMAIL>" "<PASSWORD>"
    And I wait for 5 seconds
	And I click Tags
    And I wait for 2 seconds
    And I click new Tag
    And I wait for 2 seconds
    And I create Tag
    And I wait for 3 seconds
	And I click posts
	And I wait for 2 seconds
	And I click new post
	And I wait for 2 seconds
	And I write title a post
	And I wait for 2 seconds
	And I update tag post
	And I publish a post
	And I wait for 5 seconds
	And I click posts
	And I wait for 3 seconds
	And I click in tag filter post
	And I wait for 2 seconds
	And I click in item with tag name
	And I wait for 2 seconds
	Then I validad set post tag

