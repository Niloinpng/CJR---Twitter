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

const publicacoes = document.getElementById('posts')

function gmessageheader(foto, nome, criado,endereco){
    var messageheader = document.createElement('div')
    messageheader.className = 'message-header'

    var link = document.createElement('a')
    link.href = 'http://localhost:3000/perfil.html/' + endereco;

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
        let idUserAuthor = post.user_id;
        if(idUserAuthor == 22){
            let idPost = post.id;
            let postDataProv = post.created_at;
            postDataList = postDataProv.split("T")[0].split("-");
            postData = postDataList[2] + "/" + postDataList[1] + "/" + postDataList[0];
            let postContent = post.content;
            let userInfo = await procuraUsario(idUserAuthor);
            let nome = userInfo.nome;
            let imagem = userInfo.imagem;
            gerarpost(imagem, nome, postData, postContent, idPost, idUserAuthor);            
        }
    }
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