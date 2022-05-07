Feature: Tags
  @user1 @web
  Scenario: Como usuario inicio sesion, creo un tag lo valido 
    Given I navigate to page "<URL_GHOST>"
    And I wait for 3 seconds
    When I login "<EMAIL>" "<PASSWORD>"
    And I wait for 5 seconds
    And I click general settings
    And I update tittle and subtittle
    Then I navigate to page "<URL_GHOST_BASE>"
    And I validad update tittle and subtittle

