import React from "react";
import "./darkmode.scss"


export  function Darkmode() {
    function toggle_darkmode(){
        var list = document.getElementById("body");
        var btn = document.getElementById("toggle-theme");
        list.classList.toggle("dark");
        list.classList.toggle("light");
        if (btn.classList.contains("light_svg")) {
            btn.classList.remove("light_svg");
            btn.classList.add("dark_svg");
        } else {
            btn.classList.add("light_svg");
            btn.classList.remove("dark_svg");
        }
    }
    return (
        <div class="btn_wrapper">
            <button
                type="button"
                class="btn-darkmode dark_svg"
                id="toggle-theme"
                onClick={toggle_darkmode}
            > </button>
        </div>
    );
}



