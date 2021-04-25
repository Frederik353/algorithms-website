
import React from 'react';
import { useHistory } from "react-router-dom";

// tilbake knapp komponent fungerer på alle sider

export const BackButton = (props) => {
    const history = useHistory();

    return(
    <button onClick={() => history.goBack()} className={props.className}>{props.children}</button> // setter classen til knappen lik det specifisert og plaserer children av komponenten inne i knappen
    );
}

