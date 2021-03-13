# Aptivada Basic React Assessment

## Get to know the project

-   **Components/** - Should contain all reusable components for site, grouped by purpose. Layout, product, cart, etc.
-   **Pages/** - In this theoretical project, each page would be here. For this project, there will only be a cart page, and it is already in place.
-   **types/** Because we are using typescript, we need types for our data structures. They should go here.

## TODO LIST

### 1) Add/Remove Items from Cart

-   Cart Items should be a cart product, but contain quantity as well. Cart items should show title, price, quantity, and "x" (delete from cart) button.
-   Clicking "add to cart" button should add product to cart, with default quantity = 1.
-   Clicking add to cart more than once should increment quantity.

### 2) Show Cart Total

-   Cart total should default to 0.00
-   Cart total should update according to total price of all items in cart (taking into account price \* quantity, etc)

### 3) Bonus: Product List Item

When an item is in cart, "add to cart" button should:

-   become green
-   have checkmark before text

When an item is in cart, we could add:

-   up arrow (clicking it increases quantity)
-   down arrow (decrease quantity. Hitting 0 removes item from cart)
