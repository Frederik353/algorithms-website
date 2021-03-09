import React, { useState } from "react";

// Styles
// import "prismjs/themes/prism-solarizedlight.css"
import "./lang_select.scss";

// Components
import CodeEditor from "../code_editor/code_editor";

export default function Lang_Select() {
    const [editorLanguage, setEditorLanguage] = useState("javascript");

    return (
        <div className="Lang_Select">

            <fieldset>
                <legend>Choose language:</legend>
                <input
                    type="radio"
                    id="javascript"
                    name="language"
                    value="javascript"
                    checked={editorLanguage === "javascript"}
                    onChange={() => setEditorLanguage("javascript")}
                />
                <label htmlFor="javascript">JavaScript</label>
                <input
                    type="radio"
                    id="python"
                    name="language"
                    value="python"
                    checked={editorLanguage === "python"}
                    onChange={() => setEditorLanguage("python")}
                />
                <label htmlFor="python">python</label>
                <input
                        type="radio"
                        id="css"
                        name="language"
                        value="css"
                        checked={editorLanguage === "css"}
                        onChange={() => setEditorLanguage("css")}
                    />
                <label htmlFor="css">CSS</label>
            </fieldset>

            <CodeEditor language={editorLanguage} />
        </div>
    );
}
