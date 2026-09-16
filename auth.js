let signupForm = document.getElementById("signupForm");
let loginForm = document.getElementById("loginForm");


// SIGNUP

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("signupName").value;
        let email = document.getElementById("signupEmail").value;
        let password = document.getElementById("signupPassword").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            document.getElementById("signupMessage").innerText =
                "Passwords do not match";

            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check whether email already exists

        let existingUser = users.find(user => user.email === email);

        if (existingUser) {

            document.getElementById("signupMessage").innerText =
                "Email already registered";

            return;
        }

        let newUser = {
            name: name,
            email: email,
            password: password
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully!");

        window.location.href = "login.html";

    });
}



// LOGIN

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let user = users.find(
            user =>
                user.email === email &&
                user.password === password
        );

        if (user) {

            // Save currently logged-in user

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            window.location.href = "index.html";

        } else {

            document.getElementById("loginMessage").innerText =
                "Invalid email or password";

        }

    });
}