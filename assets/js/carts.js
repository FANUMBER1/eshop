// Function to update the total price for a single product row
function updateProductTotal(productId) {
    const quantityInput = document.querySelector(`input[name="quant${productId}"]`);
    const price = parseFloat(document.querySelector(`#${productId} .price span`).textContent);
    const totalElement = document.querySelector(`#${productId} .total-amount span`);

    // Update the total for this row
    const newTotal = parseInt(quantityInput.value) * price;
    totalElement.textContent = newTotal.toFixed(2);

    // Update the overall total for selected products
    updateSelectedTotal();
}

// Function to calculate total amount for selected products
function updateSelectedTotal() {
    let totalSum = 0;

    // Loop through each checkbox to find selected ones
    const selectedProducts = document.querySelectorAll('input[name="products"]:checked');

    selectedProducts.forEach((checkbox) => {
        const productId = checkbox.value;
        const rowTotal = parseFloat(document.querySelector(`#${productId} .total-amount span`).textContent);
        totalSum += rowTotal;
    });

    // Update the total amount displayed for selected products
    document.querySelector('#totalSelectedProducts').textContent = totalSum.toFixed(2);
}

// Event listeners for quantity inputs and checkboxes
document.querySelectorAll('.input-number').forEach(input => {
    input.addEventListener('change', (e) => {
        const productId = e.target.name.replace('quant', ''); // Extract product ID from input name
        updateProductTotal(productId);
    });
});

document.querySelectorAll('input[name="products"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateSelectedTotal();
    });
});

// Initial calculation to set the totals correctly on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[name="products"]').forEach(checkbox => {
        if (checkbox.checked) {
            updateProductTotal(checkbox.value);
        }
    });
    updateSelectedTotal();
});

