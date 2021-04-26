import "./test_cases.scss"

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools.js"
import "ace-builds/src-noconflict/mode-jsx";
import { EditorContext} from "../../pages/texteditor/texteditor"
import React, { useContext } from "react";

export function TestCases(){
    const { settings} = useContext(EditorContext);
    let testCaseArray = [];
    let testCaseCounter = 1;
    let testCases = settings.currentQuestion.testCases;
    if (typeof testCases === "object"){
        for (let i in testCases){
            testCaseArray.push(testCases[i]);
        }
    }
    else {
        testCaseArray.push(testCases);
    }

    return(
        <>
            {testCaseArray.map(testCase => (
                <div key={testCase}  className="test-case">
                    <h2>Test case {testCaseCounter++}</h2>
                    <Editor value={testCase} />
                </div>
            ))}
        </>
    )
}

export function Editor(props) {
    const { settings} = useContext(EditorContext);
    // console.log(props.value)
    return(
        <AceEditor
            mode="javascript"
            theme={settings.theme}
            name="sefkop"
            className="test-case no-write-editor"
            value={props.value}
            fontSize={18}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={false}
            readOnly={true}
            wrapEnabled={true}
            setOptions={{
                showLineNumbers: true,
                tabSize: 2
            }}
        >
        </AceEditor>
    )
}