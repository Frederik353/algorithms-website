
import React, { useState } from "react"
// import { useAuth } from "../../../helpers/authentication-context"
import { useHistory } from "react-router-dom"
import firebase from 'firebase/app';
import 'firebase/auth';
import "./SignUpWith.scss"

import Google from './logos/google.svg';
import Github from './logos/github.svg';
import Facebook from './logos/facebook.svg';

export const SignUpWith = () => {
    return (
        <div className="social-container">
                <SignUpWithGoogle/>
                <SignUpWithGithub/>
                <SignUpWithFacebook/>
        </div>
    );
}

// e.signupmethod


export function SignUpWithGoogle() {
    const [ setError] = useState("")
    const [ setLoading] = useState(false)
    const history = useHistory()

    async function signIn(e) {
        e.preventDefault()
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().useDeviceLanguage();
        try {
            setError("")
            setLoading(true)
            await firebase.auth().signInWithPopup(provider);
            history.goBack();
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }

    return (
        <button className="social"
            onClick={signIn}>
            <img src={ Google } alt=""></img>
        </button>
    );
};


export function SignUpWithGithub() {
    const [setError] = useState("")
    const [setLoading] = useState(false)
    const history = useHistory()

    async function signIn(e) {
        e.preventDefault()
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().useDeviceLanguage();
        try {
            setError("")
            setLoading(true)
            await firebase.auth().signInWithPopup(provider);
            console.log(history)
            history.goBack();
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    };

    return (
        <button className="social"
            onClick={signIn}>
            <img src={ Github } alt=""></img>
        </button>
    );
};

export function SignUpWithFacebook() {
    const [ setError] = useState("")
    const [ setLoading] = useState(false)
    const history = useHistory()

    async function signIn(e) {
        e.preventDefault()
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().useDeviceLanguage();
        try {
            setError("")
            setLoading(true)
            await firebase.auth().signInWithPopup(provider);
            history.goBack();
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }

    return (
        <button className="social"
            onClick={signIn}>
            <img src={ Facebook } alt=""></img>
        </button>
    );
};



















