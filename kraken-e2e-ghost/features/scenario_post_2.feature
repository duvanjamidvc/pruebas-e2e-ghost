Feature: Escenario 2 Editar post

@user1 @web
Scenario: Como usuario inicio sesion, creo un post, lo publico y valido la publicación, luego edito el post, lo público y valido la publicación
  Given I navigate to page "<URL_GHOST>"
  And I wait for 2 seconds
  When I login "<EMAIL>" "<PASSWORD>"
  And I wait for 5 seconds
  And I click posts
  And I wait for 2 seconds
  And I click new post
  And I wait for 2 seconds
  And I write title a post
  And I wait for 2 seconds
  And I publish a post and verify
  And I wait for 5 seconds
  And I click an exist post
  And I wait for 2 seconds
  And I write content of post
  And I wait for 2 seconds
  Then I publish a post and verify
  And I wait for 5 seconds
