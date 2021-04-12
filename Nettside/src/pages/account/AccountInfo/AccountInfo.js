import React, { useState } from "react"
import { useAuth } from "../../../helpers/authentication-context"
import { Link, useHistory } from "react-router-dom"

export function AccountInfo() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <>
            <div>
                <h2>Profile</h2>
                {error && <div variant="danger">{error}</div>}
                <strong>Email:</strong> {currentUser.email}
                <Link to="/update-profile">
                    Update Profile
                </Link>
            </div>
            <button variant="link" onClick={handleLogout}>
                Log Out
            </button>
            <div>
            </div>
        </>
    )
}