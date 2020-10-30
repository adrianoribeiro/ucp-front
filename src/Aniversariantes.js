import React, { Component } from 'react';
//import logo from './logo.svg';

import $ from 'jquery';
import {Link} from 'react-router-dom';

class Aniversariantes extends Component {

	constructor(){
		super();
		this.state = {lista:[]}
	}

	componentDidMount(){
		
		fetch('http://localhost:63819/api/v1/pessoas/birthdaysMonth')
			.then(resposta => { return resposta.json()})
			.then(data => { this.setState({lista:data})});
	}	
	
	render(){
		return(
			<table className="table table-bordered">
			  <thead>
				<tr>
				  <th scope="col">Nome</th>
				  <th scope="col">Data de Nascimento</th>
				  <th scope="col">Responsáveis</th>
				</tr>
			  </thead>
			  <tbody>
			  {
				this.state.lista.map(function(crianca){
					return(
					<tr key={crianca.idPessoa}>
					  <td><Link to={`/detalhe/${crianca.idPessoa}`}>{crianca.nome}</Link></td>
					  <td>{crianca.dataNascimento[2]}/{crianca.dataNascimento[1]}/{crianca.dataNascimento[0]}</td>
					  <td>{crianca.responsaveis}</td>
					</tr>
					);
				})
			  }
			  </tbody>
			</table>
		)
	}
}


export default Aniversariantes;
