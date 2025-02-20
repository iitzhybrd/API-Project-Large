// Create Order
document.getElementById("createOrderForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const clients_id = document.getElementById("order_clients_id").value;
    const order = document.getElementById("order_orders").value;
    const status = document.getElementById("order_status").value;
    const error = document.getElementById("order_error").value;
    const total = document.getElementById("order_total").value;

    const data = {
        "clients_id": parseInt(clients_id),
        "Orders": order,
        "Status": status,
        "Error": error,
        "Total": parseFloat(total)
    };
console.log(data);
    fetch('http://127.0.0.1:5000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("createOrderMessage").textContent = "Order created successfully.";
            document.getElementById("createOrderForm").reset();
        } else {
            document.getElementById("createOrderMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("createOrderMessage").textContent = "Error: " + error;
    });
});

// Get Order by ID
document.getElementById("getOrderForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const orderId = document.getElementById("orderId").value;

    fetch(`http://127.0.0.1:5000/orders/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("getOrderMessage").textContent = "Error: " + data.error;
            document.getElementById("getOrderData").textContent = "";
        } else {
            document.getElementById("getOrderMessage").textContent = "Order retrieved successfully.";
            document.getElementById("getOrderData").textContent = JSON.stringify(data, null, 2);
        }
    })
    .catch(error => {
        document.getElementById("getOrderMessage").textContent = "Error: " + error;
        document.getElementById("getOrderData").textContent = "";
    });
});

// Update Order by ID
document.getElementById("updateOrderForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const updateOrderId = document.getElementById("order_updateOrderId").value;
    const updateClientsId = document.getElementById("order_updateClientsId").value;
    const updateOrders = document.getElementById("order_updateOrders").value;
    const updateStatus = document.getElementById("order_updateStatus").value;
    const updateError = document.getElementById("order_updateError").value;
    const updateTotal = document.getElementById("order_updateTotal").value;

    const data = {
        "clients_id": parseInt(updateClientsId),
        "Orders": updateOrders,
        "Status": updateStatus,
        "Error": updateError,
        "Total": parseFloat(updateTotal)
    };
console.log(data);

    fetch(`http://127.0.0.1:5000/orders/${updateOrderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("updateOrderMessage").textContent = "Order updated successfully.";
            document.getElementById("updateOrderForm").reset();
        } else {
            document.getElementById("updateOrderMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("updateOrderMessage").textContent = "Error: " + error;
    });
});
