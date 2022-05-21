import PostPage from "../pageObject/postPage";


function getRowDataPool(array) {
	const max = array.length - 1;
	const pos = Math.floor(Math.random() * max);
	return array[pos];
}

let postPage = new PostPage();

let users;
describe("Post with apriori data", () => {

	let postEmptyTitle;
	let postInvalidTitle;
	let postValidTitle;
	let excerptInvalid;
	let excerptValid;
	let metatitleInvalid;
	let metatitleValid;

	before(() => {
		cy.fixture('users').then(user => {
			users = user;
		});

		cy.fixture('MOCK_DATA_POST').then(posts => {
			postEmptyTitle = getRowDataPool(posts.emptyTitle);
			postInvalidTitle = getRowDataPool(posts.invalidTitle);
			postValidTitle = getRowDataPool(posts.validTitle);
			excerptInvalid = getRowDataPool(posts.excerptInvalid);
			excerptValid = getRowDataPool(posts.excerptValid);
			metatitleInvalid = getRowDataPool(posts.metatitleInvalid);
			metatitleValid = getRowDataPool(posts.metatitleValid);
		});
	});

	beforeEach(() => {
		cy.login(users.admins[0].username, users.admins[0].password);
	});

	it('should create post with empty title', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.inputTile().clear();
		postPage.inputContent().clear().type(postEmptyTitle.content);
		cy.intercept("**/ghost/api/**").as("savehPost");
		cy.wait("@savehPost")
			.its("response.statusCode")
			.should("be.oneOf", [200, 201]);
		postPage.btnPublishMenu().click();
		postPage.btnPublish().click();
		postPage.wait(1000);
		postPage.mainContent().click();
		postPage.btnBackPost().click();
		postPage.btnFilterPublished().click();
		postPage.wait(500);
		postPage.titleOfFirstElementOfList().contains('(Untitled)').should("have.length", 1);
	});

	it('should do not create post with length of title invalid, more than 255', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.inputTile().clear().type(postInvalidTitle.title);
		postPage.inputContent().clear().type(postInvalidTitle.content);
		postPage.btnPublishMenu().should('not.exist');
	});

	it('should create post a title valid, less than 255', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.inputTile().clear().type(postValidTitle.title);
		postPage.inputContent().clear().type(postValidTitle.content);
		cy.intercept("**/ghost/api/**").as("savePost");
		cy.wait("@savePost")
			.its("response.statusCode")
			.should("be.oneOf", [200, 201]);
		postPage.btnPublishMenu().click();
		postPage.btnPublish().click();
		postPage.wait(1000);
		postPage.mainContent().click();
		postPage.btnBackPost().click();
		postPage.btnFilterPublished().click();
		postPage.wait(500);
		postPage.titleOfFirstElementOfList().contains(postValidTitle.title).should("have.length", 1);
	});

	it('should edit a draft post and try to publish with title invalid, more than 255', () => {
		postPage.navegateToDashboard();
		postPage.draftPostLinkLeftMenu().click();
		postPage.elementOfList().first().click();
		postPage.inputTile().clear().type(postInvalidTitle.title);
		postPage.inputContent().clear().type(postInvalidTitle.content);
		postPage.mainContent().click();
		postPage.btnPublishMenu().click();
		postPage.btnPublish().click();
		postPage.wait(1000);
		postPage.mainContent().click();
		postPage.alert().should('exist');
	});

	it('should do not show message error with excerpt empty', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.inputExcerpt().clear();
		postPage.inputExcerpt().siblings('.response').should('be.hidden');
	});

	it('should show message error with excerpt invalid length, more than 300', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.inputExcerpt().clear().type(excerptInvalid.excerpt);
		postPage.mainContent().click();
		postPage.inputExcerpt().siblings('.response').should('be.visible');
	});

	it('should do not show message error with excerpt valid length, less than 300', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.inputExcerpt().clear().type(excerptValid.excerpt);
		postPage.mainContent().click();
		postPage.inputExcerpt().siblings('.response').should('be.hidden');
	});

	it('should do not show message error with meta title empty', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(0).click();
		postPage.inputMetatitle().clear();
		postPage.mainContent().click();
		postPage.inputMetatitle().siblings('p').children('.word-count').should('have.css', 'color', 'rgb(48, 207, 67)');
	});

	it('should show message error with meta title invalid length, more than 60', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(0).click();
		postPage.inputMetatitle().clear().type(metatitleInvalid.metatitle);
		postPage.mainContent().click();
		postPage.inputMetatitle().siblings('p').children('.word-count').should('have.css', 'color', 'rgb(226, 84, 64)');
	});

	it('should do not show message error with meta title valid length, less than 60', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(0).click();
		postPage.inputMetatitle().clear().type(metatitleValid.metatitle);
		postPage.mainContent().click();
		postPage.inputMetatitle().siblings('p').children('.word-count').should('have.css', 'color', 'rgb(48, 207, 67)');
	});

	afterEach(() => {
		cy.closeDashBoardSession();
	});
});

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from failing the test
	return false
})