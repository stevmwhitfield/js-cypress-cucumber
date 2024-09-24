Feature: User flow for authenticated users

    Scenario: Renders error message when user enters empty credentials
        Given I am not logged in
        When I visit the login page
        And I submit empty credentials
        Then I should see an error message

    Scenario: Logs in user with valid credentials
        Given I am not logged in
        When I visit the login page
        And I submit valid credentials
        Then I should be redirected to the dashboard
        And I should see a greeting message
        And my session should be stored in local storage

    Scenario: Renders logout button on dashboard page
        Given I am logged in
        When I visit the dashboard page
        Then I should see a logout button on the dashboard page

    Scenario: Renders logout button on home page
        Given I am logged in
        When I visit the home page
        Then I should see a logout button on the home page

    Scenario: Redirects to home page when user clicks logout button
        Given I am logged in
        When I click the logout button
        Then I should be redirected to the home page
        And my session should be removed from local storage
