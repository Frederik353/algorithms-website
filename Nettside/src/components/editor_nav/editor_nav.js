

import { EditorContext, languages } from "../../pages/texteditor/texteditor"
import { useContext } from "react";

import "./editor_nav.scss"

import { BackButton }  from "../backButton/backButton"
import { Darkmode }  from "../darkmode/darkmode"
import{ Timer } from "../timer/timer"





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

    // for (let i in settings.themes ){
    //     themes.push(settings.themes[i])
    // }
    // console.log(themes)

    return(

        <div class="toolbar" >
            <BackButton className="editor-back-button" >❮ Back</BackButton>
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
                    <Darkmode />
                    <div class="nav_spacer"></div>
                    <Timer />
                </div>
        )
}