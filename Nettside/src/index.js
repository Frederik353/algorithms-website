import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './App';
// import { landing_page } from './pages/landing_page/landing_page.js';
// import { NavBar } from './components/navbar/navbar';



// ReactDOM.render(
//     <div> 
//         <landing_page />
//         <h1>lpøkodprkg </h1>
//     </div>
//     ,
//     document.getElementById("root")
// );


ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);


