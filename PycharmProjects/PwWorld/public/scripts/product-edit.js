document.addEventListener('DOMContentLoaded', () => {
    const updateButton = document.getElementById('update-product');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Check if an ID is provided

    // Fetches existing product data if editing
    if (productId) {
        fetch(`/api/admin/products/${productId}`)
            .then((response) => response.json())
            .then((product) => populateForm(product))
            .catch((error) => console.error('Error fetching product:', error));
    }

    // Populate form with product data
    function populateForm(product) {
        document.getElementById('id').value = product.id;
        document.getElementById('name').value = product.name;
        document.getElementById('desc').value = product.description;
        document.getElementById('category').value = product.category_id;
        document.getElementById('image').value = product.image_url;
        document.getElementById('price').value = product.price.toFixed(2);
        document.getElementById('protein').value = product.protein;
        document.getElementById('caffeine').value = product.caffeine;
        document.getElementById('electrolytes').value = product.electrolytes;
        document.getElementById('is_featured').value = product.is_featured ? "1" : "0";
    }

    //Form submission
    updateButton.addEventListener('click', () => {
        const productData = {
            name: document.getElementById('name').value,
            description: document.getElementById('desc').value,
            category_id: parseInt(document.getElementById('category').value, 10),
            image_url: document.getElementById('image').value,
            price: parseFloat(document.getElementById('price').value),
            protein: parseFloat(document.getElementById('protein').value),
            caffeine: parseFloat(document.getElementById('caffeine').value),
            electrolytes: parseFloat(document.getElementById('electrolytes').value),
            is_featured: parseInt(document.getElementById('is_featured').value, 10),
        };

        const url = productId ? `/api/admin/products/${productId}` : `/api/admin/products`;
        const method = productId ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                window.location.href = '/admin/products';
            })
            .catch((error) => console.error('Error updating/adding product:', error));
    });
});




