Feature: Pages

	@user1 @web
	Scenario: Como usuario inicio sesion, creo una página, la publico y valido la publicación, luego la edito, cambio el estado a no publicado y valido en la lista de paginas que el estado sea borrador
		Given I navigate to page "<URL_GHOST>"
		And I active screenshot "scenario_pages_3"
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
		And I change state to draft
		And I wait for 2 seconds
		And I take a screenshot
		Then I verify page state is draft
		And I wait for 5 seconds
		And I take a screenshot
