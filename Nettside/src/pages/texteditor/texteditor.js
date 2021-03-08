import React from "react";

import { Route, Switch, Link } from "react-router-dom";
import "./texteditor.scss";
import "react-reflex/styles.css";

import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement,
    ReflexHandle
} from "react-reflex"
import "../../helpers/screen-size";
import { useDetectOutsideClick } from "../../components/dropdown/dropdown";





export const texteditor = () => {
    return (
        <div class="wrapper">
            <div class="toolbar">
                {/* <div className="menu-container">
        <button onClick={ onClick } className="menu-trigger">
          <span>User</span>
          <img
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
            alt="User avatar"
          />
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
              <a href="#">Messages</a>
            </li>
            <li>
              <a href="#">Trips</a>
            </li>
            <li>
              <a href="#">Saved</a>
            </li>
          </ul>
        </nav>
      </div> */}
                <p>kljsfjmeklf</p>
                <p>kljsfjmeklf</p>
                <p>kljsfjmeklf</p>
                <p>kljsfjmeklf</p>
                <p>kljsfjmeklf</p>
                <p>kljsfjmeklf</p>
                <p>kljsfjmeklf</p>
                <p>kljsfjmeklf</p>
                <p>kljsfjmeklf</p>
            </div>
            <div class="editor">
                {/* venstre */}
                <ReflexContainer className="change-orientation"   ReflexContainer  orientation="vertical" >
                    <ReflexElement  className="change-orientation" minSize="20">
                        <ReflexContainer    ReflexContainer  orientation="horizontal">
                            <ReflexElement  minSize="20" >
                                <div class="boxes">

                                </div>

                            </ReflexElement>

                            <ReflexSplitter className="horizontal" ></ReflexSplitter>

                            <ReflexElement minSize="20">
                                <div class="boxes">
                                        
                                </div>
                            </ReflexElement>

                        </ReflexContainer>
                    </ReflexElement>

{/* midtsplitter */}
                    <ReflexSplitter className="change-orientation vertical" ></ReflexSplitter>

{/* høyre */}
                    <ReflexElement className="change-orientation" minSize="20">
                        <ReflexContainer ReflexContainer  orientation="horizontal">

                            <ReflexElement minSize="20">
                                <div class="boxes">
                                        
                                </div>
                            </ReflexElement>

                            <ReflexSplitter className="horizontal"></ReflexSplitter>

                            <ReflexElement minSize="20" >
                                <div class="boxes">
                                        
                                </div>
                            </ReflexElement>

                        </ReflexContainer>
                    </ReflexElement>

                </ReflexContainer>
            </div>

        </div>
    );
}

// export default { texteditor };




