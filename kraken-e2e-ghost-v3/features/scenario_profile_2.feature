Feature: Profile

@user1 @web
Scenario: Como usuario inicio sesion, cambio el nombre de usuario en la configuracion del perfil y verifico en la ventana de informacion que el nombre se haya actualizado
  Given I navigate to page "<URL_GHOST>"
  And I wait for 2 seconds
  When I login "<EMAIL>" "<PASSWORD>"
  And I wait for 5 seconds
  And I click profile
  And I wait for 3 seconds
  And I write full name
  And I wait for 3 seconds
  And I click save config
  And I wait for 5 seconds
  And I click profile
  And I wait for 3 seconds
  Then I verify name changed
  And I wait for 3 seconds
