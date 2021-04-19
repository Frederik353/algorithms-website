

import { EditorContext} from "../../pages/texteditor/texteditor"
import React, { useContext } from "react";

import "./promt.scss"


export function Question(props) {
    const { settings} = useContext(EditorContext);
    return(
        <div class="currentQuestion">
            <div class="info-box">
                <div class="info">
                    <span>Difficulty:</span>
                    <div className="difficulty">
                        <span className={settings.currentQuestion.difficulty}  ></span>
                    </div>
                </div>
                <div class="info">
                    <span>Category:</span>
                    <span>{settings.currentQuestion.category}</span>
                </div>
            </div>
            <h1>{settings.currentQuestion.title}</h1>
            <div>
                {settings.currentQuestion.question}
            </div>
        </div>
    )
}
