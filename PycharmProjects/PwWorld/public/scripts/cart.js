document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const checkoutButton = document.getElementById('checkout-button');

    // Fetches and displays cart items
    function fetchCart() {
        fetch('/api/cart')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cart');
                }
                return response.json();
            })
            .then((cart) => {
                console.log('Cart:', cart);
                renderCartItems(cart.products);
            })
            .catch((error) => {
                console.error('Error fetching cart:', error);
                cartItemsContainer.innerHTML = '<p>Failed to load cart.</p>';
            });
    }

    function renderCartItems(products) {
        cartItemsContainer.innerHTML = '';
        products.forEach((product) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                <p><strong>Quantity:</strong> ${product.quantity}</p>
                <div class="quantity-controls">
                    <button class="decrease" data-product-id="${product.id}">-</button>
                    <button class="increase" data-product-id="${product.id}">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.querySelectorAll('.increase').forEach((button) => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-product-id');
                updateQuantity(productId, 'increase');
            });
        });

        document.querySelectorAll('.decrease').forEach((button) => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-product-id');
                updateQuantity(productId, 'decrease');
            });
        });
    }

    // Updates quantity for a product
    function updateQuantity(productId, action) {
        fetch(`/api/cart/update-quantity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, action }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update quantity');
                }
                return response.json();
            })
            .then(() => {
                fetchCart(); // Reload cart
            })
            .catch((error) => {
                console.error('Error updating quantity:', error);
            });
    }

    // Checkout
    checkoutButton.addEventListener('click', () => {
        fetch('/api/cart/checkout', {
            method: 'POST',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to checkout');
                }
                return response.json();
            })
            .then((data) => {
                alert(data.message);
                fetchCart();
            })
            .catch((error) => {
                console.error('Error checking out:', error);
            });
    });

    document.getElementById('empty-cart').addEventListener('click', () => {
    fetch('/api/cart/empty', {
        method: 'POST',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to empty cart');
            }
            return response.json();
        })
        .then((data) => {
            alert(data.message);
            fetchCart();
        })
        .catch((error) => {
            console.error('Error emptying cart:', error);
            alert('Failed to empty cart.');
        });
});



    fetchCart();
});

