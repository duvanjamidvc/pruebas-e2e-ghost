const { Given, When, Then } = require("@cucumber/cucumber");
const expect = require("chai").expect;
const faker = require("@faker-js/faker/locale/de");
const fs = require('fs');

let dir = 'screenShots/';
let countScreenShot = 0;


async function takeScreenShot (self) {
	await self.driver.saveScreenshot(`./${dir}/captura-${countScreenShot}.png`)
	countScreenShot++;
}

When("I active screenshot {string}", async function(folder) {
	dir += folder;
	fs.mkdirSync(dir, {recursive: true});
})

When(
	"I take a screenshot", async function () {
		await this.driver.saveScreenshot(`./${dir}/captura-${countScreenShot}.png`)
		countScreenShot++;
	}
)

When(
	"I login {kraken-string} {kraken-string}",
	async function (email, password) {
		await takeScreenShot(this);
		let elementEmail = await this.driver.$('input[name="identification"]');
		await elementEmail.setValue(email);
		let elementPassword = await this.driver.$('input[name="password"]');
		await elementPassword.setValue(password);
		await takeScreenShot(this);
		let elementBtn = await this.driver.$('button[type="submit"]');
		await elementBtn.click();
		return await takeScreenShot(this);
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
	await takeScreenShot(this);
	await element.click();
	let btnPublish = await this.driver.$(".gh-publishmenu-button");
	return await btnPublish.click();
});

Then("I publish a post and verify", async function () {
	let elementPrev = await this.driver.$(".settings-menu-toggle");
	await elementPrev.click();
	await takeScreenShot(this);
	let element = await this.driver.$(
		".gh-publishmenu .gh-publishmenu-trigger"
	);
	await element.click();
	let btnPublish = await this.driver.$(".gh-publishmenu-button");
	await btnPublish.click();
	await takeScreenShot(this);
	await wait(3);
	let elementUrl = await this.driver.$(".post-view-link");
	await elementUrl.click();
	await takeScreenShot(this);
	await wait(3);
	await this.driver.closeWindow();
	await wait(3);
	await takeScreenShot(this);
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
	await takeScreenShot(this);
	let btnSave = await this.driver.$(".view-actions > button");
	await btnSave.click();
	await takeScreenShot(this);
	await wait(3);
	await takeScreenShot(this);
	let url = await this.driver.getUrl();
	let urlSplit = url.split("/");
	idMember = urlSplit.pop();

	let btnBack = await this.driver.$(".gh-canvas-title > a");
	return await btnBack.click();
});

Then("I validate exist member", async function () {
	let btnMember = await this.driver.$(`a[href*="${idMember}"]`);
	await btnMember.click();
});

Then("I edit a member", async function () {
	let inputName = await this.driver.$("#member-name");
	await inputName.setValue(faker.name.findName());

	let emailName = await this.driver.$("#member-email");
	await emailName.setValue(faker.internet.email());
	
	await takeScreenShot(this);
	
	let btnSave = await this.driver.$(".view-actions > button");
	await btnSave.click();
	await takeScreenShot(this);
	await wait(3);
	await takeScreenShot(this);

	let btnBack = await this.driver.$(".gh-canvas-title > a");
	return await btnBack.click();
});

When("I delete a member", async function () {
	let btnSettings = await this.driver.$(".view-actions > .dropdown > button");
	await btnSettings.click();
	await takeScreenShot(this);
	let btnDelete = await this.driver.$(
		".gh-member-actions-menu > li:last-child > button"
	);
	await btnDelete.click();
	await wait(3);
	await takeScreenShot(this);
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
	await takeScreenShot(this);
	let btnUnpublish = await this.driver.$(
		".gh-publishmenu-radio:not(.active)"
	);
	await btnUnpublish.click();
	await takeScreenShot(this);
	let btnUpdate = await this.driver.$(".gh-publishmenu-button");
	return await btnUpdate.click();
});

Then("I verify post state is draft", async function () {
	let url = await this.driver.getUrl();
	let urlSplit = url.split("/");
	let idMember = urlSplit.pop();
	let back = await this.driver.$('a[href="#/posts/"]');
	await back.click();
	await takeScreenShot(this);
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

var pageTitle;
When('I write title a page', async function () {
	let element = await this.driver.$('textarea[autofocus]');
	pageTitle = faker.name.title();
	return await element.setValue(pageTitle);
});

Then("I publish a page and verify", async function () {
	let elementPrev = await this.driver.$(".settings-menu-toggle");
	await elementPrev.click();
	await takeScreenShot(this);
	let elementView = await this.driver.$(".gh-view");
	await elementView.click();
	await takeScreenShot(this);
	let element = await this.driver.$(
		".gh-publishmenu>.gh-publishmenu-trigger"
	);
	await element.click();
	await takeScreenShot(this);
	let btnPublish = await this.driver.$(".gh-publishmenu-button");
	await btnPublish.click();
	await takeScreenShot(this);
	await wait(3);
	await takeScreenShot(this);
	let elementUrl = await this.driver.$(".post-view-link");
	await elementUrl.click();
	await takeScreenShot(this);
	await wait(3);
	await takeScreenShot(this);
	await this.driver.closeWindow();
	await wait(3);
	let back = await this.driver.$('a[href="#/pages/"]');
	return await back.click();
});

When("I publish a page", async function () {

	await this.driver.$('article.koenig-editor').click();
	await takeScreenShot(this);
	let element = await this.driver.$(
		".gh-publishmenu>.gh-publishmenu-trigger"
	);
	await element.click();
	await wait(3);
	await takeScreenShot(this);
	let btnPublish = await this.driver.$(".gh-publishmenu-button");
	await btnPublish.click();
});

When("I set tag to page", async function () {

	let elementPrev = await this.driver.$(".settings-menu-toggle");
	await elementPrev.click();
	await takeScreenShot(this);
	let elementView = await this.driver.$("#tag-input");
	await elementView.click();
	await wait(4);
	let tagItem = await this.driver.$(`.ember-power-select-option=${nameTag}`);
	await tagItem.click();
});



Then("I validate page with tag", async function () {
	let titlePageItem = await this.driver.$(`.gh-content-entry-title=${pageTitle}`);
	expect(titlePageItem.isDisplayed());

	let tagItemName = await titlePageItem.parentElement().$(`.midgrey-l2=${nameTag}`);
	expect(tagItemName.isDisplayed());

});


Then("I go to page url {kraken-string}", async function (urlBase) {
	let titleLink = pageTitle.replace(/\s/gi, "-").toLowerCase();
	await this.driver.url(`${urlBase}/${titleLink}/`);
	expect(await this.driver.getUrl()).to.include(`/${titleLink}`);
});

When("I click an exist page", async function () {
	let element = await this.driver.$$("span.gh-content-status-published");
	return await element[0].click();
});

When("I write content of page", async function () {
	let element = await this.driver.$(".koenig-editor__editor-wrapper");
	await element.click();
	await takeScreenShot(this);
	return await element.setValue(faker.lorem.sentence());
});

Then("I verify page state is draft", async function () {
	let url = await this.driver.getUrl();
	let urlSplit = url.split("/");
	let idMember = urlSplit.pop();
	let back = await this.driver.$('a[href="#/pages/"]');
	await back.click();
	await takeScreenShot(this);
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

var userName = 'Light Yagami';
When("I write full name", async function () {
	let element = await this.driver.$("#user-name");
	return await element.setValue(userName);
});

When("I click save config", async function () {
	let element = await this.driver.$(".view-actions .gh-btn");
	return await element.click();
});

Then("I verify name changed", async function () {
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
		await takeScreenShot(this)
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
	nameTag = 'Deportes';
	await inputName.setValue(nameTag);

	let colorTag = await this.driver.$('input[name="accent-color"]');
	await colorTag.setValue(000000);
	await takeScreenShot(this);
	let btnSave = await this.driver.$(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	);
	await btnSave.click();
	await takeScreenShot(this);
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
	await takeScreenShot(this);
	let btnSave = await this.driver.$(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	);
	await btnSave.click();
	await wait(3);
	await takeScreenShot(this);
	let btnBack = await this.driver.$(".gh-canvas-title > a");
	return await btnBack.click();
});

Then("I validate edit Tag", async function () {
	let btnTag = await this.driver
		.$(`a[href="#/tags/${nameTag.toLowerCase()}/"]`)
		.getText();
	expect(btnTag).to.include(descEdit);
});

When("I click a Tag", async function () {
	let btnTag = await this.driver.$(`a[href="#/tags/${nameTag.toLowerCase()}/"]`);
	return await btnTag.click();
});

When("I delete a tag", async function () {
	let btnDeleteTag = await this.driver.$('.gh-canvas .gh-btn.gh-btn-red');
	await btnDeleteTag.click();
	let modalDeleteTag = await this.driver.$('.modal-content');
	await modalDeleteTag.click();
	let btnConfirmDeleteTag = await this.driver.$('.modal-content .modal-footer .gh-btn.gh-btn-red');
	return await btnConfirmDeleteTag.click();
});


When('I click in post published menu', async function () {
	let btnTag = await this.driver.$(`.gh-nav-view-list > li > a[href="#/posts/?type=published"]`);
	await btnTag.click();
});

When('I click in tag filter', async function () {
	let btnTag = await this.driver.$(`.gh-contentfilter > .gh-contentfilter-tag`);
	await btnTag.click();
});
When('I click in item with tag name', async function () {
	let btnTag = await this.driver.$(`.ember-power-select-option=${nameTag}`);
	await btnTag.click();
});

When("I click in save filter button", async function () {
	let btnTag = await this.driver.$(
		`.view-actions > .gh-contentfilter > .dropdown > .gh-btn-save-view`
	);
	await btnTag.click();
});

When("I type name filter", async function () {
	await this.driver.$(`#view-name`).clearValue();
	await this.driver.$(`#view-name`).setValue(nameTag);
});
When("I select color filter", async function () {
	await this.driver.$(`#view-pink`).parentElement().click();
});

When("I click in save popUp button", async function () {
	let btnTag = await this.driver.$(
		`.modal-content > .modal-footer > .ember-view`
	);
	await btnTag.click();
});
Then("I validate menu filter", async function () {
	let menuItem = await this.driver
		.$(`.gh-nav-view-list li a[title="${nameTag.trim()}"]`);
	expect(menuItem.isDisplayed());
});

When("I click general settings", async function () {
	let element = await this.driver.$('a[href="#/settings/"]');
	await element.click();
	await takeScreenShot(this);
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
		await takeScreenShot(this);
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
	await takeScreenShot(this);
	let btnSave = await this.driver.$(
		".gh-canvas-header > .gh-canvas-header-content > .view-actions "
	);
	await btnSave.click();
	return await wait(3);
});

const tittle = 'La sociedad de almas';
const subtittle = 'Donde habitan los shinigamis';
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
	await takeScreenShot(this);
	let tagInput = await this.driver.$("#tag-input");
	await tagInput.click();
	await takeScreenShot(this);
	let tabSelect = await this.driver.$(
		`.ember-power-select-option=${nameTag}`
	);
	await tabSelect.click();
	await takeScreenShot(this);
	await wait(2);
	return await btnSettings.click();
});

Then("I validad set post tag", async function () {
	let postTagNew = await this.driver.$(
		`.gh-content-entry-title=${tittleNewPost}`
	).getText();
	expect(postTagNew).to.include(tittleNewPost);
});

When('I click in settings', async function () {
	let element = await this.driver.$('a[href="#/settings/"]');
	return await element.click();
});

When('I click in navigation', async function () {
	let element = await this.driver.$('a[href="#/settings/navigation/"]');
	return await element.click();
});

When('I create link', async function () {

	let title = pageTitle;
	let titleToLink = title.replace(/\s/gi, '-').toLowerCase();

	let elements = await this.driver.$$('#settings-navigation>.gh-blognav-item>.gh-blognav-line>.gh-blognav-label');

	let element = await elements[elements.length - 1].$('input.ember-text-field');
	await element.clearValue();
	await element.setValue(title);

	let linkElements = await this.driver.$$('#settings-navigation>.gh-blognav-item>.gh-blognav-line>.gh-blognav-url');
	let linkElement = await linkElements[linkElements.length - 1].$('input.ember-text-field');
	await linkElement.clearValue();
	await linkElement.setValue(titleToLink);
	await takeScreenShot(this);
	await this.driver.$('.view-actions>button').click();
});

When('I delete last link create', async function () {
	let elements = await this.driver.$$('#settings-navigation>.sortable-objects>.draggable-object>.gh-blognav-item');

	let element = await elements[elements.length - 1]
		.$('.gh-blognav-delete');
	await element.click();
	await this.driver.$('.view-actions>button').click();
});

When('I verify page link', async function () {
	let title = pageTitle;
	let titleToLink = title.replace(/\s/gi, '-').toLowerCase();
	let linkElement = await this.driver.$('div.gh-head-menu>.nav>li>a[href$="/' + titleToLink + '/"]');
	expect(linkElement.isDisplayed());
});

When('I click page by title', async function () {
	let page = await this.driver.$$("section.content-list>ol.gh-list>li.gh-posts-list-item");
	await page[0].click();
});

When('I delete page', async function () {
	//abrimos el menu lateral derecho
	await this.driver.$('.settings-menu-toggle').click();
	await takeScreenShot(this);
	// eliminarmos el post
	await this.driver.$('.settings-menu-delete-button').click();
	await takeScreenShot(this);
	// damos clic en eliminar en el mensaje de confirmacion
	await this.driver.$(' .modal-content > .modal-footer > .ember-view ').click();
});

Then('I verify page link not displayed', async function () {
	let title = pageTitle;
	let titleToLink = title.replace(/\s/gi, '-').toLowerCase();
	let linkElement = await this.driver.$('div.gh-head-menu>.nav>li>a[href$="/' + titleToLink + '/"]');
	expect(!linkElement.isDisplayed());
});



