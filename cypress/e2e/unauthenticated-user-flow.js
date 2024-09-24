import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am not logged in', () => {
    cy.window().then((win) => {
        expect(win.localStorage.getItem('session')).to.be.null;
    });
});

When('I visit the home page', () => {
    cy.visit('/');
});

Then('I should see a login link', () => {
    cy.get('#links').should('contain', 'Login');
});

When('I click the login link', () => {
    cy.get('#links').contains('Login').click();
});

Then('I should be navigated to the login page', () => {
    cy.url().should('include', '/login');
    cy.get('h1').should('contain', 'Login');
});

When('I visit the dashboard page', () => {
    cy.visit('/dashboard.html');
});

Then('I should be redirected to the login page', () => {
    cy.url().should('include', '/login');
    cy.get('h1').should('contain', 'Login');
});
