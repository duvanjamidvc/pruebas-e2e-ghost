/// <reference types="cypress" />

Cypress.on("uncaught:exception", (err, a) => {
	return false;
});

let usuarios;
describe("Pages aleatorios", () => {
	before(() => {
		cy.fixture("users").then((users) => {
			usuarios = users;
		});
	});

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
		cy.wait(1000);
		cy.GoCreatePage();
	});
	it("Page Excerpt cannot be longer than 300 characters.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newExcerpt: cy.faker.lorem.sentence(100),
		};
		cy.CreatePageExcerpt(data.newTittle, data.newExcerpt);
		cy.publishPage();
		cy.get("button").should("contain", "Retry");
	});
	it("Page Excerpt contain less than 300 characters.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newExcerpt: cy.faker.lorem.sentence(5),
		};
		cy.CreatePageExcerpt(data.newTittle, data.newExcerpt);
		cy.publishPage();
		cy.get(".gh-publishmenu-footer").should("contain", "Published");
	});
	it("Page Publish date cannot be Invalid.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newDate: cy.faker.lorem.sentence(100),
		};
	});
	it("Page Publish date must be format YYYY-MM-DD.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newDate: cy.faker.lorem.sentence(100),
		};
	});
	it("Page Canonical URL cannot be longer than 2000 characters.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newUrl: cy.faker.lorem.sentence(100),
		};
	});
	it("Page Canonical URL contain less than 2000 characters and valid.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newUrl: cy.faker.lorem.sentence(100),
		};
	});
	it("Page Canonical URL cannot be invalid.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
			newUrl: cy.faker.lorem.sentence(100),
		};
	});
	it("Page Tittle contain less than 250 characters.", () => {
		let data = {
			newTittle: cy.faker.lorem.word(),
		};
	});
	it("Page Tittle cannot be longer than 250 characters.", () => {
		let data = {
			newTittle: cy.faker.lorem.word()
		};
	});
	it("Page Excerpt contain text", () => {
		let data = {
			newTittle: cy.faker.lorem.word()
		};
	});
	it("Page Excerpt cannot be blank page.", () => {
		let data = {
		};
	});


	after(function () {
		cy.closeDashBoardSession();
	});
});
