// Create Login Details
document.getElementById("createLoginDetailsForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const clients_id = document.getElementById("login_clients_id").value;
    const username = document.getElementById("login_username").value;
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    const data = {
        "clients_id": parseInt(clients_id),
        "Username": username,
        "Email_address": email,
        "Password": password
    };
console.log(data);

    fetch('http://127.0.0.1:5000/login_details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("createLoginDetailsMessage").textContent = "Login details created successfully.";
            document.getElementById("createLoginDetailsForm").reset();
        } else {
            document.getElementById("createLoginDetailsMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("createLoginDetailsMessage").textContent = "Error: " + error;
    });
});

// Get Login Details by ID
document.getElementById("getLoginDetailsForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const loginDetailsId = document.getElementById("loginDetailsId").value;

    fetch(`http://127.0.0.1:5000/login_details/${loginDetailsId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("getLoginDetailsMessage").textContent = "Error: " + data.error;
            document.getElementById("getLoginDetailsData").textContent = "";
        } else {
            document.getElementById("getLoginDetailsMessage").textContent = "Login details retrieved successfully.";
            document.getElementById("getLoginDetailsData").textContent = JSON.stringify(data, null, 2);
        }
    })
    .catch(error => {
        document.getElementById("getLoginDetailsMessage").textContent = "Error: " + error;
        document.getElementById("getLoginDetailsData").textContent = "";
    });
});

// Update Login Details by ID
document.getElementById("updateLoginDetailsForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const updateLoginDetailsId = document.getElementById("login_updateLoginDetailsId").value;
    const updateClientsId = document.getElementById("login_updateClientsId").value;
    const updateUsername = document.getElementById("login_updateUsername").value;
    const updateEmail = document.getElementById("login_updateEmail").value;
    const updatePassword = document.getElementById("login_updatePassword").value;

    const data = {
        "clients_id": parseInt(updateClientsId),
        "Username": updateUsername,
        "Email_address": updateEmail,
        "Password": updatePassword
    };
console.log(data);

    fetch(`http://127.0.0.1:5000/login_details/${updateLoginDetailsId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("updateLoginDetailsMessage").textContent = "Login details updated successfully.";
            document.getElementById("updateLoginDetailsForm").reset();
        } else {
            document.getElementById("updateLoginDetailsMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("updateLoginDetailsMessage").textContent = "Error: " + error;
    });
});
