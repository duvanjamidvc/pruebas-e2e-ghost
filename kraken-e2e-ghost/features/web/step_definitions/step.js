const { Given, When, Then } = require('@cucumber/cucumber');


When('I enter email {kraken-string}', async function (email) {

    let element = await this.driver.$('#ember7');

    return await element.setValue(email);

});

When('I enter password {kraken-string}', async function (password) {

    let element = await this.driver.$('#ember9');

    return await element.setValue(password);

});


When('I click login', async function() {

    let element = await this.driver.$('#ember11');

    return await element.click();

});

When('I click posts', async function() {

    let element = await this.driver.$('#ember340');

    return await element.click();

});
