import "./test_cases.scss"

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools.js"
import "ace-builds/src-noconflict/mode-jsx";


export function Test_cases(){
    return(
        <div class="test">
            <h2>Test case 1</h2>
            <Editor value= "def Fibonacci(n): \n    if n<0:\n   elif n==1:\n        return 0\n  elif n==2:\n        return 1\n  else:\n     return Fibonacci(n-1)+Fibonacci(n-2)\nprint(Fibonacci(9)) " ></Editor>
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
            className=""
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