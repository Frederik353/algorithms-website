import "./discussion.scss"

import React, { useContext, useRef, useState } from "react";
import { EditorContext} from "../../pages/texteditor/texteditor"
import { database } from "../../helpers/config";
import { useAuth } from "../../helpers/authentication-context"



export function Discussion() {
    const { settings, set_settings} = useContext(EditorContext); // editor state
    const scrollToRef = useRef(); // skroller nederst ved sending av melding
    const { currentUser } = useAuth();
    const messagesRef = database.ref("questions/" + settings.currentQuestionURl + "/posts"); // hvor meldingene skal lagres, viktig pga en chat til hver oppgave
    // const query = messagesRef.orderByChild('createdAt'); // sortere etter når meldingene ble sendt slik at vi får de siste meldingene nederst
    const [formValue, setFormValue] = useState(''); // state for å lagre hva som er skrevet i tekstboks

    let messages = []; // lager array av meldingene for å kunne mappe til en melding hver
    for (let i in settings.currentQuestion.posts){
        messages.push(settings.currentQuestion.posts[i])
    }


    const sendMessage = async (e) => { // laster opp ny melding
        e.preventDefault(); // hindrer siden i å reloade siden dette er default for første onclick event inne i en form tag men uønskelig i dette tilfellet
        const uid = currentUser.uid;
        const photoURL  = currentUser.photoURL;
         // klokken når meldingen blir sendt, ikke optimalt siden dette er basert på den lokale tiden på enheten men burde istedtet settes i backend av server/database
        await messagesRef.push({
            createdAt: new Date().getTime(),
            uid,
            text: formValue,
            photoURL
        })
        set_settings({ ...settings, UpperLeft: 1 });
        setFormValue(''); //resetter meldingbox
        // scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <div className="messages">
                {messages && messages.map(msg => <Posts key={msg.id} message={msg} />)}  {/* mapper meldinger array til en melding hver */}
                {/* <Posts message={messages[0]} /> */}
                <span ref={scrollToRef}></span> {/* skroll neders onsubmit */}
            </div>
            <form className="chatform" onSubmit={(e) => sendMessage(e)}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Message" />
                <button type="submit" disabled={!formValue}>🚀</button>
            </form>
        </>
    )
}



function Posts(props) {
    // console.log(props.message)
    const { createdAt ,photoURL, text, uid,} = props.message; //declarerer variabler fra paramentere
    const { currentUser } = useAuth();
    console.log(currentUser.uid, uid)
    const messageClass = (uid === currentUser.uid ? "sent" : "received"); // setter melding klasse til sent hvis bruker iden er lik din og received hvis ikke
    return (<>
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'data:image/png;base64,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'} alt="Profile pic" /> {/* Hvis profilbildet ikke finnes sett bilde til standard avatar, viktig siden login med email ikke gir profilbilde */}
            <p>{text}</p>
            <p className="timestamp">{createdAt}</p>
        </div>
    </>)
}

