import PostPage from "../pageObject/postPage";


function getRowDataPool(array) {
	const max = array.length - 1;
	const pos = Math.floor(Math.random() * max);
	return array[pos];
}

let postPage = new PostPage();

describe("Post with apriori data", () => {

	let usuariosAdmin;
	let postEmptyTitle;
	let postInvalidTitle;
	let postValidTitle;
	let excerptInvalid;
	let excerptValid;
	let metatitleInvalid;
	let metatitleValid;
	let facebookTitleInvalid;
	let facebookTitleValid;
	let facebookDescriptionInvalid;
	let facebookDescriptionValid;

	before(() => {
		cy.fixture('users').then(users => {
			usuariosAdmin = users.admins;
		});

		cy.fixture('MOCK_DATA_POST').then(posts => {
			postEmptyTitle = getRowDataPool(posts.emptyTitle);
			postInvalidTitle = getRowDataPool(posts.invalidTitle);
			postValidTitle = getRowDataPool(posts.validTitle);
			excerptInvalid = getRowDataPool(posts.excerptInvalid);
			excerptValid = getRowDataPool(posts.excerptValid);
			metatitleInvalid = getRowDataPool(posts.metatitleInvalid);
			metatitleValid = getRowDataPool(posts.metatitleValid);
			facebookTitleInvalid = getRowDataPool(posts.facebookTitleInvalid);
			facebookTitleValid = getRowDataPool(posts.facebookTitleValid);
			facebookDescriptionInvalid = getRowDataPool(posts.facebookDescriptionInvalid);
			facebookDescriptionValid = getRowDataPool(posts.facebookDescriptionValid);
		});
	});

	beforeEach(() => {
		let usuario =  getRowDataPool(usuariosAdmin);
		cy.login(usuario.username, usuario.password);
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
		postPage.btnFilterPublished().click();
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

	it('should edit a draft post and facebook title cannot be more than 300', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(2).click();
		postPage.inputFacebookTitle().clear().type(facebookTitleInvalid.facebookTitle);
		postPage.mainContent().click();
		postPage.inputFacebookTitle().siblings('.response').contains('Facebook Title cannot be longer than 300 characters.');
	});

	it('should facebook title can be less than 300', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(2).click();
		postPage.inputFacebookTitle().clear().type(facebookTitleValid.facebookTitle);
		postPage.mainContent().click();
		postPage.inputFacebookTitle().siblings('.response').should('be.hidden');
	});

	it('should facebook description cannot be more than 500', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(2).click();
		postPage.inputFacebookDescription().clear().type(facebookDescriptionInvalid.facebookDescription);
		postPage.mainContent().click();
		postPage.inputFacebookDescription().siblings('.response').contains('Facebook Description cannot be longer than 500 characters.');
	});

	it('should facebook description can be less than 500', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(2).click();
		postPage.inputFacebookDescription().clear().type(facebookDescriptionValid.facebookDescription);
		postPage.mainContent().click();
		postPage.inputFacebookDescription().siblings('.response').should('be.hidden');
	});

	afterEach(() => {
		cy.closeDashBoardSession();
	});
});

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from failing the test
	return false
})