import React from 'react';
import './navbar.scss';
import { Route, Switch, Link } from 'react-router-dom';

export const NavBar = () => (
    <header>
      <h1 class="logo">Logo</h1>
      <input type="checkbox" id="nav-toggle" class="nav-toggle"></input>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/texteditor">Texteditor</Link></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <label for="nav-toggle" class="nav-toggle-label">
        <span></span>
      </label>
    </header>
);

// export default {NavBar};

