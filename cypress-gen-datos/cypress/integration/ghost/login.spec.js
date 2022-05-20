import LoginPage from "../../../../cypress-gen-datos/cypress/integration/pageObject/loginPage";


function getRowDataPool(users){
	const max = users.admins.length-1;
	const pos = Math.floor(Math.random() * max);
	return users.admins[pos];
}

let loginPage = new LoginPage();

describe("Login data", () => {
	before(function () {
		cy.fixture("login").then((users)=>  {
			this.user = getRowDataPool(users);
		});
	})
	it('should login data valid', function () {
		loginPage.navegate();
		loginPage.inputEmail().type(this.user.username);
		loginPage.inputPassword().type(this.user.password);
		loginPage.submit().click();
		cy.intercept("GET", "**/ghost/**").as("goToDashBoard");
		cy.wait("@goToDashBoard")
			.its("response.statusCode")
			.should("be.oneOf", [200]);
	});
});


describe("Login data", () => {
	before(function () {
		cy.fixture("login").then((users)=>  {
			this.user = getRowDataPool(users);
		});
	})
	it('should login data valid', function () {
		loginPage.navegate();
		loginPage.inputEmail().type(this.user.username);
		loginPage.inputPassword().type(this.user.password);
		loginPage.submit().click();
		cy.intercept("GET", "**/ghost/**").as("goToDashBoard");
		cy.wait("@goToDashBoard")
			.its("response.statusCode")
			.should("be.oneOf", [200]);
	});
});

describe("Login data random", () => {
	it('should login data invalid random', function () {
		loginPage.navegate();
		loginPage.inputEmail().type(cy.faker.internet.email());
		loginPage.inputPassword().type(cy.faker.internet.password());
		loginPage.submit().click();
		cy.wait(500);
		loginPage.mainError().contains('There is no user with that email address.');
	});
});

