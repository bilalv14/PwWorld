document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const addNewProductButton = document.getElementById('add-new-product');

    // Fetches and displays all products
    function fetchProducts() {
        fetch('/api/admin/products')
            .then((response) => response.json())
            .then((products) => renderProductList(products))
            .catch((error) => console.error('Error fetching products:', error));
    }

    function renderProductList(products) {
        productList.innerHTML = '';
        if (products.length === 0) {
            productList.innerHTML = '<p>No products available.</p>';
            return;
        }

        products.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <p>ID: ${product.id}</p>
                <p>Name: ${product.name}</p>
                <p>Description: ${product.description}</p>
                <p>Category: ${product.category_id}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <button class="edit-button" data-id="${product.id}">Edit</button>
                <button class="delete-button" data-id="${product.id}">Delete</button>
            `;
            productList.appendChild(productDiv);
        });


        document.querySelectorAll('.edit-button').forEach((button) =>
            button.addEventListener('click', () => redirectToEdit(button.dataset.id))
        );
        document.querySelectorAll('.delete-button').forEach((button) =>
            button.addEventListener('click', () => deleteProduct(button.dataset.id))
        );
    }

    // edit page
    function redirectToEdit(productId) {
        window.location.href = `/admin/edit?id=${productId}`;
    }

    // Deletes product
    function deleteProduct(productId) {
        fetch(`/api/admin/products/${productId}`, { method: 'DELETE' })
            .then((response) => response.json())
            .then(() => fetchProducts())
            .catch((error) => console.error('Error deleting product:', error));
    }

    // Searches products
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        const filteredProducts = allProducts.filter((product) => {
            const idMatch = product.id.toString().includes(query);
            const nameMatch = product.name.toLowerCase().includes(query.toLowerCase());
            return idMatch || nameMatch;
        });
        renderProductList(filteredProducts);
    });

    // Adds new product
    addNewProductButton.addEventListener('click', () => {
        window.location.href = '/admin/edit';
    });


    fetchProducts();
});



