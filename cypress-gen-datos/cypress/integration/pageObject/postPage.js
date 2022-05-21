class PostPage {
	navegateToDashboard() {
		const url = Cypress.config('baseUrlDashBoard');
		cy.visit(url);
	}
	
	createPostLinkLeftMenu() {
		return cy.get('.gh-nav-list.gh-nav-manage li a[href="#/editor/post/"]');
	}

    inputTile() {
        return cy.get("textarea.gh-editor-title");
    }

    inputContent() {
        return cy.get("article.koenig-editor");
    }

    btnPublishMenu() {
        return cy.get(".gh-publishmenu-trigger");
    }

    btnPublish() {
        return cy.get("button.gh-publishmenu-button");
    }

    mainContent() {
        return cy.get(".gh-main");
    }

    btnBackPost() {
        return cy.get(".gh-editor-back-button");
    }

    btnFilterPublished() {
        return cy.get('a[href="#/posts/?type=published"]');
    }

    titleOfFirstElementOfList() {
        return cy.get(".posts-list .gh-posts-list-item .gh-post-list-title .gh-content-entry-title");
    }

    draftPostLinkLeftMenu() {
        return cy.get('a[href="#/posts/?type=draft"]');
    }

    elementOfList() {
        return cy.get(".posts-list .gh-posts-list-item");
    }

    alert() {
        return cy.get(".gh-alert.gh-alert-red");
    }

    settingMenu() {
        return cy.get('.settings-menu-toggle');
    }

    inputExcerpt() {
        return cy.get('.settings-menu-content .form-group .post-setting-custom-excerpt');
    }

    metadata() {
        return cy.get('.nav-list-block .nav-list-item:first-child').first();
    }

    inputMetatitle() {
        return cy.get('.settings-menu-content input[name="post-setting-meta-title"]')
    }

    inputMetaDescription() {
        return cy.get('.settings-menu-content textarea[name="post-setting-meta-description"]')
    }

    wait(time) {
        return cy.wait(time);
    }
	
}

export default PostPage;