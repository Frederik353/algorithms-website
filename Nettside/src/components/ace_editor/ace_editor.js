
import React, { useContext, useEffect } from "react";
import AceEditor from "react-ace"; // importerer Aceeditor for syntax highlighting
import { EditorContext } from "../../pages/texteditor/texteditor" //editor state




export function CodeEditor() {
    const { settings, set_settings } = useContext(EditorContext); //editor state

    function onChange(newValue) {
        set_settings({ ...settings, value: newValue }); // opdaterer editor text
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


    useEffect(() => { // bug med callback funksjon
        set_settings({ ...settings, value: settings.currentQuestion.functions.[ settings.mode ] }); // oppdaterer startgunksjonen ved endring av språk
        
        // eslint-disable-next-line
    },[settings.mode]);

        return (
            <AceEditor
                placeholder={settings.placeholder} // viser hvis ingen text
                mode={settings.mode} // språk valg
                theme={settings.theme} // syntax highlighting theme  / farger
                name="AceEditor"
                onChange={onChange} // ved enring av innhold kjør funksjon som oppdaterer editor state
                onSelectionChange={onSelectionChange} // foreløpig ubrukt
                onCursorChange={onCursorChange} // foreløpig ubrukt
                onValidate={onValidate} // foreløpig ubrukt
                value={settings.value} // innghold i editor lik editor state value
                fontSize={settings.fontSize} // skriftsørrelse endres ved fontsize endring i editor state
                // de neste verdiene gjør det enklerere å endre senere hvis nødvendig, se pages/texteditor initialstate for verdier
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
                }}//tab størrelse for syntax highlighting
            />
        );
}
