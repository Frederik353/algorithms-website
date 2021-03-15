import React, { useState, useContext, Component } from "react";
import ReactDOM from "react-dom";
import AceEditor from "react-ace";

import { Route, Switch, Link } from "react-router-dom";
import "./texteditor.scss";
import "react-reflex/styles.css";


import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

import "ace-builds/src-noconflict/mode-jsx";

import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement
} from "react-reflex"
import "../../helpers/screen-size";

// import Test  from "../../components/lang-select/lang_select";

// Create context container in a global scope so it can be visible by every component
const ContextContainer = React.createContext(null);

const initialAppState = {
    placeholder: "Write some code",
    theme: "solarized_dark",
    mode: "python",
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: true,
    fontSize: 14,
    showGutter: true,
    showPrintMargin: false,
    highlightActiveLine: true,
    enableSnippets: true,
    showLineNumbers: true,
    value: "def Fibonacci(n): \n    if n<0:\n   elif n==1:\n        return 0\n  elif n==2:\n        return 1\n  else:\n     return Fibonacci(n-1)+Fibonacci(n-2)\nprint(Fibonacci(9)) "
};



export function Texteditor() {
    const [settings, set_settings] = useState(initialAppState)

    return (
        <div class="wrapper">
            <ContextContainer.Provider value={{ settings, set_settings }}>
                <Editor_Settings set_settings={ set_settings } ></Editor_Settings>

            <div class="editor">
                {/* venstre */}
                <ReflexContainer className="change-orientation"   ReflexContainer  orientation="vertical" >
                    <ReflexElement  className="change-orientation" minSize="20">
                        <ReflexContainer    ReflexContainer  orientation="horizontal">
                            <ReflexElement  minSize="20" >
                                <div class="boxes">
                                   {/* upper left */}
                                </div>

                            </ReflexElement>

                            <ReflexSplitter className="horizontal" ></ReflexSplitter>

                            <ReflexElement minSize="20">
                                <div class="boxes">
                                        {/* lower left */}
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
                                        {/* upper right */}
                                        <CodeEditor></CodeEditor>

                                </div>
                            </ReflexElement>

                            <ReflexSplitter className="horizontal"></ReflexSplitter>

                            <ReflexElement minSize="20" >
                                <div class="boxes">
                                        {/* lower right */}
                                </div>
                            </ReflexElement>

                        </ReflexContainer>
                    </ReflexElement>

                </ReflexContainer>
            </div>
            </ContextContainer.Provider>
        </div>
    );
}





const languages = [
    "javascript",
    "java",
    "python",
    "golang",
    "c_cpp"
];

const themes = [
    "monokai",
    "github",
    "tomorrow",
    "kuroir",
    "twilight",
    "xcode",
    "textmate",
    "solarized_dark",
    "solarized_light",
    "terminal"
];

languages.forEach(lang => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));



function CodeEditor() {

    const { settings, set_settings } = useContext(ContextContainer);

    function onChange(newValue) {
        set_settings({ ...settings, value: newValue });
    }

    function onSelectionChange(newValue, event) {
        console.log("select-change", newValue);
        console.log("select-change-event", event);
    }

    function onCursorChange(newValue, event) {
        console.log("cursor-change", newValue);
        console.log("cursor-change-event", event);
    }

    function onValidate(annotations) {
        console.log("onValidate", annotations);
    }

    function setPlaceholder(e) {
        set_settings({ ...settings, placeholder: e.target.value });
    }

        return (

            <AceEditor
                placeholder={settings.placeholder}
                mode={settings.mode}
                theme={settings.theme}
                name="AceEditor"
                onChange={onChange}
                onSelectionChange={onSelectionChange}
                onCursorChange={onCursorChange}
                onValidate={onValidate}
                value={settings.value}
                fontSize={settings.fontSize}
                showPrintMargin={settings.showPrintMargin}
                showGutter={settings.showGutter}
                highlightActiveLine={settings.highlightActiveLine}
                setOptions={{
                    useWorker: false,
                    enableBasicAutocompletion: settings.enableBasicAutocompletion,
                    enableLiveAutocompletion: settings.enableLiveAutocompletion,
                    enableSnippets: settings.enableSnippets,
                    showLineNumbers: settings.showLineNumbers,
                    tabSize: 2
                }}
            />
        );
}




function Editor_Settings() {

    const { settings, set_settings } = useContext(ContextContainer);

    function setTheme(e) {
        set_settings({ ...settings, theme: e.target.value });
    }

    function setFontSize(e) {
        set_settings({ ...settings, fontSize: e.target.value });
    }

    function setMode(e) {
        //Here on button click we call updateAppState as we would normally do in the App
        // It adds/updates comment property with input value to the appState
        set_settings({ ...settings, mode: e.target.value });
    }

    return(
        <div class="toolbar" >
                    <div className="field">
                        <p className="control">
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
                        </p>
                    </div>

                    <div  iv className="field">
                        <p className="control">
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
                        </p>
                    </div>

                    <div className="field">
                        <p className="control">
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
                        </p>
                    </div>

                </div>
        )
}






