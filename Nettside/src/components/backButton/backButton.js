
import React from 'react';
import {useHistory} from "react-router-dom";



export const BackButton = (props) => {
    const history = useHistory();
    return(
    <button onClick={() => history.goBack()} className={props.className}>{props.children}</button>
    );
}

