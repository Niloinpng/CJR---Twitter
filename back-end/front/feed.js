async function info (accessToken){
    const response = await fetch("http://localhost:3000/info", {
            method: "get", 
            headers: {"Content-type": "application/json",
            "authorization": "Bearer "+ accessToken}
    })
    return response.json()
}

async function procuraUsario (Id){
    const response = await fetch("http://localhost:3000/perfil", {
            method: "post", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({id : Id}),
    
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
        body: JSON.stringify({ content: post })
    })
    return response.json();
}

async function criaComrntario(accessToken, comentario, id_post) {
    const response = await fetch("http://localhost:3000/comentario", {
        method: "post",
        headers: {
            "Content-type": "application/json",
            "authorization": "Bearer "+ accessToken
        },
        body: JSON.stringify({ content: comentario, post_id: id_post })
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

async function MostraPots(){
    const response = await fetch("http://localhost:3000/post", {
            method: "get", 
            headers: {"Content-type": "application/json"}
    })
    return response.json()
}

var nome = document.getElementById('nome')
var img = document.getElementById('imagemUser')
var entrar_conta = document.getElementById('entrar-conta')
var criar_conta = document.getElementById('criar-conta')
var botão_publicar = document.getElementById('publicar')
var botão_sair = document.getElementById('botão-sair')

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
                img.style.display='block'
                botão_sair.style.display='block'
                let link_perfil = document.getElementById('perfil-logado')
                let link_perfil2 = document.getElementById('perfil-logado2')
                link_perfil.href = 'http://localhost:3000/perfil.html?perfil=' + usuario_info.id;
                link_perfil2.href = 'http://localhost:3000/perfil.html?perfil=' + usuario_info.id;
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

botão_sair.addEventListener("click",async(event)=> {
    event.preventDefault();
    localStorage.clear();
    alert("Deslogado")
    window.location.href = 'http://localhost:3000/index.html'
})

const publicacoes = document.getElementById('posts')

function gmessageheader(foto, nome, criado,endereco){
    var messageheader = document.createElement('div')
    messageheader.className = 'message-header'

    var link = document.createElement('a')
    link.href = 'http://localhost:3000/perfil.html?perfil=' + endereco;

    var profileImage = document.createElement('img')
    profileImage.id = 'profile-image'
    profileImage.src = foto
    link.appendChild(profileImage)
    
    var h3 = document.createElement('h3')
    h3.className = 'header-text'
    h3.textContent = nome

    var h5 = document.createElement('h5')
    h5.className = 'header-text'
    h5.textContent = criado

    messageheader.appendChild(link)
    messageheader.appendChild(h3)
    messageheader.appendChild(h5)
    return messageheader
}

function gmessagebodymessagetext(conteudo) {
    var messageBodyText = document.createElement("div")
    messageBodyText.className = "message-body message-text"

    var p = document.createElement("p")
    p.className = "feed-text"
    p.textContent = conteudo

    messageBodyText.appendChild(p)
    return messageBodyText
}

function gmessagebodymessagecomment(id) {
    var messageBodyComment = document.createElement("div");
    messageBodyComment.className = "message-body message-comment"

    var commentIcon = document.createElement("img")
    commentIcon.id = "comment-button"
    commentIcon.src = "images/comment icon.svg"
    commentIcon.alt = "comment icon"
    commentIcon.onclick = postarModal;
    commentIcon.idpost = id
    messageBodyComment.appendChild(commentIcon)
    return messageBodyComment
}

function gmessagebody() {
    var messageBody = document.createElement("div")
    messageBody.className = "message-body"

    var hr = document.createElement("hr")
    messageBody.appendChild(hr)
    return messageBody
}

function gerarpost(foto, nome, criado, conteudo, idpost, endereco){
    var messageBox = document.createElement('div')
    messageBox.className = 'message-box'
    messageBox.appendChild(gmessageheader(foto, nome, criado, endereco))
    messageBox.appendChild(gmessagebodymessagetext(conteudo))
    messageBox.appendChild(gmessagebodymessagecomment(idpost))
    messageBox.appendChild(gmessagebody())
    publicacoes.appendChild(messageBox)
}

async function geraFeed(){
    const posts = await MostraPots();
    for (let post of posts) {
        let idPost = post.id;
        let postDataProv = post.created_at;
        postDataList = postDataProv.split("T")[0].split("-");
        postData = postDataList[2] + "/" + postDataList[1] + "/" + postDataList[0];
        let postContent = post.content;
        let idUserAuthor = post.user_id;
        let userInfo = await procuraUsario(idUserAuthor);
        let nome = userInfo.nome;
        let imagem = userInfo.imagem;
        gerarpost(imagem, nome, postData, postContent, idPost, idUserAuthor);
    }
}

function fechaModal(event) {
    event.preventDefault();
    let publishContent = document.querySelector(".modal-overlay");
    publishContent.classList.remove("modal-visible")
};

async function postarModal(event){
    var botaoClicado = event.target
    var idbotao = botaoClicado.idpost
    if (idbotao){
        comentar(idbotao)
    } else {
        event.preventDefault();
        let publishContent = document.querySelector(".modal-overlay");
        publishContent.classList.add("modal-visible");
    }
}
var simplemde = new SimpleMDE({
	element: document.getElementById("md"),
	placeholder: "Converse com a gente...",
    spellChecker: false,
    toolbar: ["bold", "italic", "heading", "link", "image", "|", "guide"]
});

const submitButton = document.getElementById("enviar");

submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    post = simplemde.value();
    const accessToken = localStorage.getItem('accessToken'); //Pega o token de acesso 
    if (accessToken) {
        console.log("existe token");
        await criaPost(accessToken, post);
        alert("Post enviado!")
        location.reload();
    }
});

nave()
geraFeed()

