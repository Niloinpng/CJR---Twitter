// Supondo que você tenha os dados do usuário disponíveis em um objeto chamado "usuario"
const usuario = {
    nome: "João Silva",
    cargo: "Desenvolvedor",
    nucleo: "Tecnologia",
    publicacoes: [
      "Publicação 1",
      "Publicação 2",
      "Publicação 3"
    ]
  };
  
  // Atualiza os elementos HTML com os dados do usuário
  document.getElementById("nome-usuario").textContent = usuario.nome;
  document.getElementById("cargo-usuario").textContent = usuario.cargo;
  document.getElementById("nucleo-usuario").textContent = usuario.nucleo;
  
  const listaPublicacoes = document.getElementById("lista-publicacoes");
  usuario.publicacoes.forEach((publicacao) => {
    const li = document.createElement("li");
    li.textContent = publicacao;
    listaPublicacoes.appendChild(li);
  });
  