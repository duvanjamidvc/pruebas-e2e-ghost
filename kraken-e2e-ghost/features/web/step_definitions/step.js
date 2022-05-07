const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;
const faker = require('@faker-js/faker/locale/de');

When('I login {kraken-string} {kraken-string}', async function (email, password) {
    let elementEmail = await this.driver.$('#ember7');
    await elementEmail.setValue(email);
    let elementPassword = await this.driver.$('#ember9');
    await elementPassword.setValue(password);
    let elementBtn = await this.driver.$('#ember11');
    return await elementBtn.click();
});

When('I click posts', async function () {
    let element = await this.driver.$('a[href="#/posts/"]');
    return await element.click();
});

When('I click new post', async function () {
    let element = await this.driver.$('.view-actions > a[href="#/editor/post/"]');
    return await element.click();
});

When('I write title a post', async function () {
    let element = await this.driver.$('textarea[autofocus]');
    return await element.setValue(faker.name.title());
});

When('I publish a post', async function () {
    let elementPrev = await this.driver.$('.settings-menu-toggle');
    await elementPrev.click();
    let element = await this.driver.$('.gh-publishmenu .gh-publishmenu-trigger');
    await element.click();
    let btnPublish = await this.driver.$('.gh-publishmenu-button');
    return await btnPublish.click();
});

When('I publish a post and verify', async function () {
    let elementPrev = await this.driver.$('.settings-menu-toggle');
    await elementPrev.click();
    let element = await this.driver.$('.gh-publishmenu .gh-publishmenu-trigger');
    await element.click();
    let btnPublish = await this.driver.$('.gh-publishmenu-button');
    await btnPublish.click();
    await wait(3);
    let elementUrl = await this.driver.$('.post-view-link');
    await elementUrl.click();
    await wait(3);
    await this.driver.closeWindow();
    await wait(3);
    let back = await this.driver.$('a[href="#/posts/"]');
    return await back.click();
});

When('I click an exist post', async function () {
    let element = await this.driver.$$('span.gh-content-status-published');
    return await element[0].click();
});

When('I write content of post', async function () {
    let element = await this.driver.$('.koenig-editor__editor-wrapper');
    await element.click();
    return await element.setValue(faker.lorem.sentence());
});

When('I click members', async function () {
    let element = await this.driver.$('a[href="#/members/"]');
    return await element.click();
});

When('I click new member', async function () {
    let element = await this.driver.$('.view-actions-top-row > a[href="#/members/new/"]');
    return await element.click();
});

var idMember = '';
When('I create member', async function () {
    let inputName = await this.driver.$('#member-name');
    await inputName.setValue(faker.name.findName());

    let emailName = await this.driver.$('#member-email');
    await emailName.setValue(faker.internet.email());

    let btnSave = await this.driver.$('.view-actions > button');
    await btnSave.click();
    await wait(3);

    let url = await this.driver.getUrl();
    let urlSplit = url.split('/');
    idMember = urlSplit.pop()

    let btnBack = await this.driver.$('.gh-canvas-title > a');
    return await btnBack.click();
});

When('I validate exist member', async function () {
    let btnMember = await this.driver.$(`a[href*="${idMember}"]`);
    await btnMember.click();
});

When('I edit a member', async function () {
    let inputName = await this.driver.$('#member-name');
    await inputName.setValue(faker.name.findName());

    let emailName = await this.driver.$('#member-email');
    await emailName.setValue(faker.internet.email());

    let btnSave = await this.driver.$('.view-actions > button');
    await btnSave.click();
    await wait(3);

    let btnBack = await this.driver.$('.gh-canvas-title > a');
    return await btnBack.click();
})

When('I delete a member', async function () {
    let btnSettings = await this.driver.$('.view-actions > .dropdown > button');
    await btnSettings.click();

    let btnDelete = await this.driver.$('.gh-member-actions-menu > li:last-child > button');
    await btnDelete.click();

    await wait(3);

    let btnConfirm = await this.driver.$('.modal-footer .gh-btn.gh-btn-red.gh-btn-icon.ember-view');
    return await btnConfirm.click();
});

When('I change state to draft', async function () {
    let element = await this.driver.$('.gh-publishmenu .gh-publishmenu-trigger');
    await element.click();
    let btnUnpublish = await this.driver.$('.gh-publishmenu-radio:not(.active)');
    await btnUnpublish.click();
    let btnUpdate = await this.driver.$('.gh-publishmenu-button');
    return await btnUpdate.click();
});

When('I verify post state is draft', async function () {
    let url = await this.driver.getUrl();
    let urlSplit = url.split('/');
    let idMember = urlSplit.pop()
    let back = await this.driver.$('a[href="#/posts/"]');
    await back.click();
    return await this.driver.$(`a[href*="${idMember}"] .items-center .gh-content-status-draft`);
});

When('I click pages', async function () {
    let element = await this.driver.$('a[href="#/pages/"]');
    return await element.click();
});

When('I click new page', async function () {
    let element = await this.driver.$('.view-actions > a[href="#/editor/page/"]');
    return await element.click();
});

When('I write title a page', async function () {
    let element = await this.driver.$('textarea[autofocus]');
    return await element.setValue(faker.name.title());
});

When('I publish a page and verify', async function () {
    let elementPrev = await this.driver.$('.settings-menu-toggle');
    await elementPrev.click();
    let elementView = await  this.driver.$('.gh-view');
    await elementView.click();
    let element = await this.driver.$('.gh-publishmenu .gh-publishmenu-trigger');
    await element.click();
    let btnPublish = await this.driver.$('.gh-publishmenu-button');
    await btnPublish.click();
    await wait(3);
    let elementUrl = await this.driver.$('.post-view-link');
    await elementUrl.click();
    await wait(3);
    await this.driver.closeWindow();
    await wait(3);
    let back = await this.driver.$('a[href="#/pages/"]');
    return await back.click();
});

When('I click an exist page', async function () {
    let element = await this.driver.$$('span.gh-content-status-published');
    return await element[0].click();
});

When('I write content of page', async function () {
    let element = await this.driver.$('.koenig-editor__editor-wrapper');
    await element.click();
    return await element.setValue(faker.lorem.sentence());
});

When('I verify page state is draft', async function () {
    let url = await this.driver.getUrl();
    let urlSplit = url.split('/');
    let idMember = urlSplit.pop()
    let back = await this.driver.$('a[href="#/pages/"]');
    await back.click();
    return await this.driver.$(`a[href*="${idMember}"] .items-center .gh-content-status-draft`);
});

When('I click profile', async  function () {
    let element = await this.driver.$('.gh-user-avatar');
    await element.click();
    let btnProfile = await this.driver.$('a[href*="#/settings/staff"]');
    return await btnProfile.click();
})

var userName = faker.name.findName();
When('I write full name', async  function () {
    let element = await this.driver.$('#user-name');
    return await element.setValue(userName);
});

When('I click save config', async  function () {
    let element = await this.driver.$('.view-actions .gh-btn');
    return await element.click();
});

When('I verify name changed', async  function () {
    let element = await this.driver.$('.gh-user-name');
    let elementUserName = await element.getText();
    expect(elementUserName).to.equal(userName);
});

When('I change password {kraken-string} {kraken-string}', async  function (passwordOld, passwordNew) {
    let elementUserPasswordOld = await this.driver.$('#user-password-old');
    await elementUserPasswordOld.setValue(passwordOld);

    let elementUserPasswordNew = await this.driver.$('#user-password-new');
    await elementUserPasswordNew.setValue(passwordNew);

    let elementUserPasswordNewVerification = await this.driver.$('#user-new-password-verification');
    await elementUserPasswordNewVerification.setValue(passwordNew);

    let btnChangePassword = await this.driver.$('.button-change-password');
    await btnChangePassword.click();
})

When ('I Sign out', async function() {
    let element = await this.driver.$('.gh-user-avatar');
    await element.click();
    let btnProfile = await this.driver.$('.user-menu-signout');
    await btnProfile.click();
})

function wait(seconds) {
    return new Promise(function (r) { return setTimeout(r, 1000 * seconds); })
}

When('I click Tags', async function () {
    let element = await this.driver.$('a[href="#/tags/"]');
    return await element.click();
});

When('I click new Tag', async function () {
    let element = await this.driver.$('section.view-actions>a[href="#/tags/new/"]');
    return await element.click();
});

var nameTag = '';
When('I create Tag', async function () {
    let inputName = await this.driver.$('#tag-name');
    nameTag = faker.commerce.productAdjective();
    await inputName.setValue(nameTag);

    let colorTag = await this.driver.$('input[name="accent-color"]');
    await colorTag.setValue(faker.datatype.hexaDecimal(8).split("0x")[1]);

    let btnSave = await this.driver.$('.gh-canvas-header > .gh-canvas-header-content > .view-actions ');
    await btnSave.click();
    await wait(3);


    let btnBack = await this.driver.$('.gh-canvas-title > a');
    return await btnBack.click();
});

Then('I validate exist Tag', async function () {
    let btnTag = await this.driver.$(`a[href="#/tags/${nameTag.toLowerCase()}/"]`);
    await btnTag.click();
    expect(await this.driver.getUrl()).to.include(`/${nameTag.toLowerCase()}`);
});

const descEdit = faker.lorem.paragraph();
When('I edit a tag', async function () {
    let btnTag = await this.driver.$(`a[href="#/tags/${nameTag.toLowerCase()}/"]`);
    await btnTag.click();
    let descriptionTag = await this.driver.$('#tag-description');
    await descriptionTag.setValue(descEdit);
    let btnSave = await this.driver.$('.gh-canvas-header > .gh-canvas-header-content > .view-actions ');
    await btnSave.click();
    await wait(3);
    let btnBack = await this.driver.$('.gh-canvas-title > a');
    return await btnBack.click();
});

When('I validate edit Tag', async function () {
    let btnTag = await this.driver.$(`a[href="#/tags/${nameTag.toLowerCase()}/"]`);
    await btnTag.click();
});