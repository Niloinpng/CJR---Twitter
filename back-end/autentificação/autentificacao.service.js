import jwt from "jsonwebtoken";
import Usuario from "../usuario/usuario.service.js";

const usuario = new Usuario();

class Autentificação{
    async entrar(email,senha){
        const usuario_entrar = await usuario.procuraPorEmail(email);
        if(!usuario_entrar) throw new Error("Usuário não encontrado");
        if(usuario_entrar.senha !== senha) throw new Error("Senha incorreta");
        const token = jwt.sign({id: usuario_entrar.id},"secret",{expiresIn: "15m"}); //Tempo do token 15 minutos
        return{token};
    }

    async cadastro(email,senha,nome,genero,imagem){
        const novoUsuario = await usuario.criarUsuario(email,senha,nome,genero,imagem);
        return novoUsuario;
    }
}

export default Autentificação;