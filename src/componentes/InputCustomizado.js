import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class InputCustomizado extends Component{

	constructor(){
		super();
		this.state = {msgErro: ''};
	}

	componentDidMount() {
		PubSub.subscribe("erro-validacao",function(topico,erro){
			if(erro.field === this.props.name){
				this.setState({msgErro:erro.defaultMessage});
			}
		}.bind(this));
		
		PubSub.subscribe("limpa-erros",function(topico){                        
			this.setState({msgErro:''});                        
		}.bind(this));  
	}

	
	render(){
		return(
			<div>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input {...this.props} className="form-control" />
				<div className="alert-danger">{this.state.msgErro}</div>
			</div>
		)
	}

}
