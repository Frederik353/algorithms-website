import "./EditorList.scss"

import { ReadOnlyEditor } from "../ReadOnlyEditor/ReadOnlyEditor"

export function EditorList(props){
    let resultArray = [];
    let Counter = 1;
    let object = props.object;
    if (typeof object === "object"){
        for (let i in object){
            resultArray.push(object[i]);
        }
    }
    else {
        resultArray.push(object);
    }

    return(
        <>
            {resultArray.map(object => (
                <div key={object}  className="test-cases">
                    <h2>{props.name} {Counter++}</h2>
                    <ReadOnlyEditor value={object} />
                </div>
            ))}
        </>
    )
}
