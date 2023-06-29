import Usuario from "./usuario.service.js";
import JwtGuard from "../autentificação/guards/jwt.guard.js";
import {Router} from "express";

const usuarioRotas = Router();
const usuario = new Usuario();

usuarioRotas.post("/usuario", async (eviado,resposta) => {
    const{email,senha,nome,genero,imagem,cargo,nucleo} = eviado.body;
    try{
        const novoUsuario = await usuario.criarUsuario(email,senha,nome,genero,imagem,cargo,nucleo);
        resposta.status(200).json(novoUsuario);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

usuarioRotas.get("/usuario", async(eviado,resposta) => {
    const listaUsuarios = await usuario.procuraUsuarios();
    resposta.status(200).json(listaUsuarios);
})

usuarioRotas.delete("/usuario/:id", JwtGuard ,async(eviado,resposta) => {
    if(eviado.user.id !== +req.params.id )
        return resposta.status(403).json({message: "Você não tem permissão para deletar este usuário"})
    const{id} = eviado.params;
    try{
        const usuarioDeletado = await usuario.deletaUsuario(+id);
        resposta.status(200).json(usuarioDeletado);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

export default usuarioRotas;