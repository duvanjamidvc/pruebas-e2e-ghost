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



	it("MetaTitle sugest  longer valid  than 70 characters", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newMetaTitle:cy.faker.lorem.sentence(30),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(1) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="meta-title"]').type(data.newMetaTitle);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});

	it("MetaTitle sugest  contain less than 70 characters", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newMetaTitle: cy.faker.lorem.sentence(5),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(1) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="meta-title"]').type(data.newMetaTitle);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});

	it("MetaDescription sugest  longer valid  than 156 characters", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newMetaDescription: cy.faker.lorem.sentence(40),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(1) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="meta-description"]').type(data.newMetaDescription);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});

	it("MetaDescription sugest  contain less than 156 characters", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newMetaDescription: cy.faker.lorem.sentence(10),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(1) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="meta-description"]').type(data.newMetaDescription);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});

	it("Canonical URL should be valid", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newUrl: cy.faker.lorem.sentence(10),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(1) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="canonical-url"]').type(data.newUrl);
		cy.NewTagName(data.newName);
		cy.get("button").should("contain", "Retry");
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.wait(1000);
		cy.get(".modal-footer > .gh-btn-red > span").click();
	});

	it("Canonical URL should is valid", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newUrl: cy.faker.internet.url(),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(1) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="canonical-url"]').type(data.newUrl);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});
	it("TwitterTitle sugest  longer valid  than 70 characters", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newTwitterTitle: cy.faker.lorem.paragraph(),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(2) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="twitter-title"]').type(data.newTwitterTitle);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});

	it("TwitterTitle sugest  contain less than 70 characters", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newTwitterTitle: cy.faker.lorem.sentence(5),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(2) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="twitter-title"]').type(data.newTwitterTitle);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});

	it("TwitterDescription sugest  longer valid  than 156 characters", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newTwitterDescription: cy.faker.lorem.sentence(40),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(2) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="twitter-description"]').type(data.newTwitterDescription);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});

	it("TwitterDescription sugest  contain less than 156 characters", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newTwitterDescription: cy.faker.lorem.sentence(10),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(2) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="twitter-description"]').type(data.newTwitterDescription);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});

	it("FacebookTitle sugest  longer valid  than 70 characters", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newFacebookTitle: cy.faker.lorem.sentence(30),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(3) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="og-title"]').type(data.newFacebookTitle);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});

	it("FacebookTitle sugest  contain less than 70 characters", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newFacebookTitle: cy.faker.lorem.sentence(5),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(3) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="og-title"]').type(data.newFacebookTitle);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});

	it("FacebookDescription sugest  longer valid  than 156 characters", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newFacebookDescription: cy.faker.lorem.sentence(40),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(3) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="og-description"]').type(data.newFacebookDescription);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});

	it("FacebookDescription sugest  contain less than 156 characters", () => {
		let data = {
			newName: cy.faker.lorem.word(),
			newFacebookDescription: cy.faker.lorem.sentence(10),
		};
		cy.get(
			".gh-expandable > .gh-expandable-block:nth-child(3) > .gh-expandable-header > .gh-btn > span"
		).click();
		cy.wait(1000);
		cy.get('[id="og-description"]').type(data.newFacebookDescription);
		cy.get(".word-count").should("have.css", "color", "rgb(48, 207, 67)");
		cy.NewTagName(data.newName);
		cy.wait(1000);
		cy.get('a[href="#/tags/"]').parent().first().click();
		cy.deleteTag(data.newName);
	});


	afterEach(() => {
		cy.closeDashBoardSession();
	});
});

Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});

