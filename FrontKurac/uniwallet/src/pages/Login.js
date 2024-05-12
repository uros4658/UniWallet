import React, { useState, useRef } from 'react';
import Header from '../components/Header';


const styles = {
    body: {
        '--color-primary': '#009579',
        '--color-primary-dark': '#007f67',
        '--color-secondary': '#252c6a',
        '--color-error': '#cc3333',
        '--color-success': '#4bb544',
        '--border-radius': '4px',
        margin: '0',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        backgroundSize: 'cover',
    },
    container: {
        // ...other styles...
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // This makes the container take up the full viewport height
    },
    form: {
        fontFamily: '500 1rem Quicksand, sans-serif',
    },
    formTitle: {
        marginBottom: '2rem',
        textAlign: 'center',
    },
    formMessage: {
        textAlign: 'center',
        marginBottom: '1rem',
    },
    formMessageSuccess: {
        color: '#4bb544',
    },
    formMessageError: {
        color: '#cc3333',
    },
    formInputGroup: {
        marginBottom: '1rem',
    },
    formInput: {
        display: 'block',
        width: '100%',
        padding: '0.75rem',
        boxSizing: 'border-box',
        borderRadius: '4px',
        border: '1px solid #dddddd',
        outline: 'none',
        background: '#eeeeee',
        transition: '0.2s, border-color 0.2s',
    },
    formButton: {
        width: '100%',
        padding: '1rem 2rem',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        outline: 'none',
        cursor: 'pointer',
        background: '#009579',
    },
    formText: {
        textAlign: 'center',
    },
    formLink: {
        color: '#252c6a',
        textDecoration: 'none',
        cursor: 'pointer',
    },
};
function Login() {
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);
    const [formMessage, setFormMessage] = useState("");
    const [formMessageType, setFormMessageType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();

        // Validate form data
        if (!email || !password) {
            setFormMessage("Please fill in all fields.");
            setFormMessageType("error");
            return;
        }

        // Send a request to your API
        try {
            const response = await fetch("https://apphack20240511213641.azurewebsites.net/Auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                setFormMessage("Login successful!");
                setFormMessageType("success");
                // Redirect user or do something else...
            } else {
                const data = await response.json();
                setFormMessage(data.message);
                setFormMessageType("error");
            }
        } catch (error) {
            setFormMessage("An error occurred. Please try again.");
            setFormMessageType("error");
        }
    };

    const createAccountFormRef = useRef();

    const handleCreateAccountFormSubmit = async (event) => {
        event.preventDefault();

    // Get form data
    const emailInput = createAccountFormRef.current.querySelector("input[name='email']");
    const passwordInput = createAccountFormRef.current.querySelector("input[name='password']");
    const confirmPasswordInput = createAccountFormRef.current.querySelector("input[name='confirmPassword']");

    let email, password, confirmPassword;

    if (emailInput && passwordInput && confirmPasswordInput) {
        email = emailInput.value;
        password = passwordInput.value;
        confirmPassword = confirmPasswordInput.value;
    }

    // Send a request to your API
    try {
        const response = await fetch("https://apphack20240511213641.azurewebsites.net/Auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        });


            if (response.ok) {
                setFormMessage("Sign up successful!");
                setFormMessageType("success");
                // Redirect user or do something else...
            } else {
                const data = await response.json();
                setFormMessage(data.message);
                setFormMessageType("error");
            }
        } catch (error) {
            setFormMessage("An error occurred. Please try again.");
            setFormMessageType("error");
        }

    };


    return (
        <div>
            <Header />
            <div style={styles.container}>
                {isLoginFormVisible ? (
                    <form style={styles.form} id="login" onSubmit={handleLoginFormSubmit}>
                        <div style={styles.formInputGroup}>
                            <input type="email" style={styles.formInput} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            <div className="form__input-error-message"></div>
                        </div>
                        <div style={styles.formInputGroup}>
                            <input type="password" style={styles.formInput} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            <div className="form__input-error-message"></div>
                        </div>
                        <button style={styles.formButton} type="submit">Continue</button>
                        <p style={styles.formText}>
                            <a href="#" style={styles.formLink} onClick={() => setLoginFormVisible(false)}>Don't have an account? Create account</a>
                        </p>
                    </form>
                ) : (
                    <form style={styles.form} id="createAccount" onSubmit={handleCreateAccountFormSubmit} ref={createAccountFormRef}>
                        <div style={styles.formInputGroup}>
                            <input type="text" style={styles.formInput} placeholder="Username" name="username" />
                            <div className="form__input-error-message"></div>
                        </div>
                        <div style={styles.formInputGroup}>
                            <input type="email" style={styles.formInput} placeholder="Email" name="email" />
                            <div className="form__input-error-message"></div>
                        </div>
                        <div style={styles.formInputGroup}>
                            <input type="password" style={styles.formInput} placeholder="Password" name="password" />
                            <div className="form__input-error-message"></div>
                        </div>
                        <div style={styles.formInputGroup}>
                            <input type="password" style={styles.formInput} placeholder="Confirm Password" name="confirmPassword" />
                            <div className="form__input-error-message"></div>
                        </div>
                        <button style={styles.formButton} type="submit">Create Account</button>
                        <p style={styles.formText}>
                            <a href="#" style={styles.formLink} onClick={() => setLoginFormVisible(true)}>Already have an account? Sign in</a>
                        </p>
                    </form>
                )}
                <div className={`form__message form__message--${formMessageType}`}>
                    {formMessage}
                </div>
            </div>
        </div>
    );
}

export default Login;

