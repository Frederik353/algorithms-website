
import React, { useContext, useEffect } from "react";
import AceEditor from "react-ace";
import { EditorContext } from "../../pages/texteditor/texteditor"






export function CodeEditor() {
    const { settings, set_settings } = useContext(EditorContext);

    function onChange(newValue) {
        set_settings({ ...settings, value: newValue });
    }

    function onSelectionChange(newValue, event) {
        // console.log("select-change", newValue);
        // console.log("select-change-event", event);
    }

    function onCursorChange(newValue, event) {
        // console.log("cursor-change", newValue);
        // console.log("cursor-change-event", event);
    }

    function onValidate(annotations) {
        // console.log("onValidate", annotations);
    }

    // function setPlaceholder(e) {
    //     set_settings({ ...settings, placeholder: e.target.value });
    // }


    // bug callback
    useEffect(() => {
        set_settings({ ...settings, value: settings.currentQuestion.functions.[settings.mode] });
    },[settings.mode]);

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
