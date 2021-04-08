import "./remote_code.scss"

import React, { useState, useContext, useEffect } from "react";
import { EditorContext } from "../../pages/texteditor/texteditor"


const initialApiState = {
    apiStatus: undefined,
    apiOutput: undefined,
    apiStderr: undefined,
    responseStatus: undefined,
    // render: "not_been_run",
};

export function RemoteCodeApiRequest() {
    const  [apiState, set_apiState ] = useState(initialApiState);
    const  [render, set_render ] = useState("not_been_run");

    const { settings } = useContext(EditorContext);
    useEffect(() => {
        // if (settings.compile !== 0){

            set_render("loading")
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
	                "src": settings.value,
	                "stdin":"",
	                "lang":"python3",
	                "timeout":5
                })
            };
            fetch("http://127.0.0.1:7000/submit", requestOptions)
                .then(response => response.text())
                .then(data => {
                    let i = 0;
                    let foo = 0;
                        var interval = setInterval(function () {
                            i++
                            if ((( foo !== 200))  && (i < 100)){
                                fetch(data, {method: "GET"})
                                    .then(response => {
                                        foo = response.status;
                                        return response.text()
                                    })
                                    .then(data => JSON.parse(data))
                                    .then(data => {
                                        set_apiState({...apiState, apiStatus: data.status, apiOutput: data.output, apiStderr: data.stderr, responseStatus: foo})
                                    });
                            } else{
                                clearInterval(interval);
                                // console.log("cleared inteval")
                            }
                        }, 10000);
                    })
                    .then(render => {
                        // if ( apiState.responseStatus !== 200 ){
                        //     set_render("gone_wrong")
                        // }
                        // else if ( apiState.apiOutput !== (undefined || "" )){
                        //     set_render("result")
                        //     console.log( apiState.responseStatus, apiState.apiOutput )
                        // }
                        // else if ( apiState.apiStderr !== (undefined || "") ){
                        //     set_render("error")
                        // }
                    })
                // }
            }, [settings.compile]);

    if (render === "not_been_run"){
        return(
        <div class="center">
            <p class="before-submit">Click submit code when you are ready</p>
        </div>
        );
    }
    else if (render === "loading"){
        return(
            <div class="center">
                <div className="loader-wrapper center">
                    <div class="loader">Loading...</div>
                </div>
            </div>
        );
    }
    else if (render === "gone_wrong"){
        return(
            <div class="center">
                <p class="api-error">Somthing went wrong</p>
            </div>
        );
    }
    else if (render === "result"){
        return (
            <div>
                {apiState.apiOutput}
            </div>
        );
    }
    else if (render === "error"){
        return (
            <div>
                {apiState.apiStderr}
            </div>
        );
    }
}