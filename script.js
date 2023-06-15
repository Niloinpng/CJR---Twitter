var time = new Date()
var emini = document.getElementById('emini')
var pasini = document.getElementById('pasini')
var emerro = document.getElementById('emerro')
var abrirform = document.getElementById('abrirform')
var enviarform = document.getElementById('enviarform')
var botao = 'entrar'

console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds())

//Muda a outline do formulario quando esta no foco teste
emini.addEventListener('focus', () => {
    emini.style.borderColor = '#600833'
})
pasini.addEventListener('focus', () => {
    pasini.style.borderColor = '#600833'
})

//retorna a outline do formulario quando sai do foco
emini.addEventListener('blur', () => {
    if (emini.value == "") {
        emini.style.borderColor = '#ccc'
        emerro.style.display = 'none'
        botao = 'entrar'
        abrirform.style.width = '15%'
        abrirform.style.cursor = 'default'
        abrirform.style.background = '#422'
        enviarform.style.width = '84%'
        enviarform.style.cursor = 'pointer'
        enviarform.style.background = '#600833'
        return
    } else if (!EmailValido(emini.value)) {
        emini.style.borderColor = '#b00'
        emerro.style.display = 'block'
        return
    } else {
        if (emini.value !== "teste@teste.teste") {
            botao = 'registrar'
            abrirform.style.width = '84%'
            abrirform.style.cursor = 'pointer'
            abrirform.style.background = '#600833'
            enviarform.style.width = '15%'
            enviarform.style.cursor = 'default'
            enviarform.style.background = '#422'
            emini.style.borderColor = '#050'
            emerro.style.display = 'none'
        }
        else {
            botao = 'entrar'
            abrirform.style.width = '15%'
            abrirform.style.cursor = 'default'
            abrirform.style.background = '#422'
            enviarform.style.width = '84%'
            enviarform.style.cursor = 'pointer'
            enviarform.style.background = '#600833'
            emini.style.borderColor = '#ccc'
            emerro.style.display = 'none'
        }
        return
    }
})
pasini.addEventListener('blur', () => {
    pasini.style.borderColor = '#ccc'
})


const formlogin = document.getElementById('logini');

//Envia alerta de erro no fomulario
formlogin.addEventListener("submit", (event) => {
    event.preventDefault()
    if (botao == 'registrar'){
        return
    }
    if (!EmailValido(emini.value) || emini.value == "") {
        alert("Digite um email valido")
        return
    }
    if (!senhavalida(pasini.value, 8)) {
        alert("Digite uma senha valida")
        return
    }
    formlogin.submit()
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