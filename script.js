var time = new Date()
var emini = document.getElementById('emini')
var pasini = document.getElementById('pasini')

console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds())

//Muda a outline do formulario quando esta no foco
emini.addEventListener('focus', () => {
    emini.style.borderColor = '#600833';
})
pasini.addEventListener('focus', () => {
    pasini.style.borderColor = '#600833';
})

//retorna a outline do formulario quando sai do foco
emini.addEventListener('blur', () => {
    emini.style.borderColor = '#ccc';
})
pasini.addEventListener('blur', () => {
    pasini.style.borderColor = '#ccc';
})


const formlogin = document.getElementById('logini');

//Envia alerta de erro no fomulario
formlogin.addEventListener("submit", (event) => {
    event.preventDefault()
    if (emini.value == "" || !EmailValido(emini.value)) {
        alert("Digite um email valido")
        return;
    }
    if (!senhavalida(pasini.value, 8)) {
        alert("Digite uma senha valida")
        return;
    }
    formlogin.submit();
})

//Valida o email
function EmailValido(email) {
    const rejeitar = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    )
    if(rejeitar.test(email)) {
        return true
    }
    return false
}

//Valida Senha
function senhavalida(senha, minimo) {
    if (senha.length >= minimo) {
        return true
    }
    return false
}