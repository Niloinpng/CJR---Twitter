var time = new Date()
//importa os inputs por id
var emini = document.getElementById('emini')
var pasini = document.getElementById('pasini')
var nomeini = document.getElementById('nomeini')
var Idgenero = document.getElementById('Idgenero')
var cargoini = document.getElementById('cargoini')
//importa campo de registro por id
var regis = document.getElementById('regini')
//importa os textos por id
var emerro = document.getElementById('emerro')
var emerro2 = document.getElementById('emerro2')
var senerro = document.getElementById('senerro')
var nomerro = document.getElementById('nomerro')
var generro = document.getElementById('generro')
var carerro = document.getElementById('carerro')
//importa os botões por id
var abrirform = document.getElementById('abrirform')
var enviarform = document.getElementById('enviarform')
//importa os imagens por id
var carta = document.getElementById('cartaid')
var cadeado = document.getElementById('cadeadoid')
var busto = document.getElementById('bustoid')
var martelo = document.getElementById('marteloid')
//imgaem
var loginimg = document.getElementById('loginimg')
//variaveis nescessarias
var botao = 'entrar'
//cores
var formulario = '#fff'
var corclara=  '#a15'
var cormedia = '#803'
var corescura = '#601'
var corbordas = '#ccc'
var corerro = '#a00'
var corcerto = '#0a0'

console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds())

//Muda a outline do formulario quando esta no foco
emini.addEventListener('focus', () => {
    emini.style.borderColor = cormedia
    carta.style.borderColor = cormedia
})
pasini.addEventListener('focus', () => {
    pasini.style.borderColor = cormedia
    cadeado.style.borderColor = cormedia
})
nomeini.addEventListener('focus', () => {
    nomeini.style.borderColor = cormedia
    busto.style.borderColor = cormedia
})
Idgenero.addEventListener('focus', () => {
    Idgenero.style.borderColor = cormedia
})
cargoini.addEventListener('focus', () => {
    cargoini.style.borderColor = cormedia
    martelo.style.borderColor = cormedia
})

//retorna a outline do formulario quando sai do foco
emini.addEventListener('blur', () => {
    if (emini.value == "") { // volta os botões para como estavam no inicio
        emini.style.borderColor = corbordas // todos os styles estão comentados no staly.css
        carta.style.borderColor = corbordas
        emerro.style.display = 'none'
        botao = 'entrar'
        abrirform.style.width = '15%'
        abrirform.style.cursor = 'default'
        abrirform.style.background = corescura
        enviarform.style.width = '84%'
        enviarform.style.cursor = 'pointer'
        enviarform.style.background = cormedia
        emerro2.style.display = 'none'
        loginimg.src = 'images/login.svg'
        return
    } else if (!EmailValido(emini.value)) { // valida o email para mudar a cor da caixa
        emini.style.borderColor = corerro
        carta.style.borderColor = corerro
        emerro.style.display = 'block'
        emerro2.style.display = 'none'
        loginimg.src = 'images/login.svg'
        return
    } else {
        if (emini.value !== "teste@teste.teste") { // essa parte tem que ser mudada para quando tiver banco de dados
            botao = 'registrar'                    // para verificar se o email ja esta cadastrado
            abrirform.style.width = '84%'          // caso não esteja ele muda a cor da caixa e os botões
            abrirform.style.cursor = 'pointer'
            abrirform.style.background = cormedia
            enviarform.style.width = '15%'
            enviarform.style.cursor = 'default'
            enviarform.style.background = corescura
            emini.style.borderColor = corcerto
            carta.style.borderColor = corcerto
            emerro.style.display = 'none'
            emerro2.style.display = 'none'
            loginimg.src = 'images/login.svg'
        }
        else { //caso esteja ele deixa as cores padroes e o botão de entrar
            botao = 'entrar'
            abrirform.style.width = '15%'
            abrirform.style.cursor = 'default'
            abrirform.style.background = corescura
            enviarform.style.width = '84%'
            enviarform.style.cursor = 'pointer'
            enviarform.style.background = cormedia
            emini.style.borderColor = corbordas
            carta.style.borderColor = corbordas
            emerro.style.display = 'none'
            emerro2.style.display = 'none'
            loginimg.src = 'Contas/'+emini.value+'/profile.jpg'
        }
        return
    }
})

pasini.addEventListener('blur', () => { //blur da senha #vai ser alterado
    if (pasini.value == "") {
        pasini.style.borderColor = corbordas
        cadeado.style.borderColor = corbordas
        senerro.style.display = 'none'
        return
    } else if (!tmvalido(pasini.value, 8, 250)) { // verifica se a senha é invalida para emitir um aviso 
        pasini.style.borderColor = corerro
        cadeado.style.borderColor = corerro
        senerro.style.display = 'block'
        return
    } else if (tmvalido(pasini.value, 8, 250) && (botao === 'registrar' || botao == 'registrando')) {
        pasini.style.borderColor = corcerto
        cadeado.style.borderColor = corcerto
        senerro.style.display = 'none'
        return
    } else {
        pasini.style.borderColor = corbordas
        cadeado.style.borderColor = corbordas
        senerro.style.display = 'none'
    }
})

nomeini.addEventListener('blur', () => {
    if (nomeini.value == '') {
        nomeini.style.borderColor = corbordas
        busto.style.borderColor = corbordas
        nomerro.style.display = 'none'
        return
    } else if (!tmvalido(nomeini.value, 5, 50)) {
        nomeini.style.borderColor = corerro
        busto.style.borderColor = corerro
        nomerro.style.display = 'block'
        return
    } else {
        nomeini.style.borderColor = corcerto
        busto.style.borderColor = corcerto
        nomerro.style.display = 'none'
        return
    }
})

Idgenero.addEventListener('blur', () => {
    if (!Idgenero.value == "") {
        Idgenero.style.borderColor = corcerto
        generro.style.display = 'none'
        return
    } else {
        Idgenero.style.borderColor = corerro
        generro.style.display = 'inline'
    }
})

cargoini.addEventListener('blur', () => {
    if (cargoini.value == '') {
        cargoini.style.borderColor = corbordas
        martelo.style.borderColor = corbordas
        carerro.style.display = 'none'
        return
    } else if (!tmvalido(cargoini.value, 2, 250)) {
        cargoini.style.borderColor = corerro
        martelo.style.borderColor = corerro
        carerro.style.display = 'block'
        return
    } else {
        cargoini.style.borderColor = corcerto
        martelo.style.borderColor = corcerto
        carerro.style.display = 'none'
        return
    }
})

const formlogin = document.getElementById('logini');

abrirform.addEventListener('click', () => {
    if (emini.value == 'teste@teste.teste') {
        emini.style.borderColor = corerro
        carta.style.borderColor = corerro
        emerro2.style.display = 'block'
    } else if (botao == 'entrar') {
        emini.style.borderColor = corerro
        carta.style.borderColor = corerro
        emerro.style.display = 'block'
        pasini.style.borderColor = corerro
        cadeado.style.borderColor = corerro
        senerro.style.display = 'block'
    } else {
        if (botao == 'registrar') {
            regis.style.display = 'block'
            botao = 'registrando'
        } else {
            cont = true
            if (!tmvalido(pasini.value, 8, 250)) { // verifica se a senha é invalida para emitir um aviso 
                pasini.style.borderColor = corerro
                cadeado.style.borderColor = corerro
                senerro.style.display = 'block'
                cont = false
            }
            if (!EmailValido(emini.value)) {
                emini.style.borderColor = corerro
                carta.style.borderColor = corerro
                emerro.style.display = 'block'
                cont = false
            }
            if (!tmvalido(nomeini.value, 5, 50)) {
                nomeini.style.borderColor = corerro
                busto.style.borderColor = corerro
                nomerro.style.display = 'block'
                cont = false
            }
            if (Idgenero.value == '') {
                Idgenero.style.borderColor = corerro
                cont = false
            }
            if (!tmvalido(cargoini.value, 2, 250)) {
                cargoini.style.borderColor = corerro
                martelo.style.borderColor = corerro
                carerro.style.display = 'block'
                cont = false
            }
            if (cont) {
                regis.style.display = 'block'
                formlogin.submit()
            } else {
                alert("Verifique o formulario")
            }
        }
    }
})

//Envia alerta de erro no fomulario
formlogin.addEventListener("submit", (event) => {
    event.preventDefault()
    if (botao == 'registrar'){ //ver se ta na tela de registro e invalida o botão submit
        return
    }
    if (!EmailValido(emini.value) || emini.value == "" || !tmvalido(pasini.value, 8, 250)) { // verifica se o email é invalido ou esta vazio para emitir um aviso 
        alert("Verifique o formulario")
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
        if(email.length <= 250) {
            return true
        }
    }
    return false
}

//Valida Senha
function tmvalido(value, minimo, maximo) { // valida a senha de acordo com o tamanho
    if (value.length >= minimo && value.length <= maximo) {
        return true
    }
    return false
}

const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Choose an image";
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture__img");

      pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage.innerHTML = pictureImageTxt;
  }
});