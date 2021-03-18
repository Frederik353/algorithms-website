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
            btn.innerHTML = ;
        }
    }
    return (
        <button
            type="button"
            class="btn-darkmode"
            id="toggle-theme"
            onClick={toggle_darkmode}
        > </button>
    );
}



