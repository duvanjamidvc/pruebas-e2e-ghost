const { Given, When, Then } = require("@cucumber/cucumber");
const expect = require("chai").expect;
const faker = require("@faker-js/faker/locale/de");
const fs = require('fs');

let dir = './../resemblejs/evidencias/kraken/v3/';
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

When("I click profile", async function () {
	let element = await this.driver.$(".gh-user-avatar");
	await element.click();
	let btnProfile = await this.driver.$('.dropdown-menu > li:nth-child(4) a');
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
		await takeScreenShot(this);
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
	await colorTag.setValue('000000');
	await takeScreenShot(this);
	let btnSave = await this.driver.$(
		".gh-canvas-header > .view-actions "
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
		".gh-canvas-header > .view-actions "
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

When("I click general settings", async function () {
	let element = await this.driver.$('a[href="#/settings/general/"]');
	await element.click();
	return await takeScreenShot(this);
});

const tittle = 'La sociedad de almas';
const subtittle = 'Donde habitan los shinigamis';
When("I update tittle and subtittle", async function () {
	await wait(3);
	let btnTandS = await this.driver.$(
		".view-container .flex-column:nth-child(2) .gh-setting-first .gh-setting-action button"
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
		".gh-canvas-header .view-actions button"
	);
	await btnSave.click();
	return await wait(3);
});

Then("I validad update tittle and subtittle", async function () {
	let headerContent = await this.driver.$(".site-header-content .site-logo").getAttribute('alt');
	let headerContentDescription = await this.driver.$(".site-header-content .site-description").getText();
	expect(headerContent).to.include(tittle);
	expect(headerContentDescription).to.include(subtittle);
});

