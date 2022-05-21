class TagsPage {
	
	inputTagName() {
		return cy.get('[id="tag-name"]');
	}

	inputTagColor() {
		return cy.get('[name="accent-color"]');
	}

	menuOptionTag() {
		return cy.get('a[href="#/tags/"]');
	}

}

export default TagsPage;