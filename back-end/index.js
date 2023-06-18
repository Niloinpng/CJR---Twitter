import express from "express";
import usuarioRotas from "./usuario/usuario.rotas.js";
import autentificacaoRotas from "./autentificação/autentificacao.rotas.js";

const app = express();
app.use(express.json()); // Configurando express para ler JSON
app.use(usuarioRotas);
app.use(autentificacaoRotas);


//  Iniciando o Servidor na porta 3000
app.listen(3000, console.log('Servidos funcionando na porta 3000'));