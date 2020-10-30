import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {browserHistory} from 'react-router';


import $ from 'jquery';
//import {Link} from 'react-router-dom';

export default class Login extends Component {

	constructor(){
		super();
		this.state = {msg:''};
	}
	
	componentDidMount(){
		
		/*fetch('http://localhost:63819/api/v1/pessoas/birthdaysMonth')
			.then(resposta => { return resposta.json()})
			.then(data => { this.setState({lista:data})});*/
	}
	
	envia(evento){
		evento.preventDefault();

		//var data = new FormData();
		//data.append( "json", JSON.stringify({"username":"adriano","password":"081112A"}) );

        const requestInfo = {
            method: 'POST'
			,body:JSON.stringify({username:this.login.value,password:this.senha.value})
			// ,body:JSON.stringify({"username":"adriano","password":"081112A1"})
			,headers: new Headers({
	    		'Access-Control-Allow-Origin': 'http://localhost:63819/'
	    		,'Access-Control-Allow-Credentials': true
	    		,'Access-Control-Allow-Headers' : 'X-Custom-Header, Authorization, Origin, X-Requested-With, Content-Type, Accept, X-Access-Token'
	    		,'Access-Control-Expose-Headers' : 'Authorization'
	    		,'Content-Type': 'text/html; charset=utf-8'
			})
        }

		fetch('http://localhost:63819/login', requestInfo)
			.then(response => {
				if(response.ok){
					response.headers.forEach((val, key) => {
				        console.log(key+"=", val)
				    })
					//console.log(response.text());
				}else{
					throw new Error('Não foi possivel fazer o login.');
				}
			})
			.then(Authorization => {
				//this.props.history.push('/birthdaysMonth');
				console.log(Authorization);
			})
			.catch(error => {
				this.setState({msg: error.message});
			});
	}
	
	render(){
		return(
			<form className="form-signin" onSubmit={this.envia.bind(this)} method="post" id="xpto">
			  <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
			  <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
			  
                <input type="text" ref={(input) => this.login = input}/>
                <input type="text" ref={(input) => this.senha = input}/>

			  <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
			  <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
			  <span>{this.state.msg}</span>
			</form>
		)
	}
}
