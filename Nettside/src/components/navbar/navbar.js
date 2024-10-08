import React from 'react';
import './navbar.scss';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../helpers/authentication-context"
import { Route } from "react-router-dom"





export function NavBar(){
    return(
        <header className="navbar-header">
            <h1 className="navbar-logo">Logo</h1>
            <input type="checkbox" id="nav-toggle" className="nav-toggle"></input>
            <nav className="main-nav">
                <ul>
                    <li><NavLink activeClassName="active" exact to="/">Home</NavLink></li>
                    <li><NavLink activeClassName="active" exact to="/about">About</NavLink></li>
                    <li><NavLink activeClassName="active" exact to="/texteditor/Merge Unsorted Array">Texteditor</NavLink></li>
                    <li><NavLink activeClassName="active" exact to="/questions">Questions</NavLink></li>
                    <li> </li>
                </ul>
                <SignInButton/>
            </nav>
            <label htmlFor="nav-toggle" className="nav-toggle-label">
                <span></span>
            </label>
        </header>
    );
}


function SignInButton() {
    const { currentUser } = useAuth()

    return (
        <Route
            render={props => {
                return currentUser ? <AccountButton/> : <NavLink className="sign-in-button" to="/signIn">Sign in ➜</NavLink>;
            }}
        ></Route>
    )
}



function AccountButton() {
    const { currentUser } = useAuth()

    return (
        <div>
            <NavLink className="sign-in-button" to="/account"> {currentUser.photoURL ? <img src={currentUser.photoURL} className="account-img" alt="profile" /> : "" } Account ➜</NavLink>
        </div>
    )
}

