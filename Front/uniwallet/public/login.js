function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    createAccountForm.addEventListener("submit", async e => {
        e.preventDefault();
    
        const emailInput = createAccountForm.querySelector("input[name='email']");
        const passwordInput = createAccountForm.querySelector("input[name='password']");
        const confirmPasswordInput = createAccountForm.querySelector("input[name='confirmPassword']");
    
        if (emailInput && passwordInput && confirmPasswordInput) {
            const email = emailInput.value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
    
            if (password !== confirmPassword) {
                setFormMessage(createAccountForm, "error", "Passwords do not match");
                return;
            }
    
            try {
                const response = await fetch("https://apphack20240511213641.azurewebsites.net/Auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        confirmPassword
                    })
                });
    
                if (response.ok) {
                    // Successful sign up, handle accordingly (e.g., redirect user)
                    console.log("Sign up successful");
                } else {
                    // Handle error response
                    const errorData = await response.json();
                    console.error("Sign up failed:", errorData.message);
                    setFormMessage(createAccountForm, "error", errorData.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.error("Error: Form inputs not found");
        }
    });
    
    
    loginForm.addEventListener("submit", async e => {
        e.preventDefault();

        const Email = loginForm.querySelector("input[type='text']").value;
        const Password = loginForm.querySelector("input[type='password']").value;

        try {
            const response = await fetch("https://apphack20240511213641.azurewebsites.net/Auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Email,
                    Password
                })
            });
    

            if (response.ok) {
                // Successful login, handle accordingly (e.g., redirect user)
                console.log("Login successful");
            } else {
                // Handle error response
                const errorData = await response.json();
                console.error("Login failed:", errorData.message);
                setFormMessage(loginForm, "error", errorData.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    createAccountForm.addEventListener("submit", async e => {
        e.preventDefault();

        const username = createAccountForm.querySelector("#signupUsername").value;
        const email = createAccountForm.querySelectorAll("input[type='text']")[1].value; // Assuming email input is the second input in the form
        const password = createAccountForm.querySelectorAll("input[type='password']")[0].value; // Assuming password input is the first password input in the form
        const confirmPassword = createAccountForm.querySelectorAll("input[type='password']")[1].value; // Assuming confirm password input is the second password input in the form

        if (password !== confirmPassword) {
            setFormMessage(createAccountForm, "error", "Passwords do not match");
            return;
        }

        try {
            const response = await fetch("https://apphack20240511213641.azurewebsites.net/Auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            if (response.ok) {
                // Successful sign up, handle accordingly (e.g., redirect user)
                console.log("Sign up successful");
            } else {
                // Handle error response
                const errorData = await response.json();
                console.error("Sign up failed:", errorData.message);
                setFormMessage(createAccountForm, "error", errorData.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});
