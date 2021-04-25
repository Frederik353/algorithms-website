import React, { useState, useEffect, useRef } from "react";
import { useHistory ,useLocation } from 'react-router-dom';

// reflex
import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement
} from "react-reflex"

import AceEditor from "react-ace";
import  initialQuestionState  from "../../helpers/databaseStructure/questions"
import { database } from "../../helpers/config";
import "./texteditor.scss";
import "react-reflex/styles.css";
import "../../helpers/screen-size"
import { RemoteCodeApiRequest } from "../../components/remote_code/remote_code"
import { EditorNav } from "../../components/editor_nav/editor_nav"
import { CodeEditor } from "../../components/ace_editor/ace_editor"
import { Discussion } from "../../components/discussion/discussion"



import "../../helpers/screen-size";
import{ Question } from "../../components/promt/promt"
import{ TestCases, Editor } from "../../components/test_cases/test_cases"


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



const lightmodeThemes = [
    "github",
    "tomorrow",
    "kuroir",
    "xcode",
];


const darkmodeThemes = [
    "chaos",
    "monokai",
    "gob",
    "ambiance",
    "katzenmilch",
    "twilight",
    "textmate",
    "solarized_dark",
    "solarized_light",
    "terminal",
    "chrome",
    "clouds",
    "cobalt",
    "dawn",
    "dracula",
    "dreamweaver",
    "eclipse",
    "gruvbox",
    "iplastic",
    "kr_theme",
    "merbivore",
    "mono_industrial",
    "nord_dark",
    "pastel_on_dark",
    "sqlserver",
    "textmate",
    "tomorrow",
];

// const themes = darkmodeThemes.concat(lightmodeThemes);
let themes = [
    "monokai",
    "github",
    "chaos",
    "tomorrow",
    "kuroir",
    "twilight",
    "xcode",
    "textmate",
    "solarized_dark",
    "solarized_light",
    "terminal",
    "ambiance",
    "chrome",
    "clouds",
    "cobalt",
    "dawn",
    "dracula",
    "dreamweaver",
    "eclipse",
    "gob",
    "gruvbox",
    "iplastic",
    "katzenmilch",
    "kr_theme",
    "merbivore",
    "mono_industrial",
    "nord_dark",
    "pastel_on_dark",
    "sqlserver",
    "textmate",
    "tomorrow",
];
// "clouds-midnight",
// "crimson-editor",
// "idle-fingers",
// "merbivore-soft",
// "one_dark",
// "tomorrow-night",
// "tomorrow-night-blue",
// "tomorrow-night-bright",
// "tomorrow-night-eighties",
// "vibrant",

languages.forEach(lang => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
});
themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));




const initialTexteditorSettings = {
    placeholder: "Write some code",
    theme: "monokai",
    themes: darkmodeThemes,
    darkmode: true,
    mode: "python",
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    fontSize: 14,
    showGutter: true,
    showPrintMargin: false,
    highlightActiveLine: true,
    enableSnippets: true,
    showLineNumbers: true,
    compile: 0,
    // value: "def Fibonacci(n):\n  if n<0:\n    return\n  elif n==1:\n    return 0\n  elif n==2:\n        return 1\n  else:\n    return Fibonacci(n-1)+Fibonacci(n-2)\n\nprint(Fibonacci(30))",
    currentQuestion: initialQuestionState,
    currentQuestionURl: "",
    UpperLeft: 0,
    UpperLeftActive: 0,
};


export function Texteditor(props) {
    const [settings, set_settings] = useState(initialTexteditorSettings)
    const [loading, setLoading] = useState([false]);
    const [layoutState, set_layoutState] = useState();
    const primaryEditor = useRef();
    const location = useLocation();


    useEffect(() => {
        if (settings.darkmode){
            set_settings({...settings, themes: darkmodeThemes, theme: darkmodeThemes[0] })
        }
        else {
            set_settings({...settings, themes: lightmodeThemes, theme: lightmodeThemes[0] })
        }
    }, [settings.darkmode])

    useEffect(() => {
        setLoading(true);
        let fetchQuestion = async () => {
            if (props.randomQuestion){
                    var title = database.ref("questions/");
                        title.on("value", (snapshot) => {
                            const data = snapshot.val();
                            let result = [];
                            for (let i in data){
                                result.push(data[i]);
                                break;
                            }
                            set_settings({...settings, currentQuestion: result[0] })
                        });

            }
            else if (props.location.state) {
                set_settings({ ...settings, currentQuestion: props.location.state.question })
                console.log(props.location.state.question )
            }
            else {
                const questionUrl = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
                console.log(questionUrl)
                var title = database.ref("questions/").orderByChild("title").equalTo(questionUrl);
                title.on("value", (snapshot) => {
                        let foo
                        snapshot.forEach(function(childSnapshot) {
                            foo = childSnapshot.key;
                        });
                        const data = snapshot.val();
                        let result = [];
                        for (let i in data){
                            result.push(data[i]);
                            break;
                        }
                        set_settings({...settings, currentQuestion: result[0], currentQuestionURl: foo })
                    });
            }
        }
        fetchQuestion()
            setLoading(false);
    }, [])



    function resize_editor() {
        window.dispatchEvent(new Event("resize")); //trigrer en resize event som oppdatereer editor størrelsen
    }

    function getLayoutState () {

        const item = window.localStorage.getItem("re-flex-storage-demo")

    if (item) {
        return JSON.parse(item)
    }

        return {
            appPane: {
                flex: 0.8
            },
            rightPane: {
                flex: 0.2
            }
        }
    }

    function onResizePane (event) {
        const { name, flex } = event.target.props
        this.layoutState[name].flex = flex

        window.localStorage.setItem("re-flex-storage-demo", JSON.stringify(this.layoutState))
    }




    function BoxNavChange(quadrant,index,e) {
        console.log(settings)
        // e.preventDefault();
        // console.log(quadrant)
        if (quadrant === 2){
            set_settings({ ...settings, UpperLeft: index });
        }
    }

    function compile() {
        set_settings({ ...settings, compile: settings.compile += 1 });
    }

    if (loading) {
        return <h2 className="dark-text">Loading...</h2>;
    }

    return (
        <div class="texteditor-wrapper">
            <EditorContext.Provider value={{ settings, set_settings }}>
                <EditorNav set_settings={ set_settings } ></EditorNav>

            <div class="modules">
                {/* venstre */}
                <ReflexContainer className="change-orientation"   ReflexContainer  orientation="vertical" >
                    <ReflexElement  className="change-orientation" >
                        <ReflexContainer    ReflexContainer  orientation="horizontal">
                            <ReflexElement name="upper-left" >
                                <div class="boxes">
                                    <div class="nav">
                                        <button className={(settings.UpperLeft === 0) ? "active": null} onClick={(e) => BoxNavChange(2,0, e)}>Promt</button>
                                        <button className={(settings.UpperLeft === 1) ? "active": null} onClick={(e) => BoxNavChange(2,1, e)}>Discuss</button>
                                    </div>
                                    <div class="box-content">
                                        <BoxNav listen={settings.UpperLeft} firstChild={
                                            <>
                                                <Question/>
                                                <h2>Hint:</h2>
                                                <div className="test-case">
                                                    <Editor value={settings.currentQuestion.hints} />
                                                </div>
                                                <h2>Optimal space and time complexity:</h2>
                                                <div className="test-case">
                                                    <Editor value={settings.currentQuestion.complexity} />
                                                </div>
                                            </>
                                            } secondChild={<Discussion/>}/>
                                    </div>
                                    {/* upper left */}
                                </div>
                            </ReflexElement>

                            <ReflexSplitter className="horizontal" ></ReflexSplitter>

                            <ReflexElement name="lower-left">
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
                    <ReflexElement className="change-orientation" >
                        <ReflexContainer ReflexContainer  orientation="horizontal">

                            <ReflexElement name="upper-right" onResize={resize_editor}>
                                <div class="boxes">
                                    <div class="nav">
                                        <button class="active">ygysefgy</button>
                                        <button>ygysefgy</button>
                                        <div class="nav_spacer"></div>
                                        <button class="submit" onClick={compile}>Submit code</button>
                                    </div>
                                    <div class="box-content editor">
                                        <CodeEditor />
                                    </div>

                                        {/* upper right */}
                                </div>
                            </ReflexElement>

                            <ReflexSplitter className="horizontal"></ReflexSplitter>

                            <ReflexElement name="lower-right" >
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





function BoxNav(props) {
    // console.log(props.listen)
    // useEffect(() => {
        if (props.listen === 0){
            return props.firstChild;
        }
        else if (props.listen === 1){
            return props.secondChild;
        }
        else if (props.listen === 2){
            return props.thirdChild;
        }
    // }, [props.listen])
}
