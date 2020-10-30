import React, { Component } from 'react';
//import logo from './logo.svg';

import {Link} from 'react-router-dom';

class App extends Component {

  render() {
    return (
	<div id="layout">
		<nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
		  <a className="navbar-brand" href="#">UCP - Controle de Crianças</a>
		  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		  </button>

		  <div className="collapse navbar-collapse" id="navbarsExampleDefault">
			<ul className="navbar-nav mr-auto">
			  <li className="nav-item active">
				<Link className="nav-link" to="/">Crianças <span className="sr-only">(current)</span></Link>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" href="#">Alergia</a>
			  </li>
			  <li className="nav-item">
				<Link className="nav-link" to="/birthdaysMonth">Aniversariantes do mês</Link>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" href="#">Sair</a>
			  </li>
			  {/*
			  <li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
				<div class="dropdown-menu" aria-labelledby="dropdown01">
				  <a class="dropdown-item" href="#">Action</a>
				  <a class="dropdown-item" href="#">Another action</a>
				  <a class="dropdown-item" href="#">Something else here</a>
				</div>
			  </li>
			  */}
			</ul>
			<form className="form-inline my-2 my-lg-0">
			  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
			  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			</form>
		  </div>
		</nav>

		<main role="main" className="container">
		  	<div className="content" id="content">
			{this.props.children}
			</div>
			
		</main>{ /* /.container*/ }
		</div>
    );
  }
}

export default App;
