

import React, { useRef, useState } from "react";
import { useAuth } from "../../../helpers/authentication-context";
import { Link, useHistory} from "react-router-dom";
import "./ResetPassword.scss";


export function ResetPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
            setTimeout(function(){
                history.goBack();
            }, 3000);
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }

    return (
        <div className="login-wrapper">
            <div className="login-container" id="login-container">
                <div className="form-container">

                    <div className="form">

                        <h1>Reset Password</h1>
                        {error && <div variant="danger">{error}</div>}
                        {message && <div variant="success">{message}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="email">
                                <input type="email" placeholder="Email" ref={emailRef} required />
                            </div>
                            <button className="login-button reset-password-button" disabled={loading}  type="submit" >Reset Password</button>
                        </form>
                    </div>

                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome Back!</h1>
                            <p>Need an account?</p>
                            <Link className="ghost login-button" to="/signIn">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
