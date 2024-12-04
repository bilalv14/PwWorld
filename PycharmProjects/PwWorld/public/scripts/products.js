document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('.products');
    const categoryDropdown = document.getElementById('category-dropdown');
    let currentCategory = 'all'; // Keeps track of the currently selected category

    // Fetches and displays products
    function fetchProducts(endpoint = '/api/products') {
        console.log(`Fetching products from: ${endpoint}`);
        fetch(endpoint)
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(products => {
                console.log('Products received:', products);
                if (products.length === 0) {
                    productList.innerHTML = '<p>No products available.</p>';
                    return;
                }
                updateProductList(products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    function updateProductList(products) {
        console.log('Updating product list with:', products);

        productList.innerHTML = '';

        products.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product');
            productItem.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}" onerror="this.src='images/default.jpg';">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                <a href="/details?id=${product.id}">View Details</a>
            `;

            productList.appendChild(productItem);
        });

        if (products.length === 0) {
            productList.innerHTML = '<p>No products available.</p>';
        }
    }

    function addSortingEventListeners() {
        document.getElementById('sort-price-asc').addEventListener('click', () => {
            const endpoint = currentCategory === 'all' ? '/api/products/sort/price-asc' : `/api/products/sort/price-asc?category=${currentCategory}`;
            fetchProducts(endpoint);
        });

        document.getElementById('sort-price-desc').addEventListener('click', () => {
            const endpoint = currentCategory === 'all' ? '/api/products/sort/price-desc' : `/api/products/sort/price-desc?category=${currentCategory}`;
            fetchProducts(endpoint);
        });

        document.getElementById('sort-caffeine').addEventListener('click', () => {
            const endpoint = currentCategory === 'all' ? '/api/products/sort/caffeine' : `/api/products/sort/caffeine?category=${currentCategory}`;
            fetchProducts(endpoint);
        });

        document.getElementById('sort-protein').addEventListener('click', () => {
            const endpoint = currentCategory === 'all' ? '/api/products/sort/protein' : `/api/products/sort/protein?category=${currentCategory}`;
            fetchProducts(endpoint);
        });

        document.getElementById('sort-electrolytes').addEventListener('click', () => {
            const endpoint = currentCategory === 'all' ? '/api/products/sort/electrolytes' : `/api/products/sort/electrolytes?category=${currentCategory}`;
            fetchProducts(endpoint);
        });
    }

    categoryDropdown.addEventListener('change', () => {
        currentCategory = categoryDropdown.value;
        const endpoint = currentCategory === 'all' ? '/api/products' : `/api/products?category=${currentCategory}`;
        fetchProducts(endpoint);
    });

    addSortingEventListeners();
    fetchProducts();
});
