import { getEnvironmentData } from "worker_threads";

clickLogin = (e) => {
    e.preventDefault();
    fetch ("/back-end/autentificacao.cntroll.js", {
       method: "post",
       body: JSON.stringify({
         email: this.state.emailValue,
         senha: this.state.senhaValue,
         nome: this.state.nomeValue,
         genero: this.state.generoValue,
         cargo: this.state.cargoValue,
         nucleo: this.state.nucleoValue
      }),
  })
    .then((response) => response.json())
    .then((result) => {
      if(result.message === "Email já cadastrado"){
            alert("Please check your login information.");
       } else {
            alert("You are logged in.");
            this.goToMain();
       }
    });
  }