Feature: User flow for unauthenticated users

    Scenario: Loads home page with login link when not logged in
        Given I am not logged in
        When I visit the home page
        Then I should see a login link

    Scenario: Redirects to login page when user clicks login link
        Given I am not logged in
        When I visit the home page
        And I click the login link
        Then I should be navigated to the login page

    Scenario: Redirects to login page when user tries to access dashboard
        Given I am not logged in
        When I visit the dashboard page
        Then I should be redirected to the login page
