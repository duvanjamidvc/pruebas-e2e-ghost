const { Given, When, Then } = require("@cucumber/cucumber");
const expect = require("chai").expect;
const faker = require("@faker-js/faker/locale/de");

When(
	"I login {kraken-string} {kraken-string}",
	async function (email, password) {
		let elementEmail = await this.driver.$("#ember7");
		await elementEmail.setValue(email);
		let elementPassword = await this.driver.$("#ember9");
		await elementPassword.setValue(password);
		let elementBtn = await this.driver.$("#ember11");
		return await elementBtn.click();
	}
);

When("I click posts", async function () {
	let element = await this.driver.$('a[href="#/posts/"]');
	return await element.click();
});

When("I click new post", async function () {
	let element = await this.driver.$(
		'.view-actions > a[href="#/editor/post/"]'
	);
	return await element.click();
});

const tittleNewPost = faker.name.title();
When("I write title a post", async function () {
	let element = await this.driver.$("textarea[autofocus]");
	return await element.setValue(tittleNewPost);
});

When("I publish a post", async function () {
	let elementPrev = await this.driver.$(".settings-menu-toggle");
	await elementPrev.click();
	let element = await this.driver.$(
		".gh-publishmenu .gh-publishmenu-trigger"
	);
	await element.click();
	let btnPublish = await this.driver.$(".gh-publishmenu-button");
	return await btnPublish.click();
});

When("I publish a post and verify", async function () {
	let elementPrev = await this.driver.$(".settings-menu-toggle");
	await elementPrev.click();
	let element = await this.driver.$(
		".gh-publishmenu .gh-publishmenu-trigger"
	);
	await element.click();
	let btnPublish = await this.driver.$(".gh-publishmenu-button");
	await btnPublish.click();
	await wait(3);
	let elementUrl = await this.driver.$(".post-view-link");
	await elementUrl.click();
	await wait(3);
	await this.driver.closeWindow();
	await wait(3);
	let back = await this.driver.$('a[href="#/posts/"]');
	return await back.click();
});

When("I click an exist post", async function () {
	let element = await this.driver.$$("span.gh-content-status-published");
	return await element[0].click();
});

When("I write content of post", async function () {
	let element = await this.driver.$(".koenig-editor__editor-wrapper");
	await element.click();
	return await element.setValue(faker.lorem.sentence());
});

When("I click members", async function () {
	let element = await this.driver.$('a[href="#/members/"]');
	return await element.click();
});

When("I click new member", async function () {
	let element = await this.driver.$(
		'.view-actions-top-row > a[href="#/members/new/"]'
	);
	return await element.click();
});

var idMember = "";
When("I create member", async function () {
	let inputName = await this.driver.$("#member-name");
	await inputName.setValue(faker.name.findName());

	let emailName = await this.driver.$("#member-email");
	await emailName.setValue(faker.internet.email());

	let btnSave = await this.driver.$(".view-actions > button");
	await btnSave.click();
	await wait(3);

	let url = await this.driver.getUrl();
	let urlSplit = url.split("/");
	idMember = urlSplit.pop();

	let btnBack = await this.driver.$(".gh-canvas-title > a");
	return await btnBack.click();
});

When("I validate exist member", async function () {
	let btnMember = await this.driver.$(`a[href*="${idMember}"]`);
	await btnMember.click();
});

When("I edit a member", async function () {
	let inputName = await this.driver.$("#member-name");
	await inputName.setValue(faker.name.findName());

	let emailName = await this.driver.$("#member-email");
	await emailName.setValue(faker.internet.email());

	let btnSave = await this.driver.$(".view-actions > button");
	await btnSave.click();
	await wait(3);

	let btnBack = await this.driver.$(".gh-canvas-title > a");
	return await btnBack.click();
});

When("I delete a member", async function () {
	let btnSettings = await this.driver.$(".view-actions > .dropdown > button");
	await btnSettings.click();

	let btnDelete = await this.driver.$(
		".gh-member-actions-menu > li:last-child > button"
	);
	await btnDelete.click();

	await wait(3);

	let btnConfirm = await this.driver.$(
		".modal-footer .gh-btn.gh-btn-red.gh-btn-icon.ember-view"
	);
	return await btnConfirm.click();
});

When("I change state to draft", async function () {
	let element = await this.driver.$(
		".gh-publishmenu .gh-publishmenu-trigger"
	);
	await element.click();
	let btnUnpublish = await this.driver.$(
		".gh-publishmenu-radio:not(.active)"
	);
	await btnUnpublish.click();
	let btnUpdate = await this.driver.$(".gh-publishmenu-button");
	return await btnUpdate.click();
});

When("I verify post state is draft", async function () {
	let url = await this.driver.getUrl();
	let urlSplit = url.split("/");
	let idMember = urlSplit.pop();
	let back = await this.driver.$('a[href="#/posts/"]');
	await back.click();
	return await this.driver.$(
		`a[href*="${idMember}"] .items-center .gh-content-status-draft`
	);
});

When("I click pages", async function () {
	let element = await this.driver.$('a[href="#/pages/"]');
	return await element.click();
});

When("I click new page", async function () {
	let element = await this.driver.$(
		'.view-actions > a[href="#/editor/page/"]'
	);
	return await element.click();
});

When("I write title a page", async function () {
	let element = await this.driver.$("textarea[autofocus]");
	return await element.setValue(faker.name.title());
});

When("I publish a page and verify", async function () {
	let elementPrev = await this.driver.$(".settings-menu-toggle");
	await elementPrev.click();
	let elementView = await this.driver.$(".gh-view");
	await elementView.click();
	let element = await this.driver.$(
		".gh-publishmenu .gh-publishmenu-trigger"
	);
	await element.click();
	let btnPublish = await this.driver.$(".gh-publishmenu-button");
	await btnPublish.click();
	await wait(3);
	let elementUrl = await this.driver.$(".post-view-link");
	await elementUrl.click();
	await wait(3);
	await this.driver.closeWindow();
	await wait(3);
	let back = await this.driver.$('a[href="#/pages/"]');
	return await back.click();
});

When("I click an exist page", async function () {
	let element = await this.driver.$$("span.gh-content-status-published");
	return await element[0].click();
});

When("I write content of page", async function () {
	let element = await this.driver.$(".koenig-editor__editor-wrapper");
	await element.click();
	return await element.setValue(faker.lorem.sentence());
});

When("I verify page state is draft", async function () {
	let url = await this.driver.getUrl();
	let urlSplit = url.split("/");
	let idMember = urlSplit.pop();
	let back = await this.driver.$('a[href="#/pages/"]');
	await back.click();
	return await this.driver.$(
		`a[href*="${idMember}"] .items-center .gh-content-status-draft`
	);
});

When("I click profile", async function () {
	let element = await this.driver.$(".gh-user-avatar");
	await element.click();
	let btnProfile = await this.driver.$('a[href*="#/settings/staff"]');
	return await btnProfile.click();
});

var userName = faker.name.findName();
When("I write full name", async function () {
	let element = await this.driver.$("#user-name");
	return await element.setValue(userName);
});

When("I click save config", async function () {
	let element = await this.driver.$(".view-actions .gh-btn");
	return await element.click();
});

When("I verify name changed", async function () {
	let element = await this.driver.$(".gh-user-name");
	let elementUserName = await element.getText();
	expect(elementUserName).to.equal(userName);
});

When(
	"I change password {kraken-string} {kraken-string}",
	async function (passwordOld, passwordNew) {
		let elementUserPasswordOld = await this.driver.$("#user-password-old");
		await elementUserPasswordOld.setValue(passwordOld);

		let elementUserPasswordNew = await this.driver.$("#user-password-new");
		await elementUserPasswordNew.setValue(passwordNew);

		let elementUserPasswordNewVerification = await this.driver.$(
			"#user-new-password-verification"
		);
		await elementUserPasswordNewVerification.setValue(passwordNew);

		let btnChangePassword = await this.driver.$(".button-change-password");
		await btnChangePassword.click();
	}
);

When("I Sign out", async function () {
	let element = await this.driver.$(".gh-user-avatar");
	await element.click();
	let btnProfile = await this.driver.$(".user-menu-signout");
	await btnProfile.click();
});

function wait(seconds) {
	return new Promise(function (r) {
		return setTimeout(r, 1000 * seconds);
	});
}

When("I click Tags", async function () {
	let element = await this.driver.$('a[href="#/tags/"]');
	return await element.click();
});

When("I click new Tag", async function () {
	let element = await this.driver.$(
		'section.view-actions>a[href="#/tags/new/"]'
	);
	return await element.click();
});

var nameTag = "";
When("I create Tag", async function () {
	let inputName = await this.driver.$("#tag-name");
	nameTag = faker.commerce.productAdjective();
	await inputName.setValue(nameTag);

	let colorTag = await this.driver.$('input[name="accent-color"]');
	await colorTag.setValue(faker.datatype.hexaDecimal(8).split("0x")[1]);

	let btnSave = await this.driver.$(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	);
	await btnSave.click();
	await wait(3);

	let btnBack = await this.driver.$(".gh-canvas-title > a");
	return await btnBack.click();
});

Then("I validate exist Tag", async function () {
	let btnTag = await this.driver.$(
		`a[href="#/tags/${nameTag.toLowerCase()}/"]`
	);
	await btnTag.click();
	expect(await this.driver.getUrl()).to.include(`/${nameTag.toLowerCase()}`);
});

const descEdit = faker.lorem.paragraph();
When("I edit a tag", async function () {
	let btnTag = await this.driver.$(
		`a[href="#/tags/${nameTag.toLowerCase()}/"]`
	);
	await btnTag.click();
	let descriptionTag = await this.driver.$("#tag-description");
	await descriptionTag.setValue(descEdit);
	let btnSave = await this.driver.$(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	);
	await btnSave.click();
	await wait(3);
	let btnBack = await this.driver.$(".gh-canvas-title > a");
	return await btnBack.click();
});

Then("I validate edit Tag", async function () {
	let btnTag = await this.driver
		.$(`a[href="#/tags/${nameTag.toLowerCase()}/"]`)
		.getText();
	expect(btnTag).to.include(descEdit);
});

When("I click in post published menu", async () => {
	let btnTag = await this.driver.$(
		`.gh-nav-view-list > li > a[href="#/posts/?type=published"]`
	);
	await btnTag.click();
});

When("I click in tag filter", async () => {
	let btnTag = await this.driver.$(
		`.gh-contentfilter > .gh-contentfilter-tag`
	);
	await btnTag.click();
});

When("I click in item with tag name", async () => {
	let btnTag = await this.driver.$(`.ember-power-select-option=${nameTag}`);
	await btnTag.click();
});

When("I click in save filter button", async () => {
	let btnTag = await this.driver.$(
		`.view-actions > .gh-contentfilter > .dropdown > .gh-btn-save-view`
	);
	await btnTag.click();
});

When("I type name filter", async () => {
	await this.driver.$(`#view-name`).clearValue();
	await this.driver.$(`#view-name`).setValue(nameTag);
});
When("I select color filter", async () => {
	await this.driver.$(`#view-pink`).parentElement().click();
});

When("I click in save popUp button", async () => {
	let btnTag = await this.driver.$(
		`.modal-content > .modal-footer > .ember-view`
	);
	await btnTag.click();
});
Then("I validate menu filter", async () => {
	let menuItem = await this.driver
		.$(`.gh-nav-view-list`)
		.$(`li`)
		.$(`a[title="${nameTag.trim()}"]`);
	expect(menuItem.isDisplayed());
});

When("I click general settings", async function () {
	let element = await this.driver.$('a[href="#/settings/"]');
	await element.click();
	let subElement = await this.driver.$('a[href="#/settings/general/"]');
	return await subElement.click();
});

const newPassword = faker.internet.password();
When("I set private site", async function () {
	if (!(await this.driver.$('input[name="general[password]').isExisting())) {
		let btnprivate = await this.driver.$(
			"body > div.gh-app > div > main > section > div:nth-child(4) > section > div > div.gh-expandable-header > div.for-switch > label > span"
		);
		await btnprivate.click();
		await wait(3);
	}
	let inputPassword = await this.driver.$('input[name="general[password]');
	await inputPassword.setValue(newPassword);
	let btnSave = await this.driver.$(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	);
	return await btnSave.click();
});

When("I go dashboard", async function () {
	let element = await this.driver.$('a[href="#/dashboard/"]');
	return await element.click();
});

Then("I validate password change", async function () {
	let inputPassword = await this.driver
		.$('input[name="general[password]"]')
		.getValue();
	expect(inputPassword).to.equal(newPassword);
});

Then("I set public site", async function () {
	let btnprivate = await this.driver.$(
		"body > div.gh-app > div > main > section > div:nth-child(4) > section > div > div.gh-expandable-header > div.for-switch > label > span"
	);
	await btnprivate.click();
	let btnSave = await this.driver.$(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	);
	await btnSave.click();
	return await wait(3);
});

const tittle = faker.company.companyName();
const subtittle = faker.company.catchPhrase();
When("I update tittle and subtittle", async function () {
	let btnTandS = await this.driver.$(
		".gh-main-section:nth-child(2) > .gh-expandable > .gh-expandable-block:nth-child(1) > .gh-expandable-header > button "
	);
	await btnTandS.click();
	let tittleInput = await this.driver
		.$("div[class='gh-setting-content-extended']")
		.$(".form-group")
		.$("input[type='text']");
	let subtittleInput = await this.driver
		.$("div[class='gh-setting-content-extended']")
		.$(".description-container")
		.$("input[type='text']");
	await tittleInput.setValue(tittle);
	await subtittleInput.setValue(subtittle);
	let btnSave = await this.driver.$(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	);
	await btnSave.click();
	return await wait(3);
});

Then("I validad update tittle and subtittle", async function () {
	let headerContent = await this.driver.$(".site-header-content").getText();
	expect(headerContent).to.include(tittle);
	expect(headerContent).to.include(subtittle);
});

When("I update tag post", async function () {
	let btnSettings = await this.driver.$(
		".gh-viewport > .gh-main > .settings-menu-toggle > span "
	);
	await btnSettings.click();
	let tagInput = await this.driver.$("#tag-input");
	await tagInput.click();
	let tabSelect = await this.driver.$(
		`.ember-power-select-option=${nameTag}`
	);
	await tabSelect.click();
	await wait(2);
	return await btnSettings.click();
});

Then("I validad set post tag", async function () {
	let postTagNew = await this.driver.$(
		`.gh-content-entry-title=${tittleNewPost}`
	).getText();
	expect(postTagNew).to.include(tittleNewPost);
});
