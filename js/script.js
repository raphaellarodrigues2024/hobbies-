import { perguntas } from './perguntas.js';
import { embaralhar } from './aleatorio.js';

const telaInicial = document.querySelector('.tela-inicial');
const botaoIniciar = document.querySelector('.iniciar-btn');
const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const caixaResultado = document.querySelector('.caixa-resultado');
const textoResultado = document.querySelector('.texto-resultado');
const botaoNovamente = document.querySelector('.novamente-btn');

let perguntasDoJogo = [];
let perguntaAtual = 0;
let pontuacao = 0;
let respondida = false;

function iniciarJogo() {
    perguntasDoJogo = embaralhar(perguntas);
    perguntaAtual = 0;
    pontuacao = 0;
    respondida = false;

    telaInicial.classList.add('escondido');
    caixaResultado.classList.remove('mostrar');

    mostrarPergunta();
}

function mostrarPergunta() {
    respondida = false;

    if (perguntaAtual >= perguntasDoJogo.length) {
        mostrarResultado();
        return;
    }

    const pergunta = perguntasDoJogo[perguntaAtual];

    caixaPerguntas.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntasDoJogo.length}: ${pergunta.enunciado}`;

    caixaAlternativas.innerHTML = '';

    pergunta.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement('button');

        botao.textContent = alternativa;
        botao.addEventListener('click', () => {
            verificarResposta(indice);
        });

        caixaAlternativas.appendChild(botao);
    });
}

function verificarResposta(indiceEscolhido) {
    if (respondida) return;

    respondida = true;

    const pergunta = perguntasDoJogo[perguntaAtual];
    const botoes = caixaAlternativas.querySelectorAll('button');

    botoes.forEach((botao, indice) => {
        botao.disabled = true;

        if (indice === pergunta.correta) {
            botao.style.backgroundColor = '#4caf50';
            botao.style.color = '#ffffff';
        } else if (indice === indiceEscolhido) {
            botao.style.backgroundColor = '#c0392b';
            botao.style.color = '#ffffff';
        }
    });

    if (indiceEscolhido === pergunta.correta) {
        pontuacao++;
        caixaPerguntas.textContent = '✅ Resposta correta!';
    } else {
        caixaPerguntas.textContent =
            `❌ Não foi dessa vez! A resposta correta é: ${pergunta.alternativas[pergunta.correta]}.`;
    }

    const botaoProxima = document.createElement('button');
    botaoProxima.textContent =
        perguntaAtual === perguntasDoJogo.length - 1
            ? 'Ver resultado'
            : 'Próxima pergunta';

    botaoProxima.style.marginTop = '20px';
    botaoProxima.addEventListener('click', () => {
        perguntaAtual++;
        mostrarPergunta();
    });

    caixaAlternativas.appendChild(botaoProxima);
}

function mostrarResultado() {
    caixaPerguntas.textContent = '';
    caixaAlternativas.innerHTML = '';
    caixaResultado.classList.add('mostrar');

    let mensagem;

    if (pontuacao === perguntasDoJogo.length) {
        mensagem = 'Você é um verdadeiro Mestre Cuca! 👨‍🍳';
    } else if (pontuacao >= 4) {
        mensagem = 'Muito bem! Você tem talento na cozinha! 🍲';
    } else if (pontuacao >= 2) {
        mensagem = 'Bom trabalho! Continue praticando suas receitas! 🥗';
    } else {
        mensagem = 'Todo chef começa aprendendo. Tente novamente! 🍳';
    }

    textoResultado.textContent =
        `Você acertou ${pontuacao} de ${perguntasDoJogo.length} perguntas. ${mensagem}`;
}

function jogarNovamente() {
    telaInicial.classList.remove('escondido');
    caixaPerguntas.textContent = '';
    caixaAlternativas.innerHTML = '';
    caixaResultado.classList.remove('mostrar');
}

botaoIniciar.addEventListener('click', iniciarJogo);
botaoNovamente.addEventListener('click', jogarNovamente);