// Create Client Shipping Address
document.getElementById("createClientShippingAddressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const clients_id = document.getElementById("client_shipping_clients_id").value;
    const name = document.getElementById("client_shipping_name").value;
    const phone = document.getElementById("client_shipping_phone").value;
    const company = document.getElementById("client_shipping_company").value;
    const street_address = document.getElementById("client_shipping_street_address").value;
    const country = document.getElementById("client_shipping_country").value;
    const city = document.getElementById("client_shipping_city").value;
    const region = document.getElementById("client_shipping_region").value;
    const postal_code = document.getElementById("client_shipping_postal_code").value;

    const data = {
        "clients_id": parseInt(clients_id),
        "Name": name,
        "Phone": parseInt(phone),
        "Company": company,
        "Street_address": street_address,
        "Country": country,
        "City": city,
        "Region": region,
        "Postal_code": postal_code
    };
console.log(data);
    fetch('http://127.0.0.1:5000/clients_shipping_address', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.Success) {
            document.getElementById("createClientShippingAddressMessage").textContent = "Client shipping address created successfully.";
            document.getElementById("createClientShippingAddressForm").reset();
        } else {
            document.getElementById("createClientShippingAddressMessage").textContent = "Error: " + data.message;
        }
    })
    .catch(error => {
        document.getElementById("createClientShippingAddressMessage").textContent = "Error: " + error;
    });
});

// Get Client Shipping Address by ID
document.getElementById("getClientShippingAddressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const clientshippingAddressId = document.getElementById("clientshippingAddressId").value;

    fetch(`http://127.0.0.1:5000/clients_shipping_address/${clientshippingAddressId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            document.getElementById("getClientShippingAddressMessage").textContent = "Shipping address not found";
            document.getElementById("getClientShippingAddressData").textContent = "";
        } else {
            document.getElementById("getClientShippingAddressMessage").textContent = "Shipping address retrieved successfully.";
            document.getElementById("getClientShippingAddressData").textContent = JSON.stringify(data, null, 2);
        }
    })
    .catch(error => {
        document.getElementById("getClientShippingAddressMessage").textContent = "Error: " + error;
        document.getElementById("getClientgShippingAddressData").textContent = "";
    });
});

// Update Client Shipping Address by ID
document.getElementById("updateClientShippingAddressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const updateShippingAddressId = document.getElementById("client_shipping_updateShippingAddressId").value;
    const updateClientsId = document.getElementById("client_shipping_updateClientsId").value;
    const updateName = document.getElementById("client_shipping_updateName").value;
    const updatePhone = document.getElementById("client_shipping_updatePhone").value;
    const updateCompany = document.getElementById("client_shipping_updateCompany").value;
    const updateStreetAddress = document.getElementById("client_shipping_updateStreetAddress").value;
    const updateCountry = document.getElementById("client_shipping_updateCountry").value;
    const updateCity = document.getElementById("client_shipping_updateCity").value;
    const updateRegion = document.getElementById("client_shipping_updateRegion").value;
    const updatePostalCode = document.getElementById("client_shipping_updatePostalCode").value;

    const data = {
        "clients_id": parseInt(updateClientsId),
        "Name": updateName,
        "Phone": parseInt(updatePhone),
        "Company": updateCompany,
        "Street_address": updateStreetAddress,
        "Country": updateCountry,
        "City": updateCity,
        "Region": updateRegion,
        "Postal_code": parseInt(updatePostalCode),
    };
console.log(data);

    fetch(`http://127.0.0.1:5000/clients_shipping_address/${updateShippingAddressId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.Success) {
            document.getElementById("updateClientShippingAddressMessage").textContent = "Client shipping address updated successfully.";
            document.getElementById("updateClientShippingAddressForm").reset();
        } else {
            document.getElementById("updateClientShippingAddressMessage").textContent = "Error: " + data.message;
        }
    })
    .catch(error => {
        document.getElementById("updateClientShippingAddressMessage").textContent = "Error: " + error;
    });
});
