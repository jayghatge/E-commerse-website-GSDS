

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', addToCart);
});

async function addToCart(event) {
    const productId = event.target.dataset.productId;
    try {
        const response = await fetch('/add_to_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: '1', // You can replace 'user1' with the actual user ID
                product_id: productId,
                quantity: 1 // You can adjust the quantity if needed
            })
        });
        if (!response.ok) {
            throw new Error('Failed to add item to cart.');
        }
        // Once the item is added to the cart, you may want to update UI accordingly
        // For example, show a success message or update the cart icon with the new item count
    } catch (error) {
        console.error(error.message);
    }
}


async function viewCart(event) {
    try {
        const response = await fetch('/cart?user_id=user1');
        if (!response.ok) {
            throw new Error('Failed to fetch the cart data.');
        }

        const cartData = await response.json();

        const cartList = document.getElementById('cart-items'); // Update the ID here
        const totalAmountElement = document.getElementById('total-amount');

        cartList.innerHTML = '';
        cartData.cart_items.forEach(cartItem => {
            const listItem = document.createElement('div'); // Change to 'div'
            listItem.classList.add('col-md-4'); // Add Bootstrap column class
            listItem.innerHTML = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${cartItem.name}</h5>
                        <p class="card-text">Price: $${cartItem.price}</p>
                        <p class="card-text">Quantity: ${cartItem.quantity}</p>
                        <p class="card-text">Subtotal: $${cartItem.item_total}</p>
                        <button class="btn btn-danger delete-from-cart-btn" data-product-id="${cartItem.product_id}">Delete from Cart</button>
                    </div>
                </div>
            `;
            cartList.appendChild(listItem);
        });

        totalAmountElement.textContent = `Total: $${cartData.total_amount.toFixed(2)}`;

        // Show the cart list and total amount
        cartList.style.display = 'block';
        totalAmountElement.style.display = 'block';

        // Add event listeners to the "Delete from Cart" buttons
        const deleteFromCartButtons = document.querySelectorAll('.delete-from-cart-btn');
        deleteFromCartButtons.forEach(button => {
            button.addEventListener('click', deleteFromCart);
        });
    } catch (error) {
        console.error(error.message);
    }
}
