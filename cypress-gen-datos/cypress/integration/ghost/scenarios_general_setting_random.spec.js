import GeneralSettingsPage from "../pageObject/generalSettingsPage";

function getRowDataPool(array) {
	const max = array.length - 1;
	const pos = Math.floor(Math.random() * max);
	return array[pos];
}

let generalSettingsPage = new GeneralSettingsPage();

describe("General settings with random data", () => {

	let usuariosAdmin;

	before(() => {
		cy.fixture('users').then(users => {
			usuariosAdmin = users.admins;
		});
	});

	beforeEach(() => {
		let usuario =  getRowDataPool(usuariosAdmin);
		cy.login(usuario.username, usuario.password);
	});

	it('title cannot be more than 150', () => {
		const title = cy.faker.lorem.words(300).substring(0, 152);
		generalSettingsPage.navegateToDashboard();
		generalSettingsPage.btnSettings().click();
		generalSettingsPage.btnGeneralSettings().click();
		generalSettingsPage.expandPublicationInfo().click();
		generalSettingsPage.inputTitle().clear().type(title).blur();
		generalSettingsPage.inputTitle().siblings('.response').contains('Title is too long');
	});

	afterEach(() => {
		cy.closeDashBoardSession();
	});
});

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from failing the test
	return false
})