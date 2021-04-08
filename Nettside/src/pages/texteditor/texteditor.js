import React, { useState } from "react";

// reflex
import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement
} from "react-reflex"

import AceEditor from "react-ace";

import "./texteditor.scss";
import "react-reflex/styles.css";
import "../../helpers/screen-size"
import { RemoteCodeApiRequest } from "../../components/remote_code/remote_code"
import { EditorNav } from "../../components/editor_nav/editor_nav"
import { CodeEditor } from "../../components/ace_editor/ace_editor"



import "../../helpers/screen-size";
import{ Question } from "../../components/promt/promt"
import{ TestCases } from "../../components/test_cases/test_cases"


// Create context container in a global scope so it can be visible by every component
export const EditorContext = React.createContext(null);



// note: gjør om til hash table
export const languages = [
    "javascript",
    "java",
    "python",
    "golang",
    "c_cpp"
];

export const themes = [
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




const initialTexteditorSettings = {
    placeholder: "Write some code",
    theme: "monokai",
    mode: "python",
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    fontSize: 14,
    showGutter: true,
    showPrintMargin: false,
    highlightActiveLine: true,
    enableSnippets: true,
    showLineNumbers: true,
    // value: "print(\"Hello\")\nprint(\"World\")",
    compile: 0,
    value: "def Fibonacci(n):\n  if n<0:\n    return\n  elif n==1:\n    return 0\n  elif n==2:\n    return 1\n  else:\n    return Fibonacci(n-1)+Fibonacci(n-2)\n\nprint(Fibonacci(30))"
};



export function Texteditor() {
    const [settings, set_settings] = useState(initialTexteditorSettings)

    function resize_editor() {
        AceEditor.insert("Something cool");
    }

    function compile() {
        set_settings({ ...settings, compile: settings.compile += 1 });
    }

    return (
        <div class="texteditor-wrapper">
            <EditorContext.Provider value={{ settings, set_settings }}>
                <EditorNav set_settings={ set_settings } ></EditorNav>

            <div class="modules">
                {/* venstre */}
                <ReflexContainer className="change-orientation"   ReflexContainer  orientation="vertical" >
                    <ReflexElement  className="change-orientation" minSize="100">
                        <ReflexContainer    ReflexContainer  orientation="horizontal">
                            <ReflexElement  minSize="100" >
                                <div class="boxes">
                                    <div class="nav">
                                        <button>ygysefgy</button>
                                        <button>ygysefgy</button>
                                        <button>ygysefgy</button>
                                    </div>
                                    <div class="box-content">
                                        <Question></Question>
                                    </div>
                                    {/* upper left */}
                                </div>
                            </ReflexElement>

                            <ReflexSplitter className="horizontal" ></ReflexSplitter>

                            <ReflexElement minSize="100">
                                <div class="boxes">
                                    <div class="nav">
                                        <button>ygysefgy</button>
                                        <button>ygysefgy</button>
                                        <button>ygysefgy</button>
                                    </div>
                                    <div class="box-content">
                                        <TestCases></TestCases>
                                    </div>
                                    {/* lower left */}
                                </div>
                            </ReflexElement>

                        </ReflexContainer>
                    </ReflexElement>

                    {/* midtsplitter */}
                    <ReflexSplitter className="change-orientation vertical" ></ReflexSplitter>

                    {/* høyre */}
                    <ReflexElement className="change-orientation" minSize="100">
                        <ReflexContainer ReflexContainer  orientation="horizontal">

                            <ReflexElement minSize="100">
                                <div class="boxes"  onresize={resize_editor}>
                                    <div class="nav">
                                        <button class="active">ygysefgy</button>
                                        <button>ygysefgy</button>
                                        <div class="nav_spacer"></div>
                                        <button class="submit" onClick={compile}>Submit code</button>
                                    </div>
                                    <div class="box-content editor">
                                        <CodeEditor></CodeEditor>
                                    </div>

                                        {/* upper right */}
                                </div>
                            </ReflexElement>

                            <ReflexSplitter className="horizontal"></ReflexSplitter>

                            <ReflexElement minSize="100" >
                                <div class="boxes">
                                    <div class="nav">
                                        <button>ygysefgy</button>
                                        <button>ygysefgy</button>
                                        <button>ygysefgy</button>
                                    </div>
                                    {/* lower right */}
                                    <div class="box-content">
                                        <RemoteCodeApiRequest></RemoteCodeApiRequest>
                                    </div>
                                </div>
                            </ReflexElement>

                        </ReflexContainer>
                    </ReflexElement>

                </ReflexContainer>
            </div>
            </EditorContext.Provider>
        </div>
    );
}
