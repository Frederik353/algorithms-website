


import React, { useRef, useState } from "react"
import { useAuth } from "../../../helpers/authentication-context"
import { Link, useHistory } from "react-router-dom"
import { SignUpWith } from "../SignUpWith/SignUpWith"

export function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }
    return (
        <div className="form">

            {error && <div variant="danger">{error}</div>}
            <h1>Log In</h1>
            <SignUpWith/>

            <span>or use your account</span>
            <form onSubmit={handleSubmit}>
                <div className="email">
                    <input type="email" placeholder="Email" ref={emailRef} required />
                </div>
                <div className="password">
                    <input type="password" placeholder="Password" ref={passwordRef} required />
                </div>
                <Link to="/reset-password">Forgot Password?</Link>
                <button className="login-button" disabled={loading} type="submit">Log In</button>
            </form>
        </div>
    )
}