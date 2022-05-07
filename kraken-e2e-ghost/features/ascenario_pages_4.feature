@pages-link
Feature: Pages

	@user1 @web
	Scenario: Como usuario inicio sesion, creo una página, la publico y valido la publicación, luego la edito, cambio el estado a no publicado y valido en la lista de paginas que el estado sea borrador
		Given I navigate to page "<URL_GHOST>"
		And I wait for 2 seconds
		When I login "<EMAIL>" "<PASSWORD>"
		And I wait for 5 seconds

