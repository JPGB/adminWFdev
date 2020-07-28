import React, { Component } from 'react'
import {Container  } from 'react-bootstrap';
import Topo from "../../topo";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";

export default class Dash extends Component {

    state ={
        logado: true,
        nome:''
    }


    validaOnline = ()=>{
        const login = localStorage.getItem('login');
        const token = localStorage.getItem('token');
        const nome = localStorage.getItem('nome');

        var resposta = false


        
        if(login === null || token === null){
            this.setState({
                logado: false,
                nome:''
            })
            return resposta

        }else{
            resposta = api.get('/login/'+login+'/'+token).then(response=>{
                this.setState({
                    logado: true,
                    nome:nome
                })
                toast.success('😁 Seja bem vindo(a) '+nome, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

                return  true
            }).catch((erro)=>{
                this.setState({
                    logado: false,
                    nome:''
                })
                return false
            })
    
            return resposta
            
        }



        

       


 
    }


    componentDidMount(){
        this.validaOnline()
    }

    render() {
        
        if(this.state.logado === false){

            this.props.history.push('/')
            return null
        }else{
            return (
                <div>
                    <ToastContainer/>
                    <Topo
                        nome={this.state.nome}
                    />
                    <Container>
                        Dash
                    </Container>
                </div>
            )
        }
        
    }
}