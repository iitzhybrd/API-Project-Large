document.getElementById("createStockItemForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const resellers_id = document.getElementById("stock_resellers_id").value;
    const name = document.getElementById("stock_name").value;
    const sku = document.getElementById("stock_sku").value;
    const price = document.getElementById("stock_price").value;

    const data = {
        "resellers_id": parseInt(resellers_id),
        "Name": name,
        "SKU": sku,
        "Price": parseFloat(price)
    };
console.log(data);

    fetch('http://127.0.0.1:5000/stock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.Success) {
            document.getElementById("createStockItemMessage").textContent = "Stock item created successfully.";
            document.getElementById("createStockItemForm").reset();
        } else {
            document.getElementById("createStockItemMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("createStockItemMessage").textContent = "Error: " + error;
    });
});

document.getElementById("getStockItemForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const item_id = document.getElementById("item_id").value;

    fetch(`http://127.0.0.1:5000/stock/${item_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("getStockItemMessage").textContent = "Error: " + data.error;
            document.getElementById("getStockItemData").textContent = "";
        } else {
            document.getElementById("getStockItemMessage").textContent = "Stock item retrieved successfully.";
            document.getElementById("getStockItemData").textContent = JSON.stringify(data, null, 2);
        }
    })
    .catch(error => {
        document.getElementById("getStockItemMessage").textContent = "Error: " + error;
        document.getElementById("getStockItemData").textContent = "";
    });
});

document.getElementById("updateStockItemForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const update_item_id = document.getElementById("stock_update_item_id").value;
    const update_resellers_id = document.getElementById("stock_update_resellers_id").value;
    const update_name = document.getElementById("stock_update_name").value;
    const update_sku = document.getElementById("stock_update_sku").value;
    const update_price = document.getElementById("stock_update_price").value;

    const data = {
        "resellers_id": parseInt(update_resellers_id),
        "Name": update_name,
        "SKU": update_sku,
        "Price": parseFloat(update_price)
    };
console.log(data);

    fetch(`http://127.0.0.1:5000/stock/${update_item_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.Success) {
            document.getElementById("updateStockItemMessage").textContent = "Stock item updated successfully.";
            document.getElementById("updateStockItemForm").reset();
        } else {
            document.getElementById("updateStockItemMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("updateStockItemMessage").textContent = "Error: " + error;
    });
});
