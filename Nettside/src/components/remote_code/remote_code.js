import "./remote_code.scss"

import React, { useState, useContext, useEffect } from "react";
import { EditorContext } from "../../pages/texteditor/texteditor"


const initialApiState = {
    statusCode: undefined,
    apiStatus: undefined,
    apiOutput: undefined,
    apiStderr: undefined
};

export function RemoteCodeApiRequest() {
    const [apiState, set_apiState] = useState(initialApiState);

    const { settings } = useContext(EditorContext);
    
    useEffect(() => {
        // console.log(settings.compile)
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
                        var interval = setInterval(function () {
                            i++
                            if (( apiState.statusCode !== 200)  && (i < 10)){
                                fetch(data, {method: "GET"})
                                    .then(response => {
                                        set_apiState({statusCode: response.status});
                                        return response.text()
                                    })
                                    .then(data => JSON.parse(data))
                                    .then(data => {
                                        // set_apiResponse(data.output);
                                        set_apiState({apiStatus: data.status});
                                        set_apiState({apiOutput: data.output});
                                        
                                        // if (data.status === "Processing"){
                                        //     set_apiResponse(data.status);
                                        //     reponse = data.status
                                        // }
                                        // else if (data.output === ""){
                                        //     set_apiResponse(data.stderr);
                                        //     reponse = data.stderr
                                        // }
                                        // else{
                                        //     set_apiResponse(data.output);
                                        //     reponse = data.output
                                        // }
                                    });
                                    console.log(apiState.apiStatus, apiState.apiStderr, apiState.statusCode)
                                    console.log((( apiState.statusCode !== 200)  && (i < 100)))
                                } else{
                                    clearInterval(interval);
                                    console.log("cleared inteval")
                                }

                            }, 1000);
                            
                            // } while(((apiStatus !== "success\n"))  && (i < 100));
                        // } while((( apiState.apiStatus !== 200)  && (i < 100)));
                // console.log(response)
                // set_apiResponse(response);
            });
        }
    }, [settings.compile]);


    if (apiState.apiOutput === undefined){
        return(
        <div class="center">
            <p class="before-submit">Click submit code when you are ready</p>
        </div>
        );
    }
    // else if (apiResponse === "Processing"){
    //     return(
    //         <div class="center">
    //             <p class="api-error">Somthing went wrong :(</p>
    //         </div>
    //     );
    // }
    else{
        
        return (
            <div>
                {apiState.apiOutput}
            </div>
        );
    }
}