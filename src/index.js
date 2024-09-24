const session = getSession();

updateTitle();
validateSession(session);
renderLogout();

switch (window.location.pathname) {
    case '/':
        home();
        break;
    case '/login':
        login();
        break;
    case '/dashboard':
        dashboard();
        break;
}

// #region FUNCTIONS

/**
 * Append a logout button to the page if the user is logged in.
 */
function renderLogout() {
    if (session && window.location.pathname !== '/login') {
        const $body = document.querySelector('body');
        const $logout = document.createElement('button');

        $logout.textContent = 'Logout';
        $logout.addEventListener('click', onLogout);
        $body.appendChild(document.createElement('br'));
        $body.appendChild($logout);
    }
}

/**
 * Update the page title based on the current path.
 */
function updateTitle() {
    const uri = window.location.pathname;

    let title = uri.split('/').pop();
    title = title.charAt(0).toUpperCase() + title.slice(1);

    if (title) {
        document.title = `${title} - JS + Cypress + Cucumber`;
    } else {
        document.title = 'JS + Cypress + Cucumber';
    }
}

/**
 * Get the user's session from local storage.
 * @returns {Object | null} An object with username and password or null if the user is not logged in.
 */
function getSession() {
    const session = localStorage.getItem('session');

    if (session) {
        return JSON.parse(session);
    }

    return null;
}

/**
 * Redirect the user to the login page if they are not logged in.
 * @param {*} session
 */
function validateSession(session) {
    if (
        !session &&
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/'
    ) {
        window.location.href = '/login';
    }
}

/**
 * Create a session and redirect to dashboard when credentials are valid.
 * @param {*} event
 */
function onLogin(event) {
    event.preventDefault();

    const $username = document.getElementById('username');
    const $password = document.getElementById('password');
    const $error = document.getElementById('error');
    const username = $username.value;
    const password = $password.value;

    if (!username || !password) {
        $error.textContent = 'Please enter your username and password.';
        return;
    }

    const session = { username, password };

    localStorage.setItem('session', JSON.stringify(session));
    window.location.href = '/dashboard';
}

/**
 * Remove the user's session and redirect to home.
 * @param {*} event
 */
function onLogout(event) {
    event.preventDefault();

    localStorage.removeItem('session');
    window.location.href = '/';
}

/**
 * Home page - display welcome based on if the user is logged in.
 */
function home() {
    const $links = document.getElementById('links');

    if (session) {
        $links.innerHTML = `
                <p>Welcome ${session.username}.</p>
                <a href="/dashboard">Dashboard</a>
            `;
    } else {
        $links.innerHTML = `
                <h2>Get started</h2>
                <a href="/login">Login</a>
            `;
    }
}

/**
 * Login page - redirect logged in users to home and listen for form submission.
 */
function login() {
    if (session) {
        window.location.href = '/';
    }

    document.getElementById('login').addEventListener('submit', onLogin);
}

/**
 * Dashboard page - greet the user.
 */
function dashboard() {
    const $greeting = document.getElementById('greeting');
    const username = session.username;
    $greeting.textContent = `Hello ${username}!`;
}

// #endregion FUNCTIONS
