import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

// reflex
import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement
} from "react-reflex"


import  initialQuestionState  from "../../helpers/databaseStructure/questions"
import { database } from "../../helpers/config";
import "./texteditor.scss";
import "react-reflex/styles.css";
import { RemoteCodeApiRequest } from "../../components/remote_code/remote_code"
import { EditorNav } from "../../components/editor_nav/editor_nav"
import { CodeEditor } from "../../components/ace_editor/ace_editor"
import { Discussion } from "../../components/discussion/discussion"
import { ResizeFunction } from "../../helpers/screen-size"



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
    "kuroir",
    "xcode",
    "katzenmilch",
    "solarized_light",
    "textmate",
    "chrome",
    "clouds",
    "dawn",
    "dreamweaver",
    "eclipse",
    "iplastic",
    "sqlserver",
    "tomorrow",
];


const darkmodeThemes = [
    "chaos",
    "monokai",
    "gob",
    "ambiance",
    "dracula",
    "twilight",
    "solarized_dark",
    "terminal",
    "cobalt",
    "gruvbox",
    "kr_theme",
    "merbivore",
    "mono_industrial",
    "nord_dark",
    "pastel_on_dark",
];

let themes = darkmodeThemes.concat(lightmodeThemes); // for å importere dependencies for hvert theme


languages.forEach(lang => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
});
themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));




const initialTexteditorSettings = {
    placeholder: "Write some code",
    theme: "chaos",
    themes: darkmodeThemes,
    darkmode: true,
    mode: "",
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    fontSize: 14,
    showGutter: true,
    showPrintMargin: false,
    highlightActiveLine: true,
    enableSnippets: true,
    showLineNumbers: true,
    compile: 0,
    currentQuestion: initialQuestionState,
    currentQuestionURl: "",
    UpperLeft: 0,
    UpperLeftActive: 0,
};


export function Texteditor(props) {
    const [settings, set_settings] = useState(initialTexteditorSettings)
    const [loading, setLoading] = useState([false]);
    const [layoutState, set_layoutState] = useState();
    const [orientation, set_orientation] = useState({});
    const location = useLocation();


    useEffect(() => {
        if (settings.darkmode){
            set_settings({...settings, themes: darkmodeThemes, theme: darkmodeThemes[0] })
        }
        else {
            set_settings({...settings, themes: lightmodeThemes, theme: lightmodeThemes[0] })
        }
        // eslint-disable-next-line
    }, [settings.darkmode])

    useEffect(() => {
        if (settings.screenWidth !== undefined) {

            if (settings.screenWidth < 800) {
                set_orientation({...orientation, vertical: "horizontal", horizontal: "vertical" })
            }
            else {
                set_orientation({...orientation, vertical: "vertical", horizontal: "horizontal" })
            }
        }
    }, [settings.screenWidth])



    useEffect(() => {
        setLoading(true);
        let fetchQuestion = async () => {
            if (props.randomQuestion){
                    var RandomTitle = database.ref("questions/");
                        RandomTitle.on("value", (snapshot) => {
                            const data = snapshot.val();
                            let result = [];
                            for (let i in data){
                                result.push(data[i]);
                                break;
                            }
                            set_settings({...settings, currentQuestion: result[0], mode: "python"})
                        });
            }
            else if (props.location.state) {
                set_settings({ ...settings, currentQuestion: props.location.state.question, mode: "python" })
                console.log(props.location.state.question )
            }
            else {
                const questionUrl = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
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
                        set_settings({...settings, currentQuestion: result[0], currentQuestionURl: foo, mode: "python"})
                    });
            }
        }
        fetchQuestion()
            setLoading(false);
    // eslint-disable-next-line
    }, [])


    useEffect(() => { //oppdaterer skjermstørrelse state når alt er ferdig lastet som forsikrer at alle komponenter avhengig av skjermstørrelkse får riktig verdi
        window.dispatchEvent(new Event("resize"));
    },[settings.currentQuestion])

    function resize_editor() {
        window.dispatchEvent(new Event("resize")); //trigrer en resize event som oppdatereer editor størrelsen
    }

    // function getLayoutState () {
    //     if(layoutState){//error
    //         set_layoutState(null)
    //     }
    //     const item = window.localStorage.getItem("re-flex-storage-demo")

    // if (item) {
    //     return JSON.parse(item)
    // }

    //     return {
    //         appPane: {
    //             flex: 0.8
    //         },
    //         rightPane: {
    //             flex: 0.2
    //         }
    //     }
    // }

    // function onResizePane (event) {
    //     const { name, flex } = event.target.props
    //     this.layoutState[name].flex = flex

    //     window.localStorage.setItem("re-flex-storage-demo", JSON.stringify(this.layoutState))
    // }




    function BoxNavChange(quadrant,index,e) {
        console.log(settings)
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


    if (orientation.horizontal === "horizontal"){
    return (
        <div className="texteditor-wrapper">
            <EditorContext.Provider value={{ settings, set_settings }}>
                <EditorNav set_settings={ set_settings } ></EditorNav>

            <div className="modules">
                {/* venstre */}
                {/* {(settings.screenWidth < 800) ? <ReflexContainer orientation="vertical"> : <ReflexContainer orientation="horizontal"> } */}
                <ReflexContainer orientation={orientation.vertical} className={orientation.vertical}>
                    <ReflexElement>
                        <ReflexContainer orientation="horizontal">
                            <ReflexElement name="upper-left" >
                                <div className="boxes">
                                    <div className="nav">
                                        <button className={(settings.UpperLeft === 0) ? "active": null} onClick={(e) => BoxNavChange(2,0, e)}>Promt</button>
                                        <button className={(settings.UpperLeft === 1) ? "active": null} onClick={(e) => BoxNavChange(2,1, e)}>Discuss</button>
                                    </div>
                                    <div className="box-content">
                                        <BoxNav listen={settings.UpperLeft} firstChild={
                                            <>
                                                <Question/>
                                                <h2>Hint:</h2>
                                                <div className="test-case">
                                                    <Editor value={ settings.currentQuestion.hints } />
                                                </div>
                                                <h2>Optimal space and time complexity:</h2>
                                                <div className="test-case">
                                                    <Editor value={ settings.currentQuestion.complexity } />
                                                </div>
                                            </>
                                            } secondChild={<Discussion/>}/>
                                    </div>
                                    {/* upper left */}
                                </div>
                            </ReflexElement>

                            <ReflexSplitter  className="horizontal"/>

                            <ReflexElement name="lower-left">
                                <div className="boxes">
                                    <div className="nav">
                                        <button>? ? ? ? ?</button>
                                        <button>? ? ? ? ?</button>
                                        <button>? ? ? ? ?</button>
                                    </div>
                                    <div className="box-content">
                                        <TestCases />
                                    </div>
                                    {/* lower left */}
                                </div>
                            </ReflexElement>

                        </ReflexContainer>
                    </ReflexElement>

                    {/* midtsplitter */}
                    <ReflexSplitter className={orientation.vertical} />

                    {/* høyre */}
                    <ReflexElement >
                        <ReflexContainer  orientation="horizontal" >

                            <ReflexElement name="upper-right" onResize={resize_editor}>
                                <div className="boxes">
                                    <div className="nav">
                                        <button className="active">? ? ? ? ?</button>
                                        <button>? ? ? ? ?</button>
                                        <div className="nav_spacer"></div>
                                        <button className="submit" onClick={compile}>Submit code</button>
                                    </div>
                                    <div className="box-content editor">
                                        <CodeEditor />
                                    </div>

                                        {/* upper right */}
                                </div>
                            </ReflexElement>

                            <ReflexSplitter className="horizontal" />

                            <ReflexElement name="lower-right" >
                                <div className="boxes">
                                    <div className="nav">
                                        <button>? ? ? ? ?</button>
                                        <button>? ? ? ? ?</button>
                                        <button>? ? ? ? ?</button>
                                    </div>
                                    {/* lower right */}
                                    <div className="box-content">
                                        <RemoteCodeApiRequest></RemoteCodeApiRequest>
                                    </div>
                                </div>
                            </ReflexElement>

                        </ReflexContainer>
                    </ReflexElement>

                </ReflexContainer>
            </div>
            <ResizeFunction/>
            </EditorContext.Provider>
        </div>
    );
    }
    else{
        return (
        <div className="texteditor-wrapper">
            <EditorContext.Provider value={{ settings, set_settings }}>
                <EditorNav set_settings={ set_settings } ></EditorNav>

            <div className="modules">
                {/* venstre */}
                {/* {(settings.screenWidth < 800) ? <ReflexContainer orientation="vertical"> : <ReflexContainer orientation="horizontal"> } */}
                <ReflexContainer orientation={orientation.vertical} className={orientation.vertical}>
                    {/* <ReflexElement>
                        <ReflexContainer orientation="horizontal"> */}
                            <ReflexElement name="upper-left" >
                                <div className="boxes">
                                    <div className="nav">
                                        <button className={(settings.UpperLeft === 0) ? "active": null} onClick={(e) => BoxNavChange(2,0, e)}>Promt</button>
                                        <button className={(settings.UpperLeft === 1) ? "active": null} onClick={(e) => BoxNavChange(2,1, e)}>Discuss</button>
                                    </div>
                                    <div className="box-content">
                                        <BoxNav listen={settings.UpperLeft} firstChild={
                                            <>
                                                <Question/>
                                                <h2>Hint:</h2>
                                                <div className="test-case">
                                                    <Editor value={ settings.currentQuestion.hints } />
                                                </div>
                                                <h2>Optimal space and time complexity:</h2>
                                                <div className="test-case">
                                                    <Editor value={ settings.currentQuestion.complexity } />
                                                </div>
                                            </>
                                            } secondChild={<Discussion/>}/>
                                    </div>
                                    {/* upper left */}
                                </div>
                            </ReflexElement>

                            <ReflexSplitter  className="horizontal"/>

                            <ReflexElement name="lower-left">
                                <div className="boxes">
                                    <div className="nav">
                                        <button>? ? ? ? ?</button>
                                        <button>? ? ? ? ?</button>
                                        <button>? ? ? ? ?</button>
                                    </div>
                                    <div className="box-content">
                                        <TestCases />
                                    </div>
                                    {/* lower left */}
                                </div>
                            </ReflexElement>

                        {/* </ReflexContainer>
                    </ReflexElement> */}

                    {/* midtsplitter */}
                    <ReflexSplitter className={orientation.vertical} />

                    {/* høyre */}
                    {/* <ReflexElement >
                        <ReflexContainer  orientation="horizontal" > */}

                            <ReflexElement name="upper-right" onResize={resize_editor}>
                                <div className="boxes">
                                    <div className="nav">
                                        <button className="active">? ? ? ? ?</button>
                                        <button>? ? ? ? ?</button>
                                        <div className="nav_spacer"></div>
                                        <button className="submit" onClick={compile}>Submit code</button>
                                    </div>
                                    <div className="box-content editor">
                                        <CodeEditor />
                                    </div>

                                        {/* upper right */}
                                </div>
                            </ReflexElement>

                            <ReflexSplitter className="horizontal" />

                            <ReflexElement name="lower-right" >
                                <div className="boxes">
                                    <div className="nav">
                                        <button>? ? ? ? ?</button>
                                        <button>? ? ? ? ?</button>
                                        <button>? ? ? ? ?</button>
                                    </div>
                                    {/* lower right */}
                                    <div className="box-content">
                                        <RemoteCodeApiRequest></RemoteCodeApiRequest>
                                    </div>
                                </div>
                            </ReflexElement>

                        {/* </ReflexContainer>
                    </ReflexElement> */}

                </ReflexContainer>
            </div>
            <ResizeFunction/>
            </EditorContext.Provider>
        </div>
    );
    }
}



function ContainerOrientation (props){

    if (props.orientationHorizontal === "horizontal"){

        return(
            <>

                    <ReflexContainer orientation="horizontal">
                        props.right
                    </ReflexContainer>
            </>
        )
    }
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
