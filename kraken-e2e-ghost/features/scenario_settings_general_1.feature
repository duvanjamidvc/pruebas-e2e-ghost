Feature: Settings
  @user1 @web
  Scenario: Como usuario inicio sesion, cambio contraseña del sitio y la valido 
    Given I navigate to page "<URL_GHOST>"
    And I active screenshot "scenario_settings_general_1"
    And I wait for 3 seconds
    When I login "<EMAIL>" "<PASSWORD>"
    And I wait for 5 seconds
    And I click general settings
    And I take a screenshot
    And I set private site
    And I wait for 3 seconds
    And I take a screenshot
    And I go dashboard
    And I take a screenshot
    And I click general settings
    And I take a screenshot
    Then I validate password change
    And I take a screenshot
    And I set public site
    And I take a screenshot

