import { Route, Switch} from 'react-router-dom';
import { Landing_page } from './pages/landing_page/landing_page.js';
import { Texteditor } from "./pages/texteditor/texteditor"
import About from './pages/About';

function App() {
	return (
		<div className="App">

		{/* link til alle nettsider */}
			<Switch>
				<Route path="/texteditor" component={Texteditor} />
				<Route path="/about" component={About} />
				<Route path="/" component={Landing_page} />
			</Switch>

			<script src="https://unicons.iconscout.com/release/v3.0.6/script/monochrome/bundle.js"/>
		</div>
	);
}

export default App;


