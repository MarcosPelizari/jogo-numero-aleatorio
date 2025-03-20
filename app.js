let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

exibirMensagemInicial();

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Número Secreto';
// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    let mensagemNumeroLimite = `Escolha um número entre 1 e ${numeroLimite}`;
    exibirTextoNaTela('p', mensagemNumeroLimite);
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('h1', 'Acertou!');
        let mensagemTentativa = `Você descobriu o número secreto em ${tentativa} ${palavraTentativa}.`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            let mensagemChute = `O número secreto é menor do que ${chute}`;
            exibirTextoNaTela('p', mensagemChute);
        } else {
            let mensagemChute = `O número secreto é maior do que ${chute}`;
            exibirTextoNaTela('p', mensagemChute);
        }
        tentativa++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroSecreto = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeNumeroLista = listaDeNumerosSorteados.length;

    if (quantidadeNumeroLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroSecreto)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroSecreto);
        return numeroSecreto;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}