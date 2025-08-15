Feature: Add to Cart Functionality on Sauce Demo

  Scenario: Add a Product to Cart and Verify
    Given I am logged in as a "standard_user" with "secret_sauce"
    When I add "Sauce Labs Backpack" to the cart
    Then the cart icon should show "1" item

  Scenario: Add Multiple Products to Cart and Verify
    Given I am logged in as a "standard_user" with "secret_sauce"
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart icon should show "2" items
