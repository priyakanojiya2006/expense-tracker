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

        // Send signup data to the Node.js server

        fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })
            .then(res => res.json().then(data => ({ ok: res.ok, data })))
            .then(({ ok, data }) => {

                if (!ok) {
                    // e.g. "Email already registered"
                    document.getElementById("signupMessage").innerText =
                        data.message;
                    return;
                }

                alert("Account created successfully!");

                window.location.href = "login.html";

            })
            .catch(() => {
                document.getElementById("signupMessage").innerText =
                    "Server error. Try again.";
            });

    });
}



// LOGIN

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;

        // Send login data to the Node.js server

        fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json().then(data => ({ ok: res.ok, data })))
            .then(({ ok, data }) => {

                if (!ok) {
                    document.getElementById("loginMessage").innerText =
                        data.message;
                    return;
                }

                // Save currently logged-in user (name and email only)

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(data)
                );

                window.location.href = "expe.html";

            })
            .catch(() => {
                document.getElementById("loginMessage").innerText =
                    "Server error. Try again.";
            });

    });
}
