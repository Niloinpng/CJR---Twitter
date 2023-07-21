async function procuraUsario (Id){
    const response = await fetch("http://localhost:3000/perfil", {
            method: "post", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({id : Id}),
    
    })
    return response.json()
}

async function procuraimagem (Email){
    const response = await fetch("http://localhost:3000/imagem", {
            method: "post", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email : Email}),
    })
    return response.json()
}

var img = document.getElementById('imagemlogin')
var nome = document.getElementById('nome')
var nucleo = document.getElementById('nucleo')
var cargo = document.getElementById('cargo')
var email = document.getElementById('email')

async function padrao (id){
    let usuario = await procuraUsario(id)
    nome.innerHTML = usuario.nome
    nucleo.innerHTML = usuario.nucleo.nome
    cargo.innerHTML = usuario.cargo
    email.innerHTML = usuario.email
    img.src = usuario.imagem 
}

padrao(22)

function abreModal(event) {
    event.preventDefault();
    let publishContent = document.querySelector(".modal-overlay");
    publishContent.classList.add("modal-visible")
};

function fechaModal(event) {
    event.preventDefault();
    let publishContent = document.querySelector(".modal-overlay");
    publishContent.classList.remove("modal-visible")
};