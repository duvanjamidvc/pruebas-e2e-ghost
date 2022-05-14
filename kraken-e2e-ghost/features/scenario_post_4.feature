@posts-filters
Feature: Posts

	@user1 @web
	Scenario: Como usuario creo un tag y luego creo un filtro de los post publicados por ese tag, y valido que el filtro quede accesible
		Given I navigate to page "<URL_GHOST>"
		And I active screenshot "scenario_post_4"
		And I wait for 2 seconds
		When I login "<EMAIL>" "<PASSWORD>"
		And I wait for 3 seconds
		And I click Tags
		And I wait for 2 seconds
		And I take a screenshot
		And I click new Tag
		And I wait for 2 seconds
		And I take a screenshot
		And I create Tag
		And I wait for 2 seconds
		And I take a screenshot
		And I navigate to page "<URL_GHOST>"
		And I wait for 2 seconds
		And I take a screenshot
		And I click in post published menu
		And I wait for 2 seconds
		And I take a screenshot
		And I click in tag filter
		And I wait for 2 seconds
		And I take a screenshot
		And I click in item with tag name
		And I wait for 2 seconds
		And I take a screenshot
		And I click in save filter button
		And I wait for 2 seconds
		And I take a screenshot
		And I type name filter
		And I wait for 2 seconds
		And I take a screenshot
		And I select color filter
		And I wait for 2 seconds
		And I take a screenshot
		And I click in save popUp button
		And I wait for 2 seconds
		And I take a screenshot
		Then I validate menu filter
		And I wait for 5 seconds
		And I take a screenshot
		And I go dashboard
		And I wait for 5 seconds
		And I click Tags 
		And I wait for 5 seconds
		And I validate exist Tag
		And I wait for 5 seconds
		And I delete a tag


