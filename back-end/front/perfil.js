async function procuraUsario (Id){
    const response = await fetch("http://localhost:3000/perfil", {
            method: "post", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({id : Id}),
    
    })
    return response.json()
}

var imagem = document.getElementById('imagem')
var nome = document.getElementById('nome')
var nucleo = document.getElementById('nucleo')
var cargo = document.getElementById('cargo')
var email = document.getElementById('email')

async function padrao (id){
    let usuario = await procuraUsario(id)
    //console.log(usuario)
    //imagem.innerHTML = usuario.imagem
    nome.innerHTML = usuario.nome
    nucleo.innerHTML = usuario.nucleo.nome
    console.log(nucleo)
    cargo.innerHTML = usuario.cargo
    email.innerHTML = usuario.email
    //console.log(nome.innerHTML)
}

padrao(19)