document.getElementById("createResellerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const aov = document.getElementById("aov").value;

    const data = {
        "Name": name,
        "Username": username,
        "Email": email,
        "AOV": parseFloat(aov)
    };
console.log(data);

    fetch('http://127.0.0.1:5000/resellers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("message").textContent = "Reseller created successfully.";
            document.getElementById("createResellerForm").reset();
        } else {
            document.getElementById("message").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("message").textContent = "Error: " + error;
    });
});

document.getElementById("getResellerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const resellerId = document.getElementById("resellerId").value;
    
    fetch(`http://127.0.0.1:5000/resellers/${resellerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("getResellerMessage").textContent = "Error: " + data.error;
            document.getElementById("getResellerData").textContent = "";
        } else {
            document.getElementById("getResellerMessage").textContent = "Reseller retrieved successfully.";
            document.getElementById("getResellerData").textContent = JSON.stringify(data, null, 2);
        }
    })
    .catch(error => {
        document.getElementById("getResellerMessage").textContent = "Error: " + error;
        document.getElementById("getResellerData").textContent = "";
    });
});

document.getElementById("updateResellerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const updateResellerId = document.getElementById("updateResellerId").value;
    const updateName = document.getElementById("updateName").value;
    const updateUsername = document.getElementById("updateUsername").value;
    const updateEmail = document.getElementById("updateEmail").value;
    const updateAOV = document.getElementById("updateAOV").value;

    const data = {
        "Name": updateName,
        "Username": updateUsername,
        "Email": updateEmail,
        "AOV": parseFloat(updateAOV)
    };
console.log(data);

    fetch(`http://127.0.0.1:5000/resellers/${updateResellerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("updateResellerMessage").textContent = "Reseller updated successfully.";
            document.getElementById("updateResellerForm").reset();
        } else {
            document.getElementById("updateResellerMessage").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("updateResellerMessage").textContent = "Error: " + error;
    });
});
