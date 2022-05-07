@post-tags
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
		And I click pages
		And I wait for 2 seconds
		And I click new page
		And I wait for 2 seconds
		And I write title a page
		And I wait for 2 seconds
		And I publish a page
		And I wait for 5 seconds
		And I set tag to page
		And I wait for 5 seconds
		And I publish a page
		And I wait for 3 seconds
		And I navigate to page "<URL_GHOST>"
		And I wait for 2 seconds
		And I click pages
		And I wait for 2 seconds
		Then I validate page with tag

