describe('User flow for unauthenticated users', () => {
    it('loads home page with login link when not logged in', () => {
        cy.visit('/');
        cy.get('#links').should('contain', 'Login');
    });

    it('redirects to login page when user clicks login link', () => {
        cy.visit('/');
        cy.get('#links').contains('Login').click();
        cy.url().should('include', '/login');
    });

    it('redirects to login page when user tries to access dashboard', () => {
        cy.visit('/dashboard.html');
        cy.url().should('include', '/login');
    });
});

describe('User flow for authenticated users', () => {
    const username = 'foobar';
    const password = 'password';

    it('renders error message when user enters empty credentials', () => {
        cy.visit('/login.html');
        cy.get('h1').should('contain', 'Login');
        cy.get('button').click();
        cy.get('#error').should(
            'contain',
            'Please enter your username and password.',
        );
    });

    it('logs in user with valid credentials', () => {
        cy.visit('/login.html');
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('button').click();
        cy.url().should('include', '/dashboard');
        cy.get('#greeting').should('contain', username);
        cy.visit('/');
        cy.get('p').should('contain', `Welcome ${username}`);
        cy.window().then((win) => {
            const sessionData = JSON.stringify({ username, password });
            expect(win.localStorage.getItem('session')).to.equal(sessionData);
        });
    });

    it('renders logout button on dashboard page', () => {
        cy.login(username, password);
        cy.visit('/dashboard.html');
        cy.get('button').should('contain', 'Logout');
    });

    it('renders logout button on home page', () => {
        cy.login(username, password);
        cy.visit('/');
        cy.get('button').should('contain', 'Logout');
    });

    it('redirects to home page when user clicks logout button', () => {
        cy.login(username, password);
        cy.get('button').click();
        cy.url().should('include', '/');
        cy.get('h2').should('contain', 'Get started');
        cy.window().then((win) => {
            expect(win.localStorage.getItem('session')).to.be.null;
        });
    });
});
