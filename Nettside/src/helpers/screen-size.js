import { EditorContext } from "../pages/texteditor/texteditor"
import { useContext, useEffect } from "react";


function debounce(fn, ms) {
    let timer
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}




export function ResizeFunction() {
    const { settings, set_settings } = useContext(EditorContext);

    useEffect(() => {
        set_settings({ ...settings, screenHeight: window.innerHeight, screenWidth: window.innerWidth });
    },[]);

    useEffect(() => {

        const slowerHandleResize = debounce(function () {
            set_settings({ ...settings,
                screenHeight: window.innerHeight,
                screenWidth: window.innerWidth
            });
        }, 10);
        window.addEventListener('resize', slowerHandleResize)
        return _ => {
            window.removeEventListener('resize', slowerHandleResize)
        }
    })
    return <></>
    // return <div>Rendered at {settings.screenWidth} x {settings.screenHeight}</div>
}


