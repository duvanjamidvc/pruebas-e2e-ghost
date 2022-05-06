const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;
const faker = require('@faker-js/faker/locale/de');

When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('#ember7');
    return await element.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('#ember9');
    return await element.setValue(password);
});

When('I click login', async function () {
    let element = await this.driver.$('#ember11');
    return await element.click();
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
    return await element.setValue(userName);
});

When('I verify name changed', async  function () {
    let element = await this.driver.$('.gh-user-name');
    let elementUserName = await element.getText();
    expect(elementUserName).to.equal(userName);
});

function wait(seconds) {
    return new Promise(function (r) { return setTimeout(r, 1000 * seconds); })
}


