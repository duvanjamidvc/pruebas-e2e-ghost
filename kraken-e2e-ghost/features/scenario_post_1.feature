Feature: Post

@user1 @web
Scenario: Como usuario inicio sesion, creo un post, lo público y validó la publicación
  Given I navigate to page "<URL_GHOST>"
  And I wait for 3 seconds
  When I enter email "<EMAIL>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click login
  And I wait for 5 seconds
  And I click posts
  Then I wait for 2 seconds
  And I click new post
  And I wait for 2 seconds
  And I write title a post
  Then I wait for 2 seconds
  And I publish a post and verify
  And I wait for 5 seconds