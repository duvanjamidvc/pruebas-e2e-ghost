class PostPage {
	navegateToDashboard() {
		const url = Cypress.config('baseUrlDashBoard');
		cy.visit(url);
	}
	
	postLinkLeftMenu() {
		return cy.get('.gh-nav-list.gh-nav-manage li a[href="#/editor/post/"]');
	}

    inputTile() {
        return cy.get("textarea.gh-editor-title");
    }

    inputContent() {
        return cy.get("article.koenig-editor");
    }

    btnPublishMenu() {
        cy.get(".gh-publishmenu-trigger");
    }

    wait(time) {
        return cy.wait(time);
    }
	
}

export default PostPage;