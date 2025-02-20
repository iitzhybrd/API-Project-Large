// Create Shipping Address
document.getElementById("createShippingAddressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const resellers_id = document.getElementById("shipping_createResellersId").value;
    const name = document.getElementById("shipping_createName").value;
    const phone = document.getElementById("shipping_createPhone").value;
    const company = document.getElementById("shipping_createCompany").value;
    const streetAddress = document.getElementById("shipping_createStreetAddress").value;
    const country = document.getElementById("shipping_createCountry").value;
    const city = document.getElementById("shipping_createCity").value;
    const region = document.getElementById("shipping_createRegion").value;
    const postalCode = document.getElementById("shipping_createPostalCode").value;

    const data = {
        "resellers_id": parseInt(resellers_id),
        "Name": name,
        "Phone": parseInt(phone),
        "Company": company,
        "Street_address": streetAddress,
        "Country": country,
        "City": city,
        "Region": region,
        "Postal_code": parseInt(postalCode)
    };
console.log(data);
    fetch('http://127.0.0.1:5000/shipping_address', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.Success) {
            document.getElementById("createShippingAddressMessage").textContent = "Shipping address created successfully.";
            document.getElementById("createShippingAddressForm").reset();
        } else {
            document.getElementById("createShippingAddressMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("createShippingAddressMessage").textContent = "Error: " + error;
    });
});

// Get Shipping Address by ID
document.getElementById("getShippingAddressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const shippingAddressId = document.getElementById("getShippingAddressId").value;

    fetch(`http://127.0.0.1:5000/shipping_addresses/${shippingAddressId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("getShippingAddressMessage").textContent = "Error: " + data.error;
            document.getElementById("getShippingAddressData").textContent = "";
        } else {
            document.getElementById("getShippingAddressMessage").textContent = "Shipping address retrieved successfully.";
            document.getElementById("getShippingAddressData").textContent = JSON.stringify(data, null, 2);
        }
    })
    .catch(error => {
        document.getElementById("getShippingAddressMessage").textContent = "Error: " + error;
        document.getElementById("getShippingAddressData").textContent = "";
    });
});

// Update Shipping Address by ID
document.getElementById("updateShippingAddressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const updateShippingAddressId = document.getElementById("shipping_updateShippingAddressId").value;
    const resellers_id = document.getElementById("shipping_updateResellersId").value;
    const updateName = document.getElementById("shipping_updateName").value;
    const updatePhone = document.getElementById("shipping_updatePhone").value;
    const updateCompany = document.getElementById("shipping_updateCompany").value;
    const updateStreetAddress = document.getElementById("shipping_updateStreetAddress").value;
    const updateCountry = document.getElementById("shipping_updateCountry").value;
    const updateCity = document.getElementById("shipping_updateCity").value;
    const updateRegion = document.getElementById("shipping_updateRegion").value;
    const updatePostalCode = document.getElementById("shipping_updatePostalCode").value;

    const data = {
        "resellers_id": resellers_id,
        "Name": updateName,
        "Phone": updatePhone,
        "Company": updateCompany,
        "Street_address": updateStreetAddress,
        "Country": updateCountry,
        "City": updateCity,
        "Region": updateRegion,
        "Postal_code": updatePostalCode
    };
console.log(data);

    fetch(`http://127.0.0.1:5000/shipping_addresses/${updateShippingAddressId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.Success) {
            document.getElementById("updateShippingAddressMessage").textContent = "Shipping address updated successfully.";
            document.getElementById("updateShippingAddressForm").reset();
        } else {
            document.getElementById("updateShippingAddressMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("updateShippingAddressMessage").textContent = "Error: " + error;
    });
});
