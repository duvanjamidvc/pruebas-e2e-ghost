class LoginPage {
	navegate() {
		const url = Cypress.config('baseUrlDashBoard');
		cy.visit(url);
	}
	
	inputEmail() {
		return cy.get('[name="identification"]');
	}
	inputPassword() {
		return cy.get('[name="password"]');
	}
	
	submit() {
		return cy.get('[type="submit"]');
	}
	
	mainError() {
		return cy.get('.main-error');
	}
	
}

export default LoginPage;