const {Given, When, Then} = require('@cucumber/cucumber');


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
    await new Promise(function (r) { return setTimeout(r, 1000 * 3); })
    let elementUrl = await this.driver.$('.post-view-link');
    await elementUrl.click();
});


