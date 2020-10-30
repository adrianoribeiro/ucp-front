import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import Aniversariantes from './Aniversariantes';
import CriancaBox from './Crianca';
import FormularioCrianca from './Detalhe';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

ReactDOM.render((
	<Router>
		<App>
			<Route exact path="/" component={Login}/>
			
			<Switch>
				<Route path="/birthdaysMonth" component={Aniversariantes} />
				<Route path="/detalhe/:id" component={FormularioCrianca} />
			</Switch>
		</App>
	</Router>
	) , document.getElementById('root')
);
registerServiceWorker();

/*
C:\Users\Adriano\estudo\react\cdc-admim

"npm install xxx" onde ele busca o fonte?

*/