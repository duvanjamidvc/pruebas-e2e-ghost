import LoginPage from "../../../../cypress-gen-datos/cypress/integration/pageObject/loginPage";


function getRowDataPool(array){
	const max = array.length-1;
	const pos = Math.floor(Math.random() * max);
	return array[pos];
}

let loginPage = new LoginPage();

describe("Login data a priori", () => {
	beforeEach(function () {
		cy.fixture("login").then((users)=>  {
			this.userValid = getRowDataPool(users.dataValid);
			this.userInvalid = getRowDataPool(users.dataInvalid);
			// this.userEmailInvalid = getRowDataPool(users.emailInvalid);
		});
	})
	it('should login data valid', function () {
		loginPage.navegate();
		loginPage.inputEmail().type(this.userValid.email);
		loginPage.inputPassword().type(this.userValid.password);
		loginPage.submit().click();
		cy.intercept("GET", "**/ghost/**").as("goToDashBoard");
		cy.wait("@goToDashBoard")
			.its("response.statusCode")
			.should("be.oneOf", [200]);
	});
	
	it('should login data invalid', function () {
		loginPage.navegate();
		console.log(console.log(this.userInvalid))
		loginPage.inputEmail().type(this.userInvalid.email);
		loginPage.inputPassword().type(this.userInvalid.password);
		loginPage.submit().click();
		cy.wait(500);
		loginPage.mainError().contains('There is no user with that email address.');
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

