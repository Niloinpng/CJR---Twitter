async function procuraUsario (){
    const response = await fetch("http://localhost:3000/perfil/19", {
           method: "get", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify()})
    return response.json()}


const usuario = procuraUsario()

console.log(usuario)

