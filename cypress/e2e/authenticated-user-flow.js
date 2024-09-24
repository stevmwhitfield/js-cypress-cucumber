import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am not logged in', () => {
    cy.window().then((win) => {
        expect(win.localStorage.getItem('session')).to.be.null;
    });
});

When('I visit the login page', () => {
    cy.visit('/login.html');
    cy.get('h1').should('contain', 'Login');
});

When('I submit empty credentials', () => {
    cy.get('button').click();
});

Then('I should see an error message', () => {
    cy.get('#error').should(
        'contain',
        'Please enter your username and password.',
    );
});

When('I submit valid credentials', () => {
    cy.get('#username').type('foobar');
    cy.get('#password').type('password');
    cy.get('button').click();
});

Then('I should be redirected to the dashboard', () => {
    cy.url().should('include', '/dashboard');
});

Then('I should see a greeting message', () => {
    cy.get('#greeting').should('contain', 'foobar');
});

Then('my session should be stored in local storage', () => {
    cy.window().then((win) => {
        const sessionData = JSON.stringify({
            username: 'foobar',
            password: 'password',
        });
        expect(win.localStorage.getItem('session')).to.equal(sessionData);
    });
});

Given('I am logged in', () => {
    cy.login('foobar', 'password');
});

When('I visit the dashboard page', () => {
    cy.visit('/dashboard.html');
});

Then('I should see a logout button on the dashboard page', () => {
    cy.get('button').should('contain', 'Logout');
});

When('I visit the home page', () => {
    cy.visit('/');
});

Then('I should see a logout button on the home page', () => {
    cy.get('button').should('contain', 'Logout');
});

When('I click the logout button', () => {
    cy.get('button').click();
});

Then('I should be redirected to the home page', () => {
    cy.url().should('include', '/');
});

Then('my session should be removed from local storage', () => {
    cy.window().then((win) => {
        expect(win.localStorage.getItem('session')).to.be.null;
    });
});
