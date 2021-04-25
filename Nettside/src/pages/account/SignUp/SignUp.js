
import React, { useRef, useState } from "react"
import { useAuth } from "../../../helpers/authentication-context"
import { useHistory } from "react-router-dom"
import { SignUpWith } from "../SignUpWith/SignUpWith"


export function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
    }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.goBack();
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <div className="form">

            {error && <div variant="danger">{error}</div>}
            <h1>Sign Up</h1>
            <SignUpWith/>

            <span>or use your email for registration </span>
            <form onSubmit={handleSubmit}>
                <div className="email">
                    <input type="email" placeholder="Email" ref={emailRef} required />
                </div>
                <div className="password">
                    <input type="password" placeholder="Password" ref={passwordRef} required />
                </div>
                <div className="password-confirm">
                    <input type="password" placeholder="Confirm Password" ref={passwordConfirmRef} required />
                </div>
                <button className="login-button" disabled={loading} type="submit">Sign Up</button>
            </form>
        </div>
    )
}