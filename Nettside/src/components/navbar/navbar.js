import React from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';

export const NavBar = () => (
    <header className="navbar-header">
      <h1 class="navbar-logo">Logo</h1>
      <input type="checkbox" id="nav-toggle" class="nav-toggle"></input>
      <nav>
        <ul>
          <li ><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/texteditor">Texteditor</Link></li>
          <li><Link to="/questions">Questions</Link></li>
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

