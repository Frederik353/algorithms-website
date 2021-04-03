import "./remote_code.scss"

import React, { useState, useContext, useEffect } from "react";
import { EditorContext } from "../../pages/texteditor/texteditor"

export function RemoteCodeApiRequest() {
    const [apiResponse, set_apiResponse] = useState();
    const { settings } = useContext(EditorContext);
    
    useEffect(() => {
        console.log(settings.compile)
        if (settings.compile !== 0){
            
            // POST request using fetch inside useEffect React hook
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
	                "src": settings.value,
	                "stdin":"",
	                "lang":"python3",
	                "timeout":10
                })
            };
            fetch("http://127.0.0.1:7000/submit", requestOptions)
                .then(response => response.text())
                .then(data => {
                    let i = 0;
                    
                    do{
                        i++
                        setTimeout(function () {
                            fetch(data, {method: "GET"})
                                .then(response => response.text())
                                .then(data => JSON.parse(data))
                                .then(data => {
                                    
                                    if (data.status === "Processing"){
                                        set_apiResponse(data.status);
                                    }
                                    else if (data.output === ""){
                                        set_apiResponse(data.stderr);
                                    }
                                    else{
                                        set_apiResponse(data.output);
                                    }
                                    
                                });
                            }, 100 * i^2);
                        
                    } while(((apiResponse === "Processing") && (apiResponse !== "timeout\n"))  && (i < 100)
                    );
                set_apiResponse(data.output);
            });
        }
    }, [settings.compile]);


    if (apiResponse === undefined){
        return(
        <div class="center">
            <p class="before-submit">Click submit code when you are ready</p>
        </div>
        );
    }
    else if (apiResponse === "Processing"){
        return(
            <div class="center">
                <p class="api-error">Somthing went wrong :(</p>
            </div>
        );
    }
    else{
        
        return (
            <div className="center">
                {apiResponse}
            </div>
        );
    }
}