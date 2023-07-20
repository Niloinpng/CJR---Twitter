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

async function post (){
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

<<<<<<< HEAD
// Most options demonstrate the non-default behavior
var simplemde = new SimpleMDE({
	element: document.getElementById("md"),
	placeholder: "Converse com a gente...",
    spellChecker: false,
    toolbar: ["bold", "italic", "heading", "link", "image", "|", "guide"]
});
=======
async function nave(){
    const accessToken = localStorage.getItem('accessToken'); //Pega o token de acesso 
    console.log(accessToken) 
    if(accessToken){ //Verifica se tem algum token 
        const usuario_info = await info(accessToken)
        console.log(usuario_info)
        const usuario = await procuraUsario(usuario_info.id)
        console.log(usuario)
    }
}

async function posts(){
    const posts = await post();
    console.log(posts)
}

nave()
posts()

>>>>>>> 544e1f03bbb5774b49db81d6026c4e02722b7925
