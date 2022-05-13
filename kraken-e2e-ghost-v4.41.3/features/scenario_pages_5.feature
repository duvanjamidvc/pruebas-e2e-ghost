@pages-link-nav
Feature: Pages

	@user1 @web
	Scenario: Como usuario inicio sesion, creo una página, la publico , creo un link, y valido la publicación con el enlace, luego elimino el link y elimino la pagina
		Given I navigate to page "<URL_GHOST>"
		And I active screenshot "scenario_pages_5"
		And I wait for 2 seconds
		And I take a screenshot
		When I login "<EMAIL>" "<PASSWORD>"
		And I wait for 2 seconds
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
		And I publish a page
		And I wait for 2 seconds
		And I take a screenshot
		And I navigate to page "<URL_GHOST_BASE>"
		And I wait for 2 seconds
		And I take a screenshot
		Then I go to page url "<URL_GHOST_BASE>"
		And I wait for 3 seconds
		And I take a screenshot