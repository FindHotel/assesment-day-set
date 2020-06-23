Feature: Search

  Scenario Outline: Provider redirect
    When I go to the Home Page
    And I type on destination field "<destination>"
    And I select a check-in date
    And I click on the Search button
    Then I should see the Search Results Page
    And I click in a provider offer
    Then I should be redirected to "<destination>" provider's page
    Examples:
      | destination                      |
      | The Student Hotel Amsterdam City |
