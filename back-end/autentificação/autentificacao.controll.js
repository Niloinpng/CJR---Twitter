import {Router} from "express";
import Autentificação from "./autentificacao.service.js";
import Usuario from "../usuario/usuario.service.js";

const autentificacao = new Autentificação;
const autentificacaoRotas = Router();

autentificacaoRotas.post("/entrar", async (enviado,resposta) => {
    const{email,senha} = enviado.body;
    try{
        const token = await autentificacao.entrar(email,senha);
        resposta.status(200).json(token);
    }catch(e){
        resposta.status(400).json({message: e.message});
    }
})

autentificacaoRotas.post("/cadastro", async(enviado,resposta) => {
    const{email,senha,nome,genero,cargo,nucleo,imagem} = enviado.body;
    try{
        const novoUsuario = await autentificacao.cadastro(email,senha,nome,genero,cargo,nucleo,imagem);
        resposta.status(200).json(novoUsuario);
    }catch(e){
        resposta.status(400).json({message: e.message});
    }
})

export default autentificacaoRotas;