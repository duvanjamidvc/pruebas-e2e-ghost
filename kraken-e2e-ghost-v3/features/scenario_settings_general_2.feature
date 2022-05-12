Feature: Settings
  @user1 @web
  Scenario: Como usuario actualizo titulo y subtitulo y lo valido 
    Given I navigate to page "<URL_GHOST>"
	  And I active screenshot "scenario_settings_general_2"
    And I wait for 3 seconds
    When I login "<EMAIL>" "<PASSWORD>"
    And I wait for 5 seconds
	  And I take a screenshot
    And I click general settings
	  And I take a screenshot
    And I update tittle and subtittle
	  And I take a screenshot
    Then I navigate to page "<URL_GHOST_BASE>"
	  And I take a screenshot
    And I validad update tittle and subtittle
	  And I take a screenshot

