import React from 'react';
import './navbar.scss';
import { Link, NavLink } from 'react-router-dom';

export const NavBar = () => (
    <header className="navbar-header">
      <h1 class="navbar-logo">Logo</h1>
      <input type="checkbox" id="nav-toggle" class="nav-toggle"></input>
      <nav>
        <ul>
            
          <li><NavLink activeClassName="active" to="/">Home</NavLink></li>
          <li><NavLink activeClassName="active" to="/about">About</NavLink></li>
          <li><NavLink activeClassName="active" to="/texteditor">Texteditor</NavLink></li>
          <li><NavLink activeClassName="active" to="/questions">Questions</NavLink></li>
          <li> </li>
        </ul>
        <a class="sign-in-button">Sign in ➜</a>
      </nav>
      
      <label for="nav-toggle" class="nav-toggle-label">
        <span></span>
      </label>
    </header>
);

// export default {NavBar};

