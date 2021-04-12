// import React, { useRef, useState } from "react";
import "./SignUpPage.scss";

// import { useAuth } from "../../../helpers/authentication-context";
// import { Link, useHistory } from "react-router-dom";
import { Login } from "../Login/Login"
import { SignUp } from "../SignUp/SignUp.js";


function newUser(){
    const container = document.getElementById("login-container");
    if (container.classList.contains("right-panel-active")) {
        container.classList.remove("right-panel-active");
    }
    else{
        container.classList.add("right-panel-active");
    }
}


export function SignUpPage() {
    return (
    <div className="login-wrapper">
        <div className="login-container" id="login-container">
            <div className="form-container sign-up-container">
                <Login/>
            </div>
            <div className="form-container sign-in-container">
                <SignUp/>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>Need an account?</p>
                        <button className="ghost login-button" id="signIn" onClick={newUser}>Sign Up</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Welcome!</h1>
                        <p>Already have an account?</p>
                        <button className="ghost login-button" id="signUp" onClick={newUser}>Log In</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

