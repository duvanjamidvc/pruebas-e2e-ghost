// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

/// <reference types="Cypress" />


// Alternatively you can use CommonJS syntax:
// require('./commands')
declare namespace Cypress {
	interface Chainable<Subject> {
		/**
		 * Create several Todo items via UI
		 * @example
		 * cy.createDefaultTodos()
		 */
		createDefaultTodos(): Chainable<any>
		/**
		 * Creates one Todo using UI
		 * @example
		 * cy.login('new item')
		 */
		login(username: string, password:string): Chainable<any>
	}
}