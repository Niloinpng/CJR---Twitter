var time = new Date()
var emini = document.getElementById('emini') //importa os inputs por id
var pasini = document.getElementById('pasini')
var emerro = document.getElementById('emerro')
var abrirform = document.getElementById('abrirform')
var enviarform = document.getElementById('enviarform')
var botao = 'entrar'

console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds())

//Muda a outline do formulario quando esta no foco
emini.addEventListener('focus', () => {
    emini.style.borderColor = '#600833'
})
pasini.addEventListener('focus', () => {
    pasini.style.borderColor = '#600833'
})

//retorna a outline do formulario quando sai do foco
emini.addEventListener('blur', () => {
    if (emini.value == "") { // volta os botões para como estavam no inicio
        emini.style.borderColor = '#ccc' // todos os styles estão comentados no staly.css
        emerro.style.display = 'none'
        botao = 'entrar'
        abrirform.style.width = '15%'
        abrirform.style.cursor = 'default'
        abrirform.style.background = '#422'
        enviarform.style.width = '84%'
        enviarform.style.cursor = 'pointer'
        enviarform.style.background = '#600833'
        return
    } else if (!EmailValido(emini.value)) { // valida o email para mudar a cor da caixa
        emini.style.borderColor = '#b00'
        emerro.style.display = 'block'
        return
    } else {
        if (emini.value !== "teste@teste.teste") { // essa parte tem que ser mudada para quando tiver banco de dados
            botao = 'registrar'                    // para verificar se o email ja esta cadastrado
            abrirform.style.width = '84%'          // caso não esteja ele muda a cor da caixa e os botões
            abrirform.style.cursor = 'pointer'
            abrirform.style.background = '#600833'
            enviarform.style.width = '15%'
            enviarform.style.cursor = 'default'
            enviarform.style.background = '#422'
            emini.style.borderColor = '#050'
            emerro.style.display = 'none'
        }
        else { //caso esteja ele deixa as cores padroes e o botão de entrar
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
pasini.addEventListener('blur', () => { //blur da senha #vai ser alterado
    pasini.style.borderColor = '#ccc'
})


const formlogin = document.getElementById('logini');

//Envia alerta de erro no fomulario
formlogin.addEventListener("submit", (event) => {
    event.preventDefault()
    if (botao == 'registrar'){ //ver se ta na tela de registro e invalida o botão submit
        return
    }
    if (!EmailValido(emini.value) || emini.value == "") { // verifica se o email é invalido ou esta vazio para emitir um aviso 
        alert("Digite um email valido")
        return
    }
    if (!senhavalida(pasini.value, 8)) { // verifica se a senha é invalida para emitir um aviso 
        alert("Digite uma senha valida")
        return
    }
    formlogin.submit() // envia o formulario
})

//Valida o email
function EmailValido(email) {
    const rejeitar = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/ //formata o email
    )
    if(rejeitar.test(email)) { // testa o emais de acordo com a formatação
        return true
    }
    return false
}

//Valida Senha
function senhavalida(senha, minimo) { // valida a senha de acordo com o tamanho
    if (senha.length >= minimo) {
        return true
    }
    return false
}