import PostPage from "../pageObject/postPage";

function getRowDataPool(array){
	const max = array.length-1;
	const pos = Math.round(Math.random() * max);
	return array[pos];
}

let postPage = new PostPage();

describe("Post with random data", () => {

	let usuariosAdmin;

	before(() => {
		cy.fixture('users').then(users => {
			usuariosAdmin = users.admins;
		});
	});

	beforeEach(() => {
		let usuario =  getRowDataPool(usuariosAdmin);
		cy.login(usuario.username, usuario.password);
	});

	it('should do not show message error with meta description empty', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(0).click();
		postPage.inputMetaDescription().clear();
		postPage.mainContent().click();
		postPage.inputMetaDescription().siblings('p').children('.word-count').should('have.css', 'color', 'rgb(48, 207, 67)');
	});

	it('should show message error with meta description invalid length, more than 145', () => {
		const metaDescription = cy.faker.lorem.words(300).substring(0, 147);
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(0).click();
		postPage.inputMetaDescription().clear().type(metaDescription);
		postPage.mainContent().click();
		postPage.inputMetaDescription().siblings('p').children('.word-count').should('have.css', 'color', 'rgb(226, 84, 64)');
	});

	it('should do not show message error with meta description valid length, less than 145', () => {
		const metaDescription = cy.faker.lorem.words(300).substring(0, 143);
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(0).click();
		postPage.inputMetaDescription().clear().type(metaDescription);
		postPage.mainContent().click();
		postPage.inputMetaDescription().siblings('p').children('.word-count').should('have.css', 'color', 'rgb(48, 207, 67)');
	});

	it('should do not show message error with caninical url empty', () => {
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(0).click();
		postPage.inputCanonicalUrl().clear();
		postPage.mainContent().click();
		postPage.inputCanonicalUrl().siblings('.response').should('be.hidden');
	});

	it('should do not show message error with caninical url valid', () => {
		const canonicalUrl = cy.faker.internet.url();
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(0).click();
		postPage.inputCanonicalUrl().clear().type(canonicalUrl);
		postPage.mainContent().click();
		postPage.inputCanonicalUrl().siblings('.response').should('be.hidden');
	});

	it('should do not show message error with caninical url invalid', () => {
		const canonicalUrl = cy.faker.lorem.sentence();
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(0).click();
		postPage.inputCanonicalUrl().clear().type(canonicalUrl);
		postPage.mainContent().click();
		postPage.inputCanonicalUrl().siblings('.response').should('be.visible');
	});

	it("should post can be published with schedule date format YYYY-MM-DD", () => {
		const title = cy.faker.lorem.word();
		const content = cy.faker.lorem.sentence();
		const publishedDate = cy.faker.datatype.datetime().getMonth() + 1;
		const month = (publishedDate > 9 ? publishedDate : "0" + String(publishedDate));
		const date = `${cy.faker.datatype.datetime().getFullYear()}-${month}-${cy.faker.datatype.datetime().getDate()}`;

		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.inputTile().clear().type(title);
		postPage.inputContent().clear().type(content);
		cy.intercept("**/ghost/api/**").as("savePost");
		cy.wait("@savePost")
			.its("response.statusCode")
			.should("be.oneOf", [200, 201]);
		postPage.btnPublishMenu().click();
		postPage.inputPublishDate().clear().type(date);
		postPage.btnPublish().click();
		postPage.wait(1000);
		postPage.mainContent().click();
		postPage.btnBackPost().click();
		postPage.wait(500);
		postPage.schedulePostLinkLeftMenu().click();
		cy.intercept("**/ghost/api/**").as("schedulePost");
		cy.wait("@schedulePost")
			.its("response.statusCode")
			.should("be.oneOf", [200, 201]);
		postPage.titleOfFirstElementOfList().contains(title);
	});

	it("should post cannot be published with schedule date format YYYY-MM-DD invalid", () => {
		const title = cy.faker.lorem.word();
		const content = cy.faker.lorem.sentence();
		const publishedDate = cy.faker.datatype.datetime().getMonth() + 1;
		const month = (publishedDate > 9 ? publishedDate : "0" + String(publishedDate));
		const date = `${cy.faker.datatype.datetime().getFullYear()}-${month}-${cy.faker.datatype.datetime().getDate()}${cy.faker.random.number(1)}`;

		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.inputTile().clear().type(title);
		postPage.inputContent().clear().type(content);
		cy.intercept("**/ghost/api/**").as("savePost");
		cy.wait("@savePost")
			.its("response.statusCode")
			.should("be.oneOf", [200, 201]);
		postPage.btnPublishMenu().click();
		postPage.inputPublishDate().clear().type(date);
		postPage.btnPublish().click();
		postPage.wait(1000);
		postPage.errorPublishDate().contains('Invalid');
	});

	it('should post cannot be published with schedule hour empty', () => {
		const title = cy.faker.lorem.word();
		const content = cy.faker.lorem.sentence();
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.inputTile().clear().type(title);
		postPage.inputContent().clear().type(content);
		cy.intercept("**/ghost/api/**").as("savePost");
		cy.wait("@savePost")
			.its("response.statusCode")
			.should("be.oneOf", [200, 201]);
		postPage.btnPublishMenu().click();
		postPage.inputPublishHour().clear();
		postPage.btnPublish().click();
		postPage.wait(300);
		postPage.errorPublishDate().contains('Must be in format');
	});

	it('should post cannot be published with schedule hour invalid', () => {
		const title = cy.faker.lorem.word();
		const content = cy.faker.lorem.sentence();
		const publishDate = cy.faker.random.number(4);
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.inputTile().clear().type(title);
		postPage.inputContent().clear().type(content);
		cy.intercept("**/ghost/api/**").as("savePost");
		cy.wait("@savePost")
			.its("response.statusCode")
			.should("be.oneOf", [200, 201]);
		postPage.btnPublishMenu().click();
		postPage.inputPublishHour().clear().type(publishDate);
		postPage.btnPublish().click();
		postPage.wait(300);
		postPage.errorPublishDate().contains('Must be in format');
	});

	it('should post cannot be published with schedule hour valid', () => {
		const title = cy.faker.lorem.word();
		const content = cy.faker.lorem.sentence();
		const publishDate = cy.faker.datatype.datetime();
		const hour = (publishDate.getHours() < 10) ? `0${publishDate.getHours()}` : publishDate.getHours();
		const minutes = (publishDate.getMinutes() < 10) ? `0${publishDate.getMinutes()}` : publishDate.getMinutes();
		const publishHour = `${hour}:${minutes}`

		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.inputTile().clear().type(title);
		postPage.inputContent().clear().type(content);
		cy.intercept("**/ghost/api/**").as("savePost");
		cy.wait("@savePost")
			.its("response.statusCode")
			.should("be.oneOf", [200, 201]);
		postPage.btnPublishMenu().click();
		postPage.inputPublishHour().clear().type(publishHour);
		postPage.btnPublish().click();
		postPage.wait(1000);
		postPage.mainContent().click();
		postPage.btnBackPost().click();
		postPage.wait(500);
		postPage.schedulePostLinkLeftMenu().click();
		postPage.titleOfFirstElementOfList().contains(title);
	});

	it('should twitter title cannot be more than 300', () => {
		const twitterTitle = cy.faker.lorem.sentence(100);
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(1).click();
		postPage.inputTwitterTitle().clear().type(twitterTitle);
		postPage.mainContent().click();
		postPage.inputTwitterTitle().siblings('.response').contains('Twitter Title cannot be longer than 300 characters.');
	});

	it('should twitter title can be less than 300', () => {
		const twitterTitle = cy.faker.lorem.sentence(5);
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(1).click();
		postPage.inputTwitterTitle().clear().type(twitterTitle);
		postPage.mainContent().click();
		postPage.inputTwitterTitle().siblings('.response').should('be.hidden');
	});

	it('should twitter description cannot be more than 500', () => {
		const twitterDescription = cy.faker.lorem.sentence(100);
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(1).click();
		postPage.inputTwitterDescription().clear().type(twitterDescription);
		postPage.mainContent().click();
		postPage.inputTwitterDescription().siblings('.response').contains('Twitter Description cannot be longer than 500 characters.');
	});

	it('should twitter description can be less than 500', () => {
		const twitterDescription = cy.faker.lorem.sentence(30);
		postPage.navegateToDashboard();
		postPage.createPostLinkLeftMenu().click();
		postPage.settingMenu().click();
		postPage.metadata().eq(1).click();
		postPage.inputTwitterDescription().clear().type(twitterDescription);
		postPage.mainContent().click();
		postPage.inputTwitterDescription().siblings('.response').should('be.hidden');
	});

	afterEach(() => {
		cy.closeDashBoardSession();
	});
});

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from failing the test
	return false
})