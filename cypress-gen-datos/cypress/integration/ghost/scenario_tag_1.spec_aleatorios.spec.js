/// <reference types="cypress" />

let usuarios;
let tagInfo;
describe("Tag aleatorios", () => {
	before(() => {
		cy.fixture("users").then((users) => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.wait(1000);
		cy.goToNewTag();
	});

	it("Tag color is not number", () => {
		let data ={
			newColor:cy.faker.random.number(3),
			newName: cy.faker.lorem.word()
		};
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

	it("Tag color is not letters", () => {
		const newColor = cy.faker.random.word();
		const newName = cy.faker.lorem.word();
		cy.NewTagNameColor(newName, newColor);
		cy.get("p").should(
			"contain",
			"The colour should be in valid hex format"
		);
		cy.get("button").should("contain", "Retry");
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(".modal-footer > .gh-btn-red > span").click();
	});

	it("Tag color must have correct hex", () => {
		const newColor = cy.faker.datatype.hexaDecimal(8);
		const newName = cy.faker.lorem.word();
		cy.NewTagNameColor(newName, newColor);
		cy.get("p").should(
			"contain",
			"The colour should be in valid hex format"
		);
		cy.get("button").should("contain", "Retry");
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(".modal-footer > .gh-btn-red > span").click();
	});

	it("Tag color must have correct hex", () => {
		const newColor = cy.faker.datatype.hexaDecimal(8).split("0x")[1];
		const newName = cy.faker.lorem.word();
		cy.NewTagNameColor(newName, newColor);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.get('a[href="#/tags/' + newName.toLowerCase() + '/"]').should(
			"contain",
			newName
		);
		cy.deleteTag(newName);
		cy.wait(1000);
	});

	it("Tag names cannot be longer than 191 characters.", () => {
		const newName = cy.faker.lorem.paragraphs();
		cy.NewTagName(newName);
		cy.get("p").should(
			"contain",
			"Tag names cannot be longer than 191 characters."
		);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(".modal-footer > .gh-btn-red > span").click();
	});

	it("Tag names contain less than 191 characters.", () => {
		const newName = cy.faker.lorem.word();
		cy.NewTagName(newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.get('a[href="#/tags/' + newName.toLowerCase() + '/"]').should(
			"contain",
			newName
		);
		cy.deleteTag(newName);
		cy.wait(1000);
	});

	it("Tag slug cannot be longer than 191 characters.", () => {
		const newSlug = cy.faker.lorem.paragraphs();
		const newName = cy.faker.lorem.word();
		cy.NewTagSlug(newSlug, newName);
		cy.get("button").should("contain", "Retry");
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(".modal-footer > .gh-btn-red > span").click();
	});

	it("Tag slug contain less than 191 characters.", () => {
		const newSlug = cy.faker.lorem.word();
		const newName = cy.faker.lorem.word();
		cy.NewTagSlug(newSlug, newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(
			'a[href="#/tags/' +
				newName.toLowerCase() +
				newSlug.toLowerCase() +
				'/"]'
		).should("contain", newName);
		cy.wait(1000);
		cy.deleteTag(newName.toLowerCase() + newSlug.toLowerCase());
	}); 

 	it("Tag Description cannot be longer than 500 characters.", () => {
		const newName = cy.faker.lorem.word();
		const newDescription = cy.faker.lorem.sentence(150);
		cy.NewTagDescription(newDescription, newName);
		cy.get("button").should("contain", "Retry");
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(".modal-footer > .gh-btn-red > span").click();
	}); 

	it("Tag Description contain less than 500 characters.", () => {
		const newName = cy.faker.lorem.word();
		const newDescription = cy.faker.lorem.paragraph();
		cy.NewTagDescription(newDescription, newName);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.get('a[href="#/tags/' + newName.toLowerCase() + '/"]').should(
			"contain",
			newName
		);
		cy.deleteTag(newName);
		cy.wait(1000);
	});

	afterEach(() => {
		cy.closeDashBoardSession();
	});
});

Cypress.on("uncaught:exception", (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false;
});
