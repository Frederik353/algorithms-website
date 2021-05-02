
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools.js"
import "ace-builds/src-noconflict/mode-jsx";
import React, { useContext } from "react";
import { EditorContext } from "../../pages/texteditor/texteditor"



export function ReadOnlyEditor(props) {
    const { settings} = useContext(EditorContext);

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