// Create Billing Address
document.getElementById("createBillingAddressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const resellers_id = document.getElementById("billing_resellers_id").value;
    const name = document.getElementById("billing_Name").value;
    const phone = document.getElementById("billing_Phone").value;
    const company = document.getElementById("billing_Company").value;
    const streetAddress = document.getElementById("billing_StreetAddress").value;
    const country = document.getElementById("billing_Country").value;
    const city = document.getElementById("billing_City").value;
    const region = document.getElementById("billing_Region").value;
    const postalCode = document.getElementById("billing_PostalCode").value;

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
    fetch('http://127.0.0.1:5000/billing_address', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.Success) {
            document.getElementById("createBillingAddressMessage").textContent = "Billing address created successfully.";
            document.getElementById("createBillingAddressForm").reset();
        } else {
            document.getElementById("createBillingAddressMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("createBillingAddressMessage").textContent = "Error: " + error;
    });
});

// Get Billing Address by ID
document.getElementById("getBillingAddressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const billingAddressId = document.getElementById("billingAddressId").value;

    fetch(`http://127.0.0.1:5000/billing_address/${billingAddressId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("getBillingAddressMessage").textContent = "Error: " + data.error;
            document.getElementById("getBillingAddressData").textContent = "";
        } else {
            document.getElementById("getBillingAddressMessage").textContent = "Billing address retrieved successfully.";
            document.getElementById("getBillingAddressData").textContent = JSON.stringify(data, null, 2);
        }
    })
    .catch(error => {
        document.getElementById("getBillingAddressMessage").textContent = "Error: " + error;
        document.getElementById("getBillingAddressData").textContent = "";
    });
});

// Update Billing Address by ID
document.getElementById("updateBillingAddressForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const updateBillingAddressId = document.getElementById("billing_updateBillingAddressId").value;
    const resellers_id = document.getElementById("billing_updateResellersId").value;
    const updateName = document.getElementById("billing_updateName").value;
    const updatePhone = document.getElementById("billing_updatePhone").value;
    const updateCompany = document.getElementById("billing_updateCompany").value;
    const updateStreetAddress = document.getElementById("billing_updateStreetAddress").value;
    const updateCountry = document.getElementById("billing_updateCountry").value;
    const updateCity = document.getElementById("billing_updateCity").value;
    const updateRegion = document.getElementById("billing_updateRegion").value;
    const updatePostalCode = document.getElementById("billing_updatePostalCode").value;

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

    fetch(`http://127.0.0.1:5000/billing_address/${updateBillingAddressId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.Success) {
            document.getElementById("updateBillingAddressMessage").textContent = "Billing address updated successfully.";
            document.getElementById("updateBillingAddressForm").reset();
        } else {
            document.getElementById("updateBillingAddressMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("updateBillingAddressMessage").textContent = "Error: " + error;
    });
});
