
let jsondata;
let opcaoSelecionada;
let indiceAtividadeAtual = 0;
let pontuacao = 0;

function carregarAtividade() {
    fetch('atividade.json')
        .then(response => response.json())
        .then(data => {
            jsondata = data;
            const perguntaAtual = data[indiceAtividadeAtual];
            document.getElementById('pergunta').textContent = perguntaAtual.pergunta;
            document.getElementById('imagem').src = perguntaAtual.imagem;
            document.getElementById('opcao1').src = perguntaAtual.opcoes[0].imagem;
            document.getElementById('opcao2').src = perguntaAtual.opcoes[1].imagem;

        })
        .catch(error => console.error('ocorreu um erro ao carregar os dados!:', error));
}

function selecionarOpcao(opcao) {
    opcaoSelecionada = opcao;
    const opcoes = document.querySelectorAll('.opcao1, .opcao2');
    opcoes.forEach((opcao, index) => {
        const img = opcao.querySelector('img');
        if (index === opcaoSelecionada) {
            img.style.border = '3px solid #FFBD3E';
            img.style.borderRadius = '5px';
        } else {
            img.style.border = 'none';
            img.style.borderRadius = 'none';
        }
    });
}

function continuar() {
    const respostaCorreta = jsondata[indiceAtividadeAtual].opcoes[opcaoSelecionada].correcao;

    if (respostaCorreta === 1) {
        pontuacao++;
        limparRespostaSelecionada();
        alert('Uau, muito bem!!');
        indiceAtividadeAtual++;

        if (indiceAtividadeAtual >= jsondata.length) {
            indiceAtividadeAtual = 0;
            alert('Atividade completa. Parabéns, Nicolle!!');
            window.location.href = `atividade-completa.html?pontuacao=${pontuacao}`;
            return;
        }
    } else {
        pontuacao--;
        limparRespostaSelecionada();
        alert('Hmm, isso não parece estar certo tente novamente!');
    }

    const perguntaAtual = jsondata[indiceAtividadeAtual];

    document.getElementById('pergunta').textContent = perguntaAtual.pergunta;
    document.getElementById('imagem').src = perguntaAtual.imagem;
    document.getElementById('opcao1').src = perguntaAtual.opcoes[0].imagem;
    document.getElementById('opcao2').src = perguntaAtual.opcoes[1].imagem;
}

function limparRespostaSelecionada() {
    const imagens = document.querySelectorAll('.opcao1 img, .opcao2 img');
    imagens.forEach(img => {
        img.style.border = 'none';
        img.style.borderRadius = 'none';
    });
}

