/// <reference types="cypress" />

let usuarios;

const myData = {
	getCase: (ID) => {
		return myData.getRamdomRow(myData.datos.find(item => item.id === ID));
	},
	getRamdomRow: (dataArray) => {
		const max = dataArray.length - 1;
		const pos = Math.floor(Math.random() * max);
		return dataArray[pos];
	},
	datos: [
		{
			id: "ESC1",
			url: "/tags-invalid-color-numbers.json",
			data: []
		},
		{
			id: "ESC2",
			url: "/tags-invalid-color-letters.json",
			data: []
		},
		{
			id: "ESC3",
			url: "/tags-invalid-color-hexa.json",
			data: []
		},
		{
			id: "ESC4",
			url: "/tags-invalid-color-hexa-0x.json",
			data: []
		},
		{
			id: "ESC5",
			url: "/tags-invalid-name-longer.json",
			data: []
		},
		{
			id: "ESC6",
			url: "/tags-valid-name.json",
			data: []
		},
		{
			id: "ESC7",
			url: "/tags-invalid-slug-longer.json",
			data: []
		},
		{
			id: "ESC8",
			url: "/tags-valid-slug.json",
			data: []
		},
		{
			id: "ESC9",
			url: "/tags-invalid-description-longer.json",
			data: []
		},
		{
			id: "ESC10",
			url: "/tags-valid-description.json",
			data: []
		}
	]
};


describe("Tags datos  a priori", () => {

	before(() => {
		cy.fixture("users").then((users) => {
			usuarios = users;
		});
		const apiUrl = Cypress.config("apiUrl");
		const apiKey = Cypress.config("apiKey");

		myData.datos.forEach((escenario, index) => {
			cy.log(`Consultado data para el escenario: ${escenario.id}`)
			cy.request(`${apiUrl}${escenario.url}?key=${apiKey}`)
				.then((response) => {
					escenario.data = response.body;
				});
		});

	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.wait(1000);
		cy.goToNewTag();
	});

	/**
	 * ESC1 escenario 1
	 */
	it("ESC1: Tag color is not number", () => {

		let data = myData.getCase('ESC1');

		cy.NewTagNameColor(data.newName, data.newColor);
		cy.get("p").should(
			"contain",
			"The colour should be in valid hex format"
		);
		cy.get("button").should("contain", "Retry");
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(".modal-footer > .gh-btn-red > span").click();
	});

	it("ESC2: Tag color is not letters", () => {
		let data = myData.getCase('ESC2');

		cy.NewTagNameColor(data.newName, data.newColor);
		cy.get("p").should(
			"contain",
			"The colour should be in valid hex format"
		);
		cy.get("button").should("contain", "Retry");
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(".modal-footer > .gh-btn-red > span").click();
	});

	it("ESC3: Tag color must have correct hex validate error", () => {
		let data = myData.getCase('ESC3');

		cy.NewTagNameColor(data.newName, data.newColor);
		cy.get("p").should(
			"contain",
			"The colour should be in valid hex format"
		);
		cy.get("button").should("contain", "Retry");
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(".modal-footer > .gh-btn-red > span").click();
	});

	it("ESC4: Tag color must have correct hex", () => {
		let data = myData.getCase('ESC4');

		cy.NewTagNameColor(data.newName, data.newColor);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.get('a[href="#/tags/' + data.newName.toLowerCase() + '/"]').should(
			"contain",
			data.newName
		);
		cy.deleteTag(data.newName);
		cy.wait(1000);
	});

	it("ESC5: Tag names cannot be longer than 191 characters.", () => {
		let data = myData.getCase('ESC5');
		cy.NewTagName(data.newName);
		cy.get("p").should(
			"contain",
			"Tag names cannot be longer than 191 characters."
		);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(".modal-footer > .gh-btn-red > span").click();
	});

	it("ESC6: Tag names contain less than 191 characters.", () => {
		let data = myData.getCase('ESC6');
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.get('a[href="#/tags/' + data.newName.toLowerCase() + '/"]').should(
			"contain",
			data.newName
		);
		cy.deleteTag(data.newName);
		cy.wait(1000);
	});

	it("ESC7: Tag slug cannot be longer than 191 characters.", () => {
		let data = myData.getCase('ESC7');
		cy.NewTagSlug(data.newSlug, data.newName);
		cy.get("button").should("contain", "Retry");
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(".modal-footer > .gh-btn-red > span").click();
	});

	it("ESC8: Tag slug contain less than 191 characters.", () => {
		let data = myData.getCase('ESC8');

		cy.NewTagSlug(data.newSlug, data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(
			'a[href="#/tags/' +
			data.newName.toLowerCase() +
			data.newSlug.toLowerCase() +
			'/"]'
		).should("contain", data.newName);
		cy.wait(1000);
		cy.deleteTag(data.newName.toLowerCase() + data.newSlug.toLowerCase());
	});

	it("ESC9: Tag Description cannot be longer than 500 characters.", () => {
		let data = myData.getCase('ESC9');
		cy.NewTagDescription(data.newDescription, data.newName);
		cy.get("button").should("contain", "Retry");
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(".modal-footer > .gh-btn-red > span").click();
	});

	it("ESC10: Tag Description contain less than 500 characters.", () => {
		let data = myData.getCase('ESC10');
		cy.NewTagDescription(data.newDescription, data.newName);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.get('a[href="#/tags/' + data.newName.toLowerCase() + '/"]').should(
			"contain",
			data.newName
		);
		cy.deleteTag(data.newName);
		cy.wait(1000);
	});

	afterEach(() => {
		cy.closeDashBoardSession();
	});
});

Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});

