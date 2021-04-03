import "./test_cases.scss"

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools.js"
import "ace-builds/src-noconflict/mode-jsx";


export function TestCases(){
    return(
        <div class="test">
            <h2>Test case 1</h2>
            <Editor value= "{
                    Input: [ 0, 1, 1, 2, 3, 5, 13, 18, 31, 49],
                    Output: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                }"></Editor>
        </div>
    )
}


function Editor(props) {
    // console.log(props.value)
    return(
        <AceEditor
            mode="javascript"
            theme="monokai"
            name="sefokp"
            className="test-case"
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