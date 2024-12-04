document.addEventListener('DOMContentLoaded', () => {
    const productDetailsContainer = document.querySelector('.product-details');

    // Fetches product details by ID
    function fetchProductDetails(productId) {
    fetch(`/api/products/${productId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch product details: ${response.status}`);
            }
            return response.json();
        })
        .then((product) => {
            console.log('Product details received:', product);
            renderProductDetails(product);
        })
        .catch((error) => {
            console.error('Error fetching product details:', error);
            productDetailsContainer.innerHTML = '<p>Failed to load product details.</p>';
        });
}

    function renderProductDetails(product) {
    productDetailsContainer.innerHTML = `
        <img src="${product.image_url}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <p><strong>Protein:</strong> ${product.protein}g</p>
        <p><strong>Caffeine:</strong> ${product.caffeine}mg</p>
        <p><strong>Electrolytes:</strong> ${product.electrolytes}mg</p>
        <button id="add-to-cart">Add to Cart</button>
    `;

    function addToCart(productId) {
    fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Product added to cart:', data);
            alert('Product added to cart successfully!');
        })
        .catch((error) => {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart.');
        });
}

    document.getElementById('add-to-cart').addEventListener('click', () => {
        addToCart(product.id);
    });
}

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (productId) {
        fetchProductDetails(productId);
    } else {
        productDetailsContainer.innerHTML = '<p>Product ID is missing in the URL.</p>';
    }
});
