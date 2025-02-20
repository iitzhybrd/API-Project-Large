// Create Clients Billing Address
document.getElementById("createClientBillingAddressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const clientsId = document.getElementById("client_billing_ClientsId").value;
    const name = document.getElementById("client_billing_Name").value;
    const phone = document.getElementById("client_billing_Phone").value;
    const company = document.getElementById("client_billing_Company").value;
    const streetAddress = document.getElementById("client_billing_StreetAddress").value;
    const country = document.getElementById("client_billing_Country").value;
    const city = document.getElementById("client_billing_City").value;
    const region = document.getElementById("client_billing_Region").value;
    const postalCode = document.getElementById("client_billing_PostalCode").value;

    const data = {
        "clients_id": parseInt(clientsId),
        "Name": name,
        "Phone": parseInt(phone),
        "Company": company,
        "Street_address": streetAddress,
        "Country": country,
        "City": city,
        "Region": region,
        "Postal_code": postalCode
    };
console.log(data);
    fetch('http://127.0.0.1:5000/clients_billing_address', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.Success) {
            document.getElementById("createClientBillingAddressMessage").textContent = "Client billing address created successfully.";
            document.getElementById("createClientBillingAddressForm").reset();
        } else {
            document.getElementById("createClientBillingAddressMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("createClientBillingAddressMessage").textContent = "Error: " + error;
    });
});

// Get Clients Billing Address by ID
document.getElementById("getClientBillingAddressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const clientbillingAddressId = document.getElementById("getClientBillingAddressId").value;

    fetch(`http://127.0.0.1:5000/clients_billing_address/${clientbillingAddressId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("getClientBillingAddressMessage").textContent = "Error: " + data.error;
            document.getElementById("getClientBillingAddressData").textContent = "";
        } else {
            document.getElementById("getClientBillingAddressMessage").textContent = "Client billing address retrieved successfully.";
            document.getElementById("getClientBillingAddressData").textContent = JSON.stringify(data, null, 2);
        }
    })
    .catch(error => {
        document.getElementById("getClientBillingAddressMessage").textContent = "Error: " + error;
        document.getElementById("getClientBillingAddressData").textContent = "";
    });
});

// Update Clients Billing Address by ID
document.getElementById("updateClientBillingAddressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const updateBillingAddressId = document.getElementById("client_billing_updateBillingAddressId").value;
    const updateClientsId = document.getElementById("client_billing_updateClientsId").value;
    const updateName = document.getElementById("client_billing_updateName").value;
    const updatePhone = document.getElementById("client_billing_updatePhone").value;
    const updateCompany = document.getElementById("client_billing_updateCompany").value;
    const updateStreetAddress = document.getElementById("client_billing_updateStreetAddress").value;
    const updateCountry = document.getElementById("client_billing_updateCountry").value;
    const updateCity = document.getElementById("client_billing_updateCity").value;
    const updateRegion = document.getElementById("client_billing_updateRegion").value;
    const updatePostalCode = document.getElementById("client_billing_updatePostalCode").value;

    const data = {
        "clients_id": parseInt(updateClientsId),
        "Name": updateName,
        "Phone": parseInt(updatePhone),
        "Company": updateCompany,
        "Street_address": updateStreetAddress,
        "Country": updateCountry,
        "City": updateCity,
        "Region": updateRegion,
        "Postal_code": updatePostalCode
    };
console.log(data);

    fetch(`http://127.0.0.1:5000/clients_billing_address/${updateBillingAddressId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.Success) {
            document.getElementById("updateClientBillingAddressMessage").textContent = "Client billing address updated successfully.";
            document.getElementById("updateClientBillingAddressForm").reset();
        } else {
            document.getElementById("updateClientBillingAddressMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("updateClientBillingAddressMessage").textContent = "Error: " + error;
    });
});
