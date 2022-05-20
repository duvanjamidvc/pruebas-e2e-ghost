Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from failing the test
	return false
})

import PostPage from "../pageObject/postPage";


function getRowDataPool(array) {
	const max = array.length - 1;
	const pos = Math.floor(Math.random() * max);
	return array[pos];
}

let postPage = new PostPage();

describe("Create post with apriori data", () => {

	before(function () {
		cy.fixture('users').then(user => {
			this.users = user;
		});

		cy.fixture('MOCK_DATA_POST').then(posts => {
			this.post = getRowDataPool(posts.emptyTitle);
		});
	});

	beforeEach(function () {
		cy.login(this.users.admins[0].username, this.users.admins[0].password);
	});

	it('should create post with empty title', function () {
		postPage.navegateToDashboard();
		postPage.postLinkLeftMenu().click();
		postPage.inputTile().clear();
		postPage.inputContent().clear().type(this.post.content);
		cy.intercept("**/ghost/api/**").as("publishPost");
		cy.wait("@publishPost")
			.its("response.statusCode")
			.should("be.oneOf", [200, 201]);
		// postPage.btnPublishMenu().click();
	});
});
