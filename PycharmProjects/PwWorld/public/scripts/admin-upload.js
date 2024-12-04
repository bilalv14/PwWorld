document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const file = fileInput.files[0];
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        fetch('/api/admin/bulk-upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(`Error: ${data.error}`);
                } else {
                    alert(`Success: ${data.message}`);
                }
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
                alert('An error occurred while uploading the file.');
            });
    });
});



