import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

import "ace-builds/src-noconflict/mode-jsx";
const languages = [
    "javascript",
    "java",
    "python",
    "golang",
    "c_cpp"
];

const themes = [
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

const defaultValue = `function onLoad(editor) {
    console.log("editor working");
}`;


















class CodeEditor extends Component {
    onLoad() {
        console.log("editor working");

    }
    onChange(newValue) {
        console.log("change", newValue);
        this.setState({
            value: newValue
        });
    }

    onSelectionChange(newValue, event) {
        console.log("select-change", newValue);
        console.log("select-change-event", event);
    }

    onCursorChange(newValue, event) {
        console.log("cursor-change", newValue);
        console.log("cursor-change-event", event);
    }

    onValidate(annotations) {
        console.log("onValidate", annotations);
    }

    setPlaceholder(e) {
        this.setState({
            placeholder: e.target.value
        });
    }
    setTheme(e) {
        this.setState({
            theme: e.target.value
        });
    }
    setMode(e) {
        this.setState({
            mode: e.target.value
        });
    }
    setBoolean(name, value) {
        this.setState({
            [name]: value
        });
    }
    setFontSize(e) {
        this.setState({
            fontSize: parseInt(e.target.value, 10)
        });
        console.log("fsdfesefsm")
    }
    constructor(props) {
        super(props);
        this.state = {
            value: defaultValue,
            placeholder: "",
            theme: "solarized_dark",
            mode: "python",
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: true,
            fontSize: 14,
            showGutter: true,
            showPrintMargin: false,
            highlightActiveLine: true,
            enableSnippets: true,
            showLineNumbers: true
        };
        this.setPlaceholder = this.setPlaceholder.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.setMode = this.setMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.setBoolean = this.setBoolean.bind(this);
    }
    render() {
        return (
            <div >
                <div>
                    <AceEditor
                        placeholder={this.state.placeholder}
                        mode={this.state.mode}
                        theme={this.state.theme}
                        name="adwmklk"
                        onLoad={this.onLoad}
                        onChange={this.onChange}
                        onSelectionChange={this.onSelectionChange}
                        onCursorChange={this.onCursorChange}
                        onValidate={this.onValidate}
                        value={this.state.value}
                        fontSize={this.state.fontSize}
                        showPrintMargin={this.state.showPrintMargin}
                        showGutter={this.state.showGutter}
                        highlightActiveLine={this.state.highlightActiveLine}
                        setOptions={{
                            useWorker: false,
                            enableBasicAutocompletion: this.state.enableBasicAutocompletion,
                            enableLiveAutocompletion: this.state.enableLiveAutocompletion,
                            enableSnippets: this.state.enableSnippets,
                            showLineNumbers: this.state.showLineNumbers,
                            tabSize: 2
                        }}
                    />
                </div>
            </div>
        );
    }
}



export class Editor_Settings extends CodeEditor {
  render () {
    return(
        <div >
                    <div className="field">
                        <p className="control">
                            <span className="select">
                                <select
                                    name="mode"
                                    onChange={this.setMode}
                                    value={this.state.mode}
                                >
                                    {languages.map(lang => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </p>
                    </div>

                    <div  iv className="field">
                        <p className="control">
                            <span className="select">
                                <select
                                    name="Theme"
                                    onChange={this.setTheme}
                                    value={this.state.theme}
                                >
                                    {themes.map(lang => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </p>
                    </div>

                    <div className="field">
                        <p className="control">
                            <span className="select">
                                <select
                                    name="Font Size"
                                    onChange={this.setFontSize}
                                    value={this.state.fontSize}
                                    >
                                    {[11, 12, 13, 14, 15, 16, 17, 18].map(lang => (
                                        <option key={lang} value={lang}>
                                        {lang}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </p>
                    </div>

                </div>
        )
    }
}


export default CodeEditor;