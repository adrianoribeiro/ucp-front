import React, { Component } from 'react';

import './css/bootstrap.min.css';
import './css/starter-template.css';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import {Link} from 'react-router-dom';

export default class FormularioCrianca extends Component{

	constructor(){
		super();
		this.state = {pessoaDetalhe:{nome:''
						, dataNascimento:null
						, responsaveis:''
						, telefone:''
						,endereco: {
							logradouro:''
							, bairro:''
							, cidade:'São José dos Campos'
							, uf:'SP'
							, cep:''}}};
	}
	
	componentDidMount(){
		$.ajax({
			url: 'http://localhost:63819/api/v1/pessoas/'+this.props.match.params.id,
			dataType: 'json',								//Dados recebidos no formato JSON
			success: function(resposta){
				this.setState({pessoaDetalhe:resposta});
			}.bind(this)
		});
	}	

	render(){
		return(
			<form onSubmit={this.save} method="post">
				<fieldset>
				<legend>UCP - Dados da Criança</legend>
				<div className="form-row">
				
					<div className="form-group col-md-6">
						<InputCustomizado type="text" id="nome" name="nome" label="Nome" 
							placeholder="Digite o nome da criança" 
							value={this.state.pessoaDetalhe.nome} />
					</div>
					
					<div className="form-group col-md-6">
						<InputCustomizado type="date" id="dataNascimento" name="dataNascimento" label="Data de Nascimento" 
							placeholder="Digite a data de nascimento da criança" 
							value={this.state.pessoaDetalhe.dataNascimento} />
					</div>
				</div>
				
				<div className="form-row">
				
					<div className="form-group col-md-8">
						<InputCustomizado type="text" id="responsaveis" label="Responsáveis" 
							name="responsaveis" placeholder="Digite o nome do responsaveis da criança" 
							value={this.state.pessoaDetalhe.responsaveis} />
					</div>
					
					<div className="form-group col-md-4">
						<InputCustomizado type="text" id="telefone" name="telefone" label="Telefone" 
						placeholder="Digite o telefone dos responsável da criança" 
						value={this.state.pessoaDetalhe.telefone} />
					</div>
				</div>
				
			  </fieldset>
				<fieldset>
				<legend>Endereço</legend>
					<div className="form-row">
					
						<div className="form-group col-md-8">
							<InputCustomizado type="text" id="logradouro" name="endereco.logradouro" 
								label="Endereço" placeholder="Logradouro" 
								value={this.state.pessoaDetalhe.endereco.logradouro} />
						</div>
						
						<div className="form-group col-md-4">
							<InputCustomizado type="text" id="bairro" name="endereco.bairro" 
								label="Bairro" placeholder="Bairro" 
								value={this.state.pessoaDetalhe.endereco.bairro} />
						</div>
					</div>
					
					<div className="form-row">
					
						<div className="form-group col-md-4">
							<InputCustomizado type="text" id="cidade" name="endereco.cidade" 
								label="Cidade" placeholder="Cidade" 
								value={this.state.pessoaDetalhe.endereco.cidade} />
						</div>
						
						<div className="form-group col-md-4">
							<InputCustomizado type="text" id="uf" name="endereco.uf" 
								label="UF" placeholder="UF" 
								value={this.state.pessoaDetalhe.endereco.uf} />
						</div>
						
						<div className="form-group col-md-4">
							<InputCustomizado type="text" id="cep" name="endereco.cep" 
								label="CEP" placeholder="CEP" 
								value={this.state.pessoaDetalhe.endereco.cep} />
						</div>
					</div>
				</fieldset>
				
				<Link to="/" className="btn btn-primary">Voltar</Link>
			</form>
		);
	}
}