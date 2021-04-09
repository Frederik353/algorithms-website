

import { EditorContext, languages, themes } from "../../pages/texteditor/texteditor"
import React, { useContext } from "react";

import "./editor_nav.scss"

import { Darkmode }  from "../darkmode/darkmode"
import{ Timer } from "../timer/timer"
import {Link } from "react-router-dom";




export function EditorNav() {

    const { settings, set_settings } = useContext(EditorContext);

    function setTheme(e) {
        set_settings({ ...settings, theme: e.target.value });
    }

    function setFontSize(e) {
        set_settings({ ...settings, fontSize: JSON.parse(e.target.value) });
    }

    function setMode(e) {
        //Here on button click we call updateAppState as we would normally do in the App
        // It adds/updates comment property with input value to the appState
        set_settings({ ...settings, mode: e.target.value });
    }

    return(

        <div class="toolbar" >
            <Link to="/">❮ Back</Link>
                    <div className="field">
                            <span className="select">
                                <select
                                    name="mode"
                                    onChange={setMode}
                                    value={settings.mode}
                                >
                                    {languages.map(lang => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </span>
                    </div>

                    <div  iv className="field">
                            <span className="select">
                                <select
                                    name="Theme"
                                    onChange={setTheme}
                                    value={settings.theme}
                                >
                                    {themes.map(lang => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </span>
                    </div>

                    <div className="field">
                            <span className="select">
                                <select
                                    name="Font Size"
                                    onChange={setFontSize}
                                    value={settings.fontSize}
                                    >
                                    {[11, 12, 13, 14, 15, 16, 17, 18].map(lang => (
                                        <option key={lang} value={lang}>
                                        {lang}
                                        </option>
                                    ))}
                                </select>
                            </span>
                    </div>
                    <Darkmode></Darkmode>
                    <div class="nav_spacer"></div>
                    <Timer></Timer>
                </div>
        )
}