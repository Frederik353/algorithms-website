

import { EditorContext} from "../../pages/texteditor/texteditor"
import React, { useContext } from "react";

import "./promt.scss"


export function Question(props) {
    const { settings} = useContext(EditorContext);
    return(
        <div className="question">
            <div className="info-box">
                <div className="info">
                    <span>Difficulty:</span>
                    <div className="difficulty">
                        <span className={settings.currentQuestion.difficulty}  ></span>
                    </div>
                </div>
                <div className="info">
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
