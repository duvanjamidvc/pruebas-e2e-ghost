class GeneralSettingsPage {
	navegateToDashboard() {
		const url = Cypress.config('baseUrlDashBoard');
		cy.visit(url);
	}
	
	btnSettings() {
		return cy.get('a[href="#/settings/"]');
	}

    btnGeneralSettings() {
        return cy.get('a[href="#/settings/general/"]');
    }

    expandPublicationInfo() {
        return cy.get('.gh-main-section:nth-child(2) > .gh-expandable > .gh-expandable-block:nth-child(1) > .gh-expandable-header > button');
    }

    inputTitle() {
        return cy.get('.gh-expandable .gh-expandable-content .gh-setting-content-extended .form-group:nth-child(1) input');
    }


    wait(time) {
        return cy.wait(time);
    }
	
}

export default GeneralSettingsPage;