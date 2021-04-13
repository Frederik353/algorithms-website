import React, { useState, useRef } from "react"
import { useAuth } from "../../../helpers/authentication-context"
import { Link, useHistory } from "react-router-dom"
import "./AccountInfo.scss"

export function AccountInfo() {
    const [error, setError] = useState("")
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail, logout } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history.push("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }



    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/")
        } catch {
            setError("Failed to log out")
        }
    }

        // const foo =  JSON.stringyfy({currentUser})
    return (
        <>
            <div className="login-wrapper">
                <div className="login-container" id="login-container">
                    <div className="form-container ">
                        <h2>Profile</h2>
                        {error && <div variant="danger">{error}</div>}
                        <strong>Name:</strong>{currentUser.displayName}
                        <img src={currentUser.photoURL} className="account-img"></img>
                        <strong>last Login:</strong>{currentUser.lastLoginAt}
                        <strong>Email:</strong>{currentUser.email}
                        <strong>Valid Since:</strong>{currentUser.validSince}
                        <strong>createdAt:</strong>{currentUser.createdAt}
                        <strong>lastRefreshAt:</strong>{currentUser.lastRefreshAt}
                        <button variant="link" onClick={handleLogout}>Log Out</button>
                        <div className="temp">
                            <div>
                                <h2>Update Profile</h2>
                                {error && <div variant="danger">{error}</div>}
                                <form onSubmit={handleSubmit}>
                                    <div id="email">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            ref={emailRef}
                                            required
                                            defaultValue={currentUser.email}
                                        />
                                    </div>
                                    <div id="password">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            ref={passwordRef}
                                            placeholder="Leave blank to keep the same"
                                        />
                                    </div>
                                    <div id="password-confirm">
                                        <label>Password Confirmation</label>
                                        <input
                                            type="password"
                                            ref={passwordConfirmRef}
                                            placeholder="Leave blank to keep the same"
                                        />
                                    </div>
                                    <button disabled={loading} type="submit">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div>
                            <Link to="/">Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}