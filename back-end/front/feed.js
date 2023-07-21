async function info (accessToken){
    const response = await fetch("http://localhost:3000/info", {
            method: "get", 
            headers: {"Content-type": "application/json",
            "authorization": "Bearer "+ accessToken}
    })
    return response.json()
}

async function criaPost(accessToken, post) {
    const response = await fetch("http://localhost:3000/post", {
        method: "post",
        headers: {
            "Content-type": "application/json",
            "authorization": "Bearer "+ accessToken
        },
        body: JSON.stringify({ content: post})
    })
    return response.json();
}

async function procuraUsario (Id){
    const response = await fetch("http://localhost:3000/perfil", {
            method: "post", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({id : Id}),
    })
    return response.json()
}

async function geraFeed (){
    const response = await fetch("http://localhost:3000/post", {
            method: "get", 
            headers: {"Content-type": "application/json"}
    })
    return response.json()
}

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

var simplemde = new SimpleMDE({
	element: document.getElementById("md"),
	placeholder: "Converse com a gente...",
    spellChecker: false,
    toolbar: ["bold", "italic", "heading", "link", "image", "|", "guide"]
});

var nome = document.getElementById('nome')
var img = document.getElementById('imagemUser')
var entrar_conta = document.getElementById('entrar-conta')
var criar_conta = document.getElementById('criar-conta')
var botão_publicar = document.getElementById('publicar')

async function nave(){
    const accessToken = localStorage.getItem('accessToken'); //Pega o token de acesso 
    console.log(accessToken) 
    if((accessToken)){ //Verifica se tem algum token 
        try{
            const usuario_info = await info(accessToken)
            if(usuario_info.id){
                entrar_conta.style.display='none'
                criar_conta.style.display='none'
                const usuario = await procuraUsario(usuario_info.id)
                console.log(usuario)
                nome.innerHTML = usuario.nome
                img.src = usuario.imagem
                console.log(img)
            }else if(usuario_info.message){
                nome.style.display='none'
                img.style.display='none'
                console.log(usuario_info.message)
            }
        }catch(err){
            alert(err)
            console.log(err)
        }
    }
    if(!accessToken){
        botão_publicar.style.display='none'
    }
}

async function geraFeed(){
    const posts = await geraFeed();
    console.log(posts)
}

const submitButton = document.getElementById("enviar");

submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    post = simplemde.value();
    const accessToken = localStorage.getItem('accessToken'); //Pega o token de acesso 
    if (accessToken) {
        console.log("existe token");
        await criaPost(accessToken, post);
        alert("Post enviado!")
    }
});

nave()
geraFeed()

