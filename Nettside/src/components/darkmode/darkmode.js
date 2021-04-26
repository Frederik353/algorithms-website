import React, { useContext } from "react";
import "./darkmode.scss"
import { EditorContext} from "../../pages/texteditor/texteditor"



// det meste her er hentet fra forige prosjekt og raskt oppdatert til å fungere med react
// men det finnes sikkert bedre måter å gjøre dette på i react

export  function Darkmode() {
    const { settings, set_settings } = useContext(EditorContext); // editor state

    function toggle_darkmode(){ // toggler mellom light og darkmode
        var list = document.getElementById("body"); // finner body tag
        var btn = document.getElementById("toggle-theme"); // finner knappen for å endre svg bilde 
        list.classList.toggle("dark");
        list.classList.toggle("light");
        if (btn.classList.contains("light_svg")) { // hvis lightmode aktivert endre til darkmode
            btn.classList.remove("light_svg");
            btn.classList.add("dark_svg");
            set_settings({ ...settings, darkmode: true }); // oppdater editor state, brukt for å endre tilgjenglige syntax themes slik at man ikke får hvit skrift på hvit bakgrunn
        } else { // samme bare omvendt
            btn.classList.add("light_svg");
            btn.classList.remove("dark_svg");
            set_settings({ ...settings, darkmode: false });
        }
    }
    return ( // knapp kompopnent
        <div className="btn_wrapper">
            <button
                type="button"
                className="btn-darkmode dark_svg"
                id="toggle-theme"
                onClick={ toggle_darkmode }
            > </button>
        </div>
    );
}



