import React from "react";
import "./darkmode.scss"

import { ReactComponent as moon } from "./moon.svg";
import { ReactComponent as sun } from "./sun.svg";

export  function Darkmode() {
    function toggle_darkmode(){
        var list = document.getElementById("body");
        var btn = document.getElementById("toggle-theme");
        list.classList.toggle("dark");
        if (list.classList.contains("dark")) {
            btn.innerHTML =  "dsfese";
        } else {
            btn.innerHTML = "sfees";
        }
    }
    return (
        <button
            type="button"
            class="btn-darkmode"
            id="toggle-theme"
            onClick={toggle_darkmode}
        > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg></button>
    );
}



