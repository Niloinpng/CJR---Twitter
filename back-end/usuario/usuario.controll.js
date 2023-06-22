import Usuario from "./usuario.service.js";
import {Router} from "express";

const usuarioRotas = Router();
const usuario = new Usuario();

usuarioRotas.post("/usuario", async (eviado,resposta) => {
    const{email,senha,nome,genero,cargo,nucleo,imagem} = eviado.body;
    try{
        const novoUsuario = await usuario.criarUsuario(email,senha,nome,genero,cargo,nucleo,imagem);
        resposta.status(200).json(novoUsuario);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

usuarioRotas.get("/usuario", async(eviado,resposta) => {
    const listaUsuarios = await usuario.procuraUsuarios();
    resposta.status(200).json(listaUsuarios);
})

usuarioRotas.delete("/usuario/:id", async(eviado,resposta) => {
    const{id} = eviado.params;
    try{
        const usuarioDeletado = await usuario.deletaUsuario(+id);
        resposta.status(200).json(usuarioDeletado);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

export default usuarioRotas;