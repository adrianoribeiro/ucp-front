import React, { Component } from 'react';

import './css/bootstrap.min.css';
import './css/starter-template.css';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import InputCustomizado from './componentes/InputCustomizado';
import TratadorErros from './TratadorErros';
import {Link} from 'react-router-dom';

class FormularioCrianca extends Component{

	constructor(){
		super();
		this.state = {idPessoa:0
						, nome:''
						, dataNascimento:''
						, responsaveis:''
						, telefone:''
						, logradouro:''
						, bairro:''
						, cidade:'São José dos Campos'
						, uf:'SP'
						, cep:''};

		this.save = this.save.bind(this);
/*		
		//Dados pessoais
		this.setIdPessoa = this.setIdPessoa.bind(this);
		this.setNome = this.setNome.bind(this);
		this.setDataNascimento = this.setDataNascimento.bind(this);
		this.setResponsaveis = this.setResponsaveis.bind(this);
		this.setTelefone = this.setTelefone.bind(this);
		//Endereço
		this.setLogradouro = this.setLogradouro.bind(this);
		this.setBairro = this.setBairro.bind(this);
		this.setCidade = this.setCidade.bind(this);
		this.setUf = this.setUf.bind(this);
		this.setCep = this.setCep.bind(this);
		*/
		this.cancelar = this.cancelar.bind(this);
	}
	
	componentDidMount(){
		PubSub.subscribe('change_pessoa', function(topico, pessoaSelecionada){
			
			this.setState({idPessoa:pessoaSelecionada.idPessoa
						, nome:pessoaSelecionada.nome
						, dataNascimento:pessoaSelecionada.dataNascimento
						, responsaveis:pessoaSelecionada.responsaveis
						, telefone:pessoaSelecionada.telefone
						, logradouro:pessoaSelecionada.endereco.logradouro
						, bairro:pessoaSelecionada.endereco.bairro
						, cidade:pessoaSelecionada.endereco.cidade
						, uf:pessoaSelecionada.endereco.uf
						, cep:pessoaSelecionada.endereco.cep});
		}.bind(this))
	}
	
	cancelar(evento){
		evento.preventDefault();
		
		this.setState({idPessoa:0
						, nome:''
						, dataNascimento:''
						, responsaveis:''
						, telefone:''
						, logradouro:''
						, bairro:''
						, cidade:'São José dos Campos'
						, uf:'SP'
						, cep:''});
	}
	
	save(evento){
		evento.preventDefault();
		
		$.ajax({
			url: 'http://localhost:63819/api/v1/pessoas',
			contentType:'application/json',					//Dados enviados no formato JSON
			dataType:'json',								//Dados recebidos no formato JSON
			type: 'post',
			data: JSON.stringify({
				"idPessoa": this.state.idPessoa,
				"nome": this.state.nome,
				"dataNascimento": this.state.dataNascimento,
				"responsaveis": this.state.responsaveis,
				"telefone": this.state.telefone,
				"endereco": {
					"logradouro": this.state.logradouro,
					"bairro": this.state.bairro,
					"cidade": this.state.cidade,
					"uf": this.state.uf,
					"cep": this.state.cep
					}
				}),
			success: function(novaLista){
				PubSub.publish('atualizarListaCriancas', novaLista);
				this.setState({idPessoa: 0
					, nome:''
					, dataNascimento:''
					, responsaveis:''
					, telefone:''
					, logradouro:''
					, bairro:''
					, cidade:'São José dos Campos'
					, uf:'SP'
					, cep:''});
			}.bind(this),
			error: function(resposta){
				if(resposta.status === 400){
					
					new TratadorErros().publicaErros(resposta.responseJSON);
				}
				
				console.log(resposta);
			},
			beforeSend: function(){
				PubSub.publish("limpa-erros",{});
			}
		});
	}
	
	setCampo(nomeCampo, evento){
		var campo = {};								//Cria um campo
		campo[nomeCampo] = evento.target.value;		//Pega o valor
		this.setState(campo);
	}
	
	setIdPessoa(evento){
		this.setState({idPessoa: evento.target.value});
	}
	
	setNome(evento){
		this.setState({nome: evento.target.value});
	}

	setDataNascimento(evento){
		this.setState({dataNascimento: evento.target.value});
	}

	setResponsaveis(evento){
		this.setState({responsaveis: evento.target.value});
	}
	
	setTelefone(evento){
		this.setState({telefone: evento.target.value});
	}

	setLogradouro(evento){
		this.setState({logradouro: evento.target.value});
	}

	setBairro(evento){
		this.setState({bairro: evento.target.value});
	}

	setCidade(evento){
		this.setState({cidade: evento.target.value});
	}

	setUf(evento){
		this.setState({uf: evento.target.value});
	}
	
	setCep(evento){
		this.setState({cep: evento.target.value});
	}

	render(){
		return(
			<form onSubmit={this.save} method="post">
			
				<InputCustomizado type="hidden" value={this.state.idPessoa} id="idPessoa" 
					onChange={this.setCampo.bind(this, 'idPessoa')} />
				<fieldset>
				<legend>UCP - Dados da Criança</legend>
				<div className="form-row">
					<div className="form-group col-md-6">
						<InputCustomizado type="text" id="nome" name="nome" label="Nome" 
							placeholder="Digite o nome da criança" 
							value={this.state.nome} onChange={this.setCampo.bind(this, 'nome')} />
					</div>
					
					<div className="form-group col-md-6">
						<InputCustomizado type="date" id="dataNascimento" name="dataNascimento" label="Data de Nascimento" 
							placeholder="Digite a data de nascimento da criança" 
							value={this.state.dataNascimento} onChange={this.setCampo.bind(this, 'dataNascimento')}/>
					</div>
				</div>
				
				<div className="form-row">
				
					<div className="form-group col-md-8">
						<InputCustomizado type="text" id="responsaveis" label="Responsáveis" 
							name="responsaveis" placeholder="Digite o nome do responsaveis da criança" 
							value={this.state.responsaveis} onChange={this.setCampo.bind(this, 'responsaveis')}/>
					</div>
					
					<div className="form-group col-md-4">
						<InputCustomizado type="text" id="telefone" name="telefone" label="Telefone" 
						placeholder="Digite o telefone dos responsável da criança" 
						value={this.state.telefone} onChange={this.setCampo.bind(this, 'telefone')}/>
					</div>
				</div>

			  </fieldset>

				<fieldset>
				<legend>Endereço</legend>
					<div className="form-row">
					
						<div className="form-group col-md-8">
							<InputCustomizado type="text" id="logradouro" name="endereco.logradouro" 
								label="Endereço" placeholder="Logradouro" 
								value={this.state.logradouro} onChange={this.setCampo.bind(this, 'logradouro')}/>
						</div>
						
						<div className="form-group col-md-4">
							<InputCustomizado type="text" id="bairro" name="endereco.bairro" 
								label="Bairro" placeholder="Bairro" 
								value={this.state.bairro} onChange={this.setCampo.bind(this, 'bairro')}/>
						</div>
					</div>
					
					<div className="form-row">
					
						<div className="form-group col-md-4">
							<InputCustomizado type="text" id="cidade" name="endereco.cidade" 
								label="Cidade" placeholder="Cidade" 
								value={this.state.cidade} onChange={this.setCampo.bind(this, 'cidade')}/>
						</div>
						
						<div className="form-group col-md-4">
							<InputCustomizado type="text" id="uf" name="endereco.uf" 
								label="UF" placeholder="UF" 
								value={this.state.uf} onChange={this.setCampo.bind(this, 'uf')}/>
						</div>
						
						<div className="form-group col-md-4">
							<InputCustomizado type="text" id="cep" name="endereco.cep" 
								label="CEP" placeholder="CEP" 
								value={this.state.cep} onChange={this.setCampo.bind(this, 'cep')} />
						</div>
					</div>
				</fieldset>

				<button type="submit" className="btn btn-primary">Salvar</button>
				<button type="none" onClick={this.cancelar} className="btn btn-primary">Cancelar</button>
			</form>
		);
	}
}

class TabelaCrianca extends Component{
	
	constructor(props){
		super(props);
		this.state = {};
		this.editarPessoa = this.editarPessoa.bind(this);
		this.exluirPessoa = this.exluirPessoa.bind(this);
	}
	
	editarPessoa(event, id) {
	
		$.ajax({
			url: 'http://localhost:63819/api/v1/pessoas/'+id,
			dataType: 'json',								//Dados recebidos no formato JSON
			success: function(pessoa){
				PubSub.publish('change_pessoa', pessoa);
			}
		});
	}
	
	exluirPessoa(event, id) {
		
		const requestInfo = {
			method:'DELETE'
		}
		
		fetch('http://localhost:63819/api/v1/pessoas/'+id, requestInfo)
        .then(response => {
            if(response.ok){
                return response.text();
            } else {
                //this.setState({msg:'não foi possível fazer o login'})
				console.log({msg:'não foi possível fazer o login'});
            }
        })
		.catch(error => {
			//this.setState({msg:error.message});
			console.log({msg:'não foi possível fazer o login'});
		});		
		
		/*console.log(id);
		$.ajax({
			url: 'http://localhost:63819/api/v1/pessoas/'+id,
			dataType: 'json',
			type: 'delete',
			success: function(resposta){
				console.log('Sucesso');
			}
		});*/
	}
	
	render(){
		return(
			<table className="table table-bordered">
			  <thead>
				<tr>
				  <th scope="col">&nbsp;</th>
				  <th scope="col">&nbsp;</th>
				  <th scope="col">Nome</th>
				  <th scope="col">Data de Nascimento</th>
				  <th scope="col">Responsáveis</th>
				</tr>
			  </thead>
			  <tbody>
			  {
				this.props.lista.map(function(crianca){
					return(
					<tr key={crianca.idPessoa}>
					  <td><button onClick={(e) => this.editarPessoa(e, crianca.idPessoa)}>Editar</button></td>
					  <td><button onClick={(e) => this.exluirPessoa(e, crianca.idPessoa)}>Excluir</button></td>
					  <td><Link to={`/detalhe/${crianca.idPessoa}`}>{crianca.nome}</Link></td>
					  <td>{crianca.dataNascimento[2]}/{crianca.dataNascimento[1]}/{crianca.dataNascimento[0]}</td>
					  <td>{crianca.responsaveis}</td>
					</tr>
					);
				}.bind(this))
			  }
			  </tbody>
			</table>
		)
	}
}

export default class CriancaBox extends Component{

	constructor() {
		super();
		this.state = {lista : []};
	}
	
	componentDidMount(){
		$.ajax({
			url: 'http://localhost:63819/api/v1/pessoas',
			dataType: 'json',								//Dados recebidos no formato JSON
			success: function(resposta){
				this.setState({lista:resposta});
			}.bind(this)
		});
		
		PubSub.subscribe('atualizarListaCriancas', function(topico, novaLista){
			this.setState({lista: novaLista});
		}.bind(this))
	}	
	
	render(){
		return(
			<div>
				<FormularioCrianca />
				<TabelaCrianca lista={this.state.lista} />
			</div>
		)
	}
}

			
