// Create Reseller Order
document.getElementById("createResellerOrderForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const resellers_id = document.getElementById("resellers_order_resellers_id").value;
    const order = document.getElementById("resellers_order_resellerOrder").value;
    const status = document.getElementById("resellers_order_resellerStatus").value;
    const error = document.getElementById("resellers_order_resellerError").value;
    const total = document.getElementById("resellers_order_resellerTotal").value;

    const data = {
        "resellers_id": parseInt(resellers_id),
        "Order": order,
        "Status": status,
        "Error": error,
        "Total": parseFloat(total)
    };
console.log(data);
    fetch('http://127.0.0.1:5000/reseller_orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("createResellerOrderMessage").textContent = "Reseller order created successfully.";
            document.getElementById("createResellerOrderForm").reset();
        } else {
            document.getElementById("createResellerOrderMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("createResellerOrderMessage").textContent = "Error: " + error;
    });
});

// Get Reseller Order by ID
document.getElementById("getResellerOrderForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const resellerOrderId = document.getElementById("resellerOrderId").value;

    fetch(`http://127.0.0.1:5000/reseller_orders/${resellerOrderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("getResellerOrderMessage").textContent = "Error: " + data.error;
            document.getElementById("getResellerOrderData").textContent = "";
        } else {
            document.getElementById("getResellerOrderMessage").textContent = "Reseller order retrieved successfully.";
            document.getElementById("getResellerOrderData").textContent = JSON.stringify(data, null, 2);
        }
    })
    .catch(error => {
        document.getElementById("getResellerOrderMessage").textContent = "Error: " + error;
        document.getElementById("getResellerOrderData").textContent = "";
    });
});

// Update Reseller Order by ID
document.getElementById("updateResellerOrderForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const updateResellerOrderId = document.getElementById("reseller_updateResellerOrderId").value;
    const updateResellersId = document.getElementById("reseller_updateResellersId").value;
    const updateResellerOrder = document.getElementById("reseller_updateResellerOrder").value;
    const updateResellerStatus = document.getElementById("reseller_updateResellerStatus").value;
    const updateResellerError = document.getElementById("reseller_updateResellerError").value;
    const updateResellerTotal = document.getElementById("reseller_updateResellerTotal").value;

    const data = {
        "resellers_id": parseInt(updateResellersId),
        "Order": updateResellerOrder,
        "Status": updateResellerStatus,
        "Error": updateResellerError,
        "Total": parseFloat(updateResellerTotal)
    };
console.log(data);

    fetch(`http://127.0.0.1:5000/reseller_orders/${updateResellerOrderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("updateResellerOrderMessage").textContent = "Reseller order updated successfully.";
            document.getElementById("updateResellerOrderForm").reset();
        } else {
            document.getElementById("updateResellerOrderMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("updateResellerOrderMessage").textContent = "Error: " + error;
    });
});
