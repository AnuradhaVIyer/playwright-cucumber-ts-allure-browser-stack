Feature: Local API Testing via BrowserStack Local

  Scenario: GET users from local API
    Given my local API is running
    When I request "GET" "/api/users"
    Then the response status should be 200
    And the response should contain "email"
