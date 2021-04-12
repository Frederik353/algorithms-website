import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Landing_page } from './pages/landing_page/landing_page.js';
import { Texteditor } from "./pages/texteditor/texteditor";
import { Questions } from "./pages/questions/questions";
import About from './pages/About';
import { AuthProvider } from "./helpers/authentication-context";
import { AccountInfo } from "./pages/account/AccountInfo/AccountInfo";
import { UpdateAccountInfo } from "./pages/account/UpdateAccountInfo/UpdateAccountInfo";
import { ResetPassword } from "./pages/account/ResetPassword/ResetPassword";
import { PrivateRoute } from "./pages/account/RouteOption/RouteOption";
import { SignUpPage } from "./pages/account/SignUpPage/SignUpPage";



function App() {
	return (
		<div className="App">

		{/* link til alle nettsider */}
		<BrowserRouter>
			<AuthProvider>
				<Switch>
					<Route path="/signIn" component={ SignUpPage } />
					<PrivateRoute path="/update-account" component={ UpdateAccountInfo } />
					<PrivateRoute path="/account" component={ AccountInfo } />
					<Route path="/reset-password" component={ ResetPassword } />
					<Route path="/questions" component={ Questions } />
					<Route path="/texteditor" component={ Texteditor } />
					<Route path="/about" component={ About } />
					<Route exact path="/" component={ Landing_page } />
				</Switch>
			</AuthProvider>
		</BrowserRouter>

			<script src="https://unicons.iconscout.com/release/v3.0.6/script/monochrome/bundle.js"/>
		</div>
	);
}


export default App;


