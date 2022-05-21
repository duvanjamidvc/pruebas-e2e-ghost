import ProfilePage from "../pageObject/profilePage";

function getRowDataPool(array){
	const max = array.length-1;
	const pos = Math.floor(Math.random() * max);
	return array[pos];
}

let profilePage= new ProfilePage();

Cypress.on('uncaught:exception', (err, a) => {
	return false;
});

describe("profile data a priori", () => {
	let profileDataRow;
	let usuarios;
	let profileDataEmailLength200;
	
	before(() => {
		cy.fixture("profile").then((data)=>  {
			profileDataRow = getRowDataPool(data.profileData);
			profileDataEmailLength200 = getRowDataPool(data.profileDataEmailLength200);
		});

		cy.fixture('users').then(users => {
			usuarios = users;
		});
	})

	beforeEach(() => {
		cy.login(usuarios.admins[0].username, usuarios.admins[0].password);
	});

	it('should enter a name', () => {
		profilePage.navegate();
		profilePage.inputUser().clear();
		profilePage.inputEmail().type(profileDataRow.email);
		profilePage.inputLocation().type(profileDataRow.location);
		profilePage.inputWebSite().type(profileDataRow.website);
		profilePage.inputFacebook().type(profileDataRow.facebook);
		profilePage.inputTwitter().type(profileDataRow.twitter);
		profilePage.inputBio().type(profileDataRow.bio);
		profilePage.errorMessage().contains('Please enter a name.');
	});

	it('should supply a valid email address: email empty', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataRow.user);
		profilePage.inputEmail().clear();
		profilePage.inputLocation().type(profileDataRow.location);
		profilePage.inputWebSite().type(profileDataRow.website);
		profilePage.inputFacebook().type(profileDataRow.facebook);
		profilePage.inputTwitter().type(profileDataRow.twitter);
		profilePage.inputBio().type(profileDataRow.bio);
		profilePage.errorMessage().contains('Please supply a valid email address');
	});

	it('should supply a valid email address: bad format', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataRow.user);
		profilePage.inputEmail().type(profileDataRow.email).blur();
		profilePage.errorMessage().contains('Please supply a valid email address');
		profilePage.inputLocation().type(profileDataRow.location);
		profilePage.inputWebSite().type(profileDataRow.website);
		profilePage.inputFacebook().type(profileDataRow.facebook);
		profilePage.inputTwitter().type(profileDataRow.twitter);
		profilePage.inputBio().type(profileDataRow.bio);
	});

	it('should supply a valid email address: length 200', () => {
		profilePage.navegate();
		profilePage.inputUser().type(profileDataEmailLength200.user);
		profilePage.inputEmail().type(profileDataEmailLength200.email).blur();
		profilePage.errorMessage().contains(/Email is too long|Please supply a valid email address/g);
		profilePage.inputLocation().type(profileDataEmailLength200.location);
		profilePage.inputWebSite().type(profileDataEmailLength200.website);
		profilePage.inputFacebook().type(profileDataEmailLength200.facebook);
		profilePage.inputTwitter().type(profileDataEmailLength200.twitter);
		profilePage.inputBio().type(profileDataEmailLength200.bio);
	});
	
	afterEach(function () {
		cy.closeDashBoardSession();
	});
})