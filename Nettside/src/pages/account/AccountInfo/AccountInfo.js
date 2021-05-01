import React, { useState, useRef } from "react"
import { useAuth } from "../../../helpers/authentication-context"
import { useHistory } from "react-router-dom"
import "./AccountInfo.scss"

import { BackButton } from "../../../components/backButton/backButton";




export function AccountInfo() {
    const [logoutError, setLogoutError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail, logout } = useAuth()
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        setEmailError(" ")
        setPasswordError(" ")
        let passwordMatch = false;
        let emailChange = false;

        const promises = []
        if ((emailRef.current.value !== currentUser.email) && (emailRef.current.value !== "")) {
            promises.push(updateEmail(emailRef.current.value))
            emailChange = true;
        }
        if (passwordRef.current.value) {
            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setPasswordError("Passwords do not match")
            }else {
                passwordMatch = true;
                promises.push(updatePassword(passwordRef.current.value))
            }
        }

        let wait = false;
        Promise.all(promises)
            .catch(() => {
                if ((passwordMatch) && (!emailChange)){
                    wait = true
                    setPasswordError("Failed to update password")
                }
                if (emailChange){
                    wait = true
                    setEmailError("Failed to update email")
                }
            })
            .then(() => {
                if(!wait){
                    history.push("/")
                }
            })
    }



    async function handleLogout() {
        setLogoutError("")

        try {
            await logout()
            history.push("/")
        } catch {
            setLogoutError("Failed to log out")
        }
    }


    return (
        <div className="writeReview-wrapper">
            <div className="login-wrapper">
                <div className="form-container">
                    <div className="review-form" onSubmit={handleSubmit}>
                        <h2>Profile</h2>
                        <div className="input-wrapper account-info">
                            {currentUser.displayName && <><strong>Name:</strong>{currentUser.displayName}</> }
                            {currentUser.email && <><strong>Email:</strong>{currentUser.email}</> }
                            {currentUser.photoURL && <><strong>Profile picture</strong> <img src={currentUser.photoURL} className="account-img" alt="profile" /></>}
                            {currentUser.lastLoginAt && <><strong>last Login:</strong>{currentUser.lastLoginAt}</>}
                            {currentUser.validSince && <><strong>Valid Since:</strong>{currentUser.validSince}</>}
                            {currentUser.createdAt && <><strong>createdAt:</strong>{currentUser.createdAt}</>}
                            {currentUser.lastRefreshAt && <><strong>lastRefreshAt:</strong>{currentUser.lastRefreshAt}</>}
                            <div className="error"> {logoutError} </div>
                            <button className="logout login-button submit-button"  onClick={handleLogout}>Log Out</button>
                            {currentUser.email &&
                            <>
                                <form className="update-account">
                                    <h3>Update Email</h3>
                                    <div className="error"> {emailError} </div>
                                    <h5 type="email:">
                                        <input type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                                    </h5>
                                    <button className="login-button submit-button" type="submit">
                                        Update Email
                                    </button>
                                </form>
                                <form className="update-account">
                                    <h3>Change Password</h3>
                                    <div className="error"> {passwordError} </div>
                                    <h5 type="Password:">
                                        <input type="password" ref={passwordRef} placeholder="Password"/>
                                    </h5>
                                    <h5 type="Confirm password:">
                                        <input type="password" ref={passwordConfirmRef} placeholder="Confirm new password"/>
                                    </h5>
                                    <button className="login-button submit-button" type="submit">
                                        Update Password
                                    </button>
                                </form>
                            </> }
                        </div>
                        <div className="form-nav">
                            <div/>
                            <BackButton className="back-button">❮ Back</BackButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}






























