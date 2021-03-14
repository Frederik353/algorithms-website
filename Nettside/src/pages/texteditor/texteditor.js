import React from "react";

import { Route, Switch, Link } from "react-router-dom";
import "./texteditor.scss";
import "../../components/code_editor/code_editor";
import "react-reflex/styles.css";

import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement,
    ReflexHandle
} from "react-reflex"
import "../../helpers/screen-size";
import { useDetectOutsideClick } from "../../components/dropdown/dropdown";
import CodeEditor from "../../components/code_editor/code_editor";
import { Settings } from "../../components/code_editor/code_editor";

// import Test  from "../../components/lang-select/lang_select";

import { Editor_Settings } from "../../components/code_editor/code_editor";



export const texteditor = () => {
    return (
        <div class="wrapper">
            <div class="toolbar">
              <Editor_Settings></Editor_Settings>
            </div>
            <div class="editor">
                {/* venstre */}
                <ReflexContainer className="change-orientation"   ReflexContainer  orientation="vertical" >
                    <ReflexElement  className="change-orientation" minSize="20">
                        <ReflexContainer    ReflexContainer  orientation="horizontal">
                            <ReflexElement  minSize="20" >
                                <div class="boxes">
                                   {/* upper left */}
                                </div>

                            </ReflexElement>

                            <ReflexSplitter className="horizontal" ></ReflexSplitter>

                            <ReflexElement minSize="20">
                                <div class="boxes">
                                        {/* lower left */}
                                </div>
                            </ReflexElement>

                        </ReflexContainer>
                    </ReflexElement>

{/* midtsplitter */}
                    <ReflexSplitter className="change-orientation vertical" ></ReflexSplitter>

{/* høyre */}
                    <ReflexElement className="change-orientation" minSize="20">
                        <ReflexContainer ReflexContainer  orientation="horizontal">

                            <ReflexElement minSize="20">
                                <div class="boxes">
                                        {/* upper right */}
                                        <CodeEditor></CodeEditor>
                                        
                                </div>
                            </ReflexElement>

                            <ReflexSplitter className="horizontal"></ReflexSplitter>

                            <ReflexElement minSize="20" >
                                <div class="boxes">
                                        {/* lower right */}
                                </div>
                            </ReflexElement>

                        </ReflexContainer>
                    </ReflexElement>

                </ReflexContainer>
            </div>

        </div>
    );
}

// export default { texteditor };




