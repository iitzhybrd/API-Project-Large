// Create Client
document.getElementById("createClientForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const resellers_id = document.getElementById("client_resellers_id").value;
    const name = document.getElementById("client_name").value;
    const orders = document.getElementById("client_orders").value;
    const total_spent = document.getElementById("client_total_spent").value;
    const aov = document.getElementById("client_aov").value;

    const data = {
        "resellers_id": parseInt(resellers_id),
        "Name": name,
        "Orders": orders,
        "Total_spent": parseFloat(total_spent),
        "AOV": parseFloat(aov)
    };
console.log(data);

    fetch('http://127.0.0.1:5000/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("createClientMessage").textContent = "Client created successfully.";
            document.getElementById("createClientForm").reset();
        } else {
            document.getElementById("createClientMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("createClientMessage").textContent = "Error: " + error;
    });
});

// Get Client by ID
document.getElementById("getClientForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const clientId = document.getElementById("clientId").value;
    
    fetch(`http://127.0.0.1:5000/clients/${clientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("getClientMessage").textContent = "Error: " + data.error;
            document.getElementById("getClientData").textContent = "";
        } else {
            document.getElementById("getClientMessage").textContent = "Client retrieved successfully.";
            document.getElementById("getClientData").textContent = JSON.stringify(data, null, 2);
        }
    })
    .catch(error => {
        document.getElementById("getClientMessage").textContent = "Error: " + error;
        document.getElementById("getClientData").textContent = "";
    });
});

// Update Client by ID
document.getElementById("updateClientForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const updateClientId = document.getElementById("client_updateClientId").value;
    const updateResellersId = document.getElementById("client_updateResellersId").value;
    const updateName = document.getElementById("client_updateName").value;
    const updateOrders = document.getElementById("client_updateOrders").value;
    const updateTotalSpent = document.getElementById("client_updateTotalSpent").value;
    const updateAOV = document.getElementById("client_updateAOV").value;

    const data = {
        "resellers_id": parseInt(updateResellersId),
        "Name": updateName,
        "Orders": updateOrders,
        "Total_spent": parseFloat(updateTotalSpent),
        "AOV": parseFloat(updateAOV)
    };
console.log(data);

    fetch(`http://127.0.0.1:5000/clients/${updateClientId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("updateClientMessage").textContent = "Client updated successfully.";
            document.getElementById("updateClientForm").reset();
        } else {
            document.getElementById("updateClientMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("updateClientMessage").textContent = "Error: " + error;
    });
});
