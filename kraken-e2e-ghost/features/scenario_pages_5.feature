@pages-link-nav
Feature: Pages

	@user1 @web
	Scenario: Como usuario inicio sesion, creo una página, la publico , creo un link, y valido la publicación con el enlace, luego elimino el link y elimino la pagina
		Given I navigate to page "<URL_GHOST>"
		And I wait for 2 seconds
		When I login "<EMAIL>" "<PASSWORD>"
		And I wait for 2 seconds
		And I click pages
		And I wait for 2 seconds
		And I click new page
		And I wait for 2 seconds
		And I write title a page
		And I wait for 2 seconds
		And I publish a page
		And I wait for 2 seconds
		And I navigate to page "<URL_GHOST_BASE>"
		And I wait for 2 seconds
		Then I go to page url "<URL_GHOST_BASE>"
		And I wait for 3 seconds