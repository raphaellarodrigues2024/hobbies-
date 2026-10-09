const botaoDica = document.getElementById("botaoDica");
const botaoReceita = document.getElementById("botaoReceita");

const dica = document.getElementById("dica");
const mensagem = document.getElementById("mensagem");

botaoDica.addEventListener("click", function () {
    dica.textContent =
        "Dica do chef: peneire a farinha e o chocolate para deixar o bolo mais fofinho!";
});

botaoReceita.addEventListener("click", function () {
    mensagem.textContent =
        "Mãos à obra! Separe os ingredientes e vamos cozinhar! 👩‍🍳";
});