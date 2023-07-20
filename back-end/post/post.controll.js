import Post from "./post.service.js";
import JwtGuard from "../autentificação/guards/jwt.guard.js";
import { Router } from "express";

const postRotas = Router();
const post = new Post();

postRotas.post("/post", JwtGuard, async(eviado,resposta) => {
    const{content} = eviado.body;
    try{
        const novoPost = await post.criarPost(content,eviado.user.id)
        resposta.status(200).json(novoPost);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

postRotas.get("/post", async(eviado,resposta) => {
    const listaPost = await post.procuraPost();
    resposta.status(200).json(listaPost);
})

postRotas.delete("/post/:id", JwtGuard ,async(eviado,resposta) => {
    const{id} = eviado.params;
    try{
        const postDeletado = await post.deletaPost(+id,eviado.user.id);
        resposta.status(200).json(postDeletado);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

export default postRotas;