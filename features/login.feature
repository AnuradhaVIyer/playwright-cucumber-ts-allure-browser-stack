Feature: User Login Functionality on Sauce Demo

  Scenario: Successful Login with Valid Credentials
    Given I am on the Sauce Demo login page
    When I enter "standard_user" as username
    And I enter "secret_sauce" as password
    And I click the "Login" button
    Then I should be logged in successfully and see the products page title

  Scenario: Unsuccessful Login with Invalid Credentials
    Given I am on the Sauce Demo login page
    When I enter "invalid_user" as username
    And I enter "wrong_password" as password
    And I click the "Login" button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"
