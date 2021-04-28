

import { EditorContext, languages } from "../../pages/texteditor/texteditor"
import { useContext, useState, useEffect } from "react";

import "./editor_nav.scss"

import { BackButton }  from "../backButton/backButton"
import { Darkmode }  from "../darkmode/darkmode"
import{ Timer } from "../timer/timer"
import Settings from "./settings.svg";




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
            <OverflowDropdown 
            firstChild={
                <BackButton className="editor-back-button" >❮ Back</BackButton>
            }
            secondChild={
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
            }
            thirdChild={
                    <div className="field">
                            <span className="select">
                                <select
                                    name="Theme"
                                    onChange={setTheme}
                                    value={settings.theme}
                                >
                                    {settings.themes.map(theme => (
                                        <option key={theme} value={theme}>
                                            {theme}
                                        </option>
                                    ))}
                                </select>
                            </span>
                    </div>
            }
            forthChild={
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
            }
            fifthCild={
                <Darkmode />
            }
            timer={
                <Timer />
            }
            />
                </div>
        )
}




function OverflowDropdown (props) {
    const [ dropdown_state, set_dropdown_state ] = useState(true);

    function toggleDisplay () {
        set_dropdown_state( !dropdown_state);
    }

    const { settings } = useContext(EditorContext);
    if (settings.screenWidth < 790){
        return(
        <>
            {props.firstChild}
            <div class="nav_spacer"/>
            <button className="settings-button" onClick={ toggleDisplay } ><img src={ Settings } alt=""/></button>
            <div className={dropdown_state ? "begone" : "active-settings-nav"} >
                {props.secondChild}
                {props.thirdChild}
                {props.forthChild}
                {props.fifthCild}
            </div>
            {props.timer}
        </>
        )
    }
    if (settings.screenWidth < 1100){
        return(
        <>
            {props.firstChild}
            {props.secondChild}
            <div class="nav_spacer"/>
            <button className="settings-button" onClick={ toggleDisplay } ><img src={ Settings } alt=""/></button>
            <div className={dropdown_state ? "begone" : "active-settings-nav"} >
                {props.thirdChild}
                {props.forthChild}
                {props.fifthCild}
            </div>
            {props.timer}
        </>
        )
    }
    if (settings.screenWidth < 1380){
        return(
        <>
            {props.firstChild}
            {props.secondChild}
            {props.thirdChild}
            <div class="nav_spacer"/>
            <button className="settings-button" onClick={ toggleDisplay } ><img src={ Settings } alt=""/></button>
            <div className={dropdown_state ? "begone" : "active-settings-nav"} >
                {props.forthChild}
                {props.fifthCild}
            </div>
            {props.timer}
        </>
        )
    }
    if (settings.screenWidth < 1400){
        return(
        <>
            {props.firstChild}
            {props.secondChild}
            {props.thirdChild}
            {props.forthChild}
            <div class="nav_spacer"/>
            <button className="settings-button" onClick={ toggleDisplay } ><img src={ Settings } alt=""/></button>
            <div className={dropdown_state ? "begone" : "active-settings-nav"} >
                {props.fifthCild}
            </div>
            {props.timer}
        </>
        )
    }

    return(
        <>
            {props.firstChild}
            {props.secondChild}
            {props.thirdChild}
            {props.forthChild}
            {props.fifthCild}
            <div class="nav_spacer"/>
            {props.timer}
        </>
    );


}



















// <button id="knapp" onclick=" byttFarge( this, '#f00' )" />

// function byttFarge(element, farge) {
//     element.style.color = farge;
// }







