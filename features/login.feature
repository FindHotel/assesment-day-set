Feature: Login

  Scenario: Complete a Login
    When I go to the Home Page
    And I navigate to the Login page
    And I type my email
    And I type my password
    And I click on Log in button
    Then I should see the Home Page as a logged in user
