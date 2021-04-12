import React from 'react';
import './navbar.scss';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../helpers/authentication-context"
import { Route, Redirect } from "react-router-dom"





export function NavBar(){
    return(
        <header className="navbar-header">
            <h1 class="navbar-logo">Logo</h1>
            <input type="checkbox" id="nav-toggle" class="nav-toggle"></input>
            <nav>
                <ul>
                    <li><NavLink activeClassName="active" exact to="/">Home</NavLink></li>
                    <li><NavLink activeClassName="active" exact to="/about">About</NavLink></li>
                    <li><NavLink activeClassName="active" exact to="/texteditor">Texteditor</NavLink></li>
                    <li><NavLink activeClassName="active" exact to="/questions">Questions</NavLink></li>
                    <li> </li>
                </ul>
                <SignInButton/>
                {/* <NavLink className="sign-in-button" to="/signIn">Sign in ➜</NavLink> */}
            </nav>
            <label for="nav-toggle" class="nav-toggle-label">
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
                return currentUser ? <NavLink className="sign-in-button" to="/account">Account ➜</NavLink> : <NavLink className="sign-in-button" to="/signIn">Sign in ➜</NavLink>;
            }}
        ></Route>
    )
}