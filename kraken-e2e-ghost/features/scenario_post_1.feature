Feature: Post

@user1 @web
Scenario: Como usuario inicio sesion, creo un post, lo público y validó la publicación
  Given I navigate to page "<URL_GHOST>"
  And I active screenshot "scenario_post_1"
  And I wait for 3 seconds
  When I login "<EMAIL>" "<PASSWORD>"
  And I wait for 5 seconds
  And I click posts
  And I wait for 2 seconds
  And I take a screenshot
  And I click new post
  And I wait for 2 seconds
  And I take a screenshot
  And I write title a post
  And I wait for 2 seconds
  And I take a screenshot
  Then I publish a post and verify
  And I wait for 5 seconds
