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

usuarioRotas.get("/perfil.html/:id", async(eviado, resposta) => {
    const{id} = eviado.params;
    const usuario_perfil = await usuario.Perfil(+id);
    if(!usuario_perfil)
        return resposta.status(400).json({message: "Usuario não existe"})
    try{
        resposta.status(200).json(usuario_perfil)
    }catch(err){
        resposta.status(400).json({erro: err.message})
    }
})

usuarioRotas.delete("/usuario/:id", JwtGuard ,async(eviado,resposta) => {
    if(eviado.user.id !== +eviado.params.id )
        return resposta.status(403).json({message: "Você não tem permissão para deletar este usuário"})
    const{id} = eviado.params;
    try{
        const usuarioDeletado = await usuario.deletaUsuario(+id);
        resposta.status(200).json(usuarioDeletado);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

usuarioRotas.post("/procuraemail", async(enviado,resposta) => {
    console.log("Entrou na rota")
    const{email} = enviado.body;
    console.log(email)
    if(await usuario.procuraPorEmail(email)){
        console.log(1)
        resposta.status(200).json(1)
    }else{
        console.log(0)
        resposta.status(200).json(0)
    }
})

usuarioRotas.post("/imagem", async(eviado,resposta) => {
    console.log("Entrou na roda imagem")
    const{email} = eviado.body;
    const imagem = await usuario.Imagem(email)
    resposta.status(200).json(imagem)
})

export default usuarioRotas;