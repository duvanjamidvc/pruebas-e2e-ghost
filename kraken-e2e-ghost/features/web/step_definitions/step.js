const { Given, When, Then } = require('@cucumber/cucumber');


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

    return await element.setValue('Nuevo post');

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
    let element = await this.driver.$('.view-container .posts-list .gh-posts-list-item .gh-post-list-status .items-center .gh-content-status-published:nth-child(1)');
    return await element.click();
});

When('I write content of post', async function () {
    let element = await this.driver.$('.koenig-editor__editor-wrapper');
    await element.click();
    return await element.setValue('Contenido del post 1');
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
    await inputName.setValue('Usuario prueba');

    let emailName = await this.driver.$('#member-email');
    await emailName.setValue('prueba@prueba.com');

    let btnSave = await this.driver.$('.view-actions > button');
    await btnSave.click();
    await wait(3);

    let url = await this.driver.getUrl();

    let urlSplit = url.split('/');
    idMember = urlSplit.pop()

    let btnBack = await this.driver.$('.gh-canvas-title > a');
    return await btnBack.click();

});

When('I validate the creation of member', async function () {
    let btnMember = await this.driver.$(`a[href*="${idMember}"]`);
    await btnMember.click();
});

When('I delete a member', async function () {
    let btnSettings = await this.driver.$('.view-actions > .dropdown > button');
    await btnSettings.click();

    let btnDelete = await this.driver.$('.gh-member-actions-menu > li:last-child > button');
    await btnDelete.click();

    await wait(3);

    let btnConfirm = await this.driver.$('.modal-footer .gh-btn.gh-btn-red.gh-btn-icon.ember-view');
    return await btnConfirm.click();
});

When('I change post state to draft', async function () {
    let element = await this.driver.$('.gh-publishmenu .gh-publishmenu-trigger');
    await element.click();
    let btnUnpublish = await this.driver.$('.gh-publishmenu-radio:not(.active)');
    await btnUnpublish.click();
    let btnUpdate = await this.driver.$('.gh-publishmenu-button');
    return await btnUpdate.click();
});

When('I verify post state is draft', async function () {
    let postUrl = await this.driver.getUrl();
    let back = await this.driver.$('a[href="#/posts/"]');
    await back.click();
    return await this.driver.$(`.view-container .posts-list .gh-posts-list-item > a[href="${postUrl}"] .items-center .gh-content-status-draft`);
});

function wait(seconds) {
    return new Promise(function (r) { return setTimeout(r, 1000 * seconds); })
}


