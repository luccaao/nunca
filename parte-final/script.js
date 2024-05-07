class JogoNunca {
    constructor(numJogadores, selectedPlayer) {
        // Inicialização dos atributos da classe
        this.numJogadores = numJogadores; // Número total de jogadores
        this.selectedPlayer = selectedPlayer; // Índice do jogador selecionado para começar
        this.currentPlayer = selectedPlayer; // Índice do jogador atual
        this.unidades = Array(numJogadores).fill(0); // Array para armazenar as unidades de cada jogador
        this.barras = Array(numJogadores).fill(0); // Array para armazenar as barras de cada jogador
        this.placas = Array(numJogadores).fill(0); // Array para armazenar as placas de cada jogador
        // Referências aos elementos HTML
        this.btnGerarNumero = document.getElementById('btnGerarNumero');
        this.numeroDiv = document.querySelector('.numero__sort');
        this.unidadesDiv = document.getElementById('unidades');
        // Adiciona um ouvinte de evento para o botão de gerar número
        this.btnGerarNumero.addEventListener('click', this.gerarNumero.bind(this));
        // Atualiza as unidades exibidas na interface
        this.atualizarUnidades();
    }

    gerarNumero() {
        // Gera um número aleatório entre 0 e 9
        const numero = Math.floor(Math.random() * 10);
        // Exibe o número gerado na interface
        this.numeroDiv.innerText = numero;
        
        // Adiciona o número gerado às unidades do jogador atual
        this.unidades[this.currentPlayer] += numero;
        
        // Atualiza as unidades exibidas na interface
        this.atualizarUnidades();
        // Verifica se é necessário trocar de jogador
        this.verificarTroca(this.currentPlayer);
        // Atualiza o índice do jogador atual para o próximo jogador
        this.currentPlayer = (this.currentPlayer + 1) % this.numJogadores;
    }

    atualizarUnidades() {
        // Limpa o conteúdo anterior das unidades na interface
        this.unidadesDiv.innerHTML = '';
        
        // Para cada jogador, cria um elemento HTML para exibir suas unidades, barras e placas
        this.unidades.forEach((unidade, index) => {
            const jogadorDiv = document.createElement('div');
            jogadorDiv.classList.add('unidade');
            jogadorDiv.innerText = `Jogador ${index + 1}: ${unidade} | Barras: ${this.barras[index]} | Placas: ${this.placas[index]}`;
            this.unidadesDiv.appendChild(jogadorDiv);
        });
    }
    

    verificarTroca(jogador) {
        // Obtém as unidades, barras e placas do jogador atual
        const unidades = this.unidades[jogador];
        const barras = this.barras[jogador];
        const placas = this.placas[jogador];

        // Verifica se as unidades ultrapassaram 10
        if (unidades >= 10) {
            // Reduz as unidades para manter apenas o valor das unidades (excluindo as dezenas)
            this.unidades[jogador] = unidades % 10; 
            // Incrementa o número de barras do jogador
            this.barras[jogador] += 1;

            // Se o número de barras atingiu 10, incrementa o número de placas e zera as barras
            if (this.barras[jogador] >= 10) {
                this.barras[jogador] = 0;
                this.placas[jogador] += 1;
            } 

            // Atualiza as unidades exibidas na interface
            this.atualizarUnidades();
        }

        // Se o jogador completou uma placa, exibe um alerta informando que o jogador ganhou o jogo
        if (this.placas[jogador] == 1) {
            alert(`O jogador número ${this.currentPlayer + 1} ganhou o jogo!`);
        }
    }
}

// Event listener para o botão de iniciar o jogo
document.getElementById('btnIniciarJogo').addEventListener('click', () => {
    // Referências aos elementos HTML relevantes
    const questionario = document.querySelector(".quest");
    const startSection = document.querySelector(".start");

    // Obtém o número de jogadores escolhido pelo usuário
    const numJogadores = parseInt(document.getElementById('numJogadores').value);
    // Verifica se o número de jogadores está entre 2 e 4
    if (numJogadores >= 2 && numJogadores <= 4) {
        // Preenche as opções para escolha do jogador que começa
        const startingPlayerSelect = document.getElementById('startingPlayer');
        startingPlayerSelect.innerHTML = '';
        for (let i = 1; i <= numJogadores; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Jogador ${i}`;
            startingPlayerSelect.appendChild(option);
        }

        // Exibe a seção de escolha do jogador que começa e esconde o questionário de inicialização
        questionario.style.display = "none";
        startSection.style.display = "flex";
        

        // Adiciona um event listener para o botão de começar o jogo
        document.getElementById('btnStartGame').addEventListener('click', () => {
            // Obtém o índice do jogador selecionado para começar
            const selectedPlayer = parseInt(startingPlayerSelect.value) - 1; // Subtrai 1 para corresponder ao índice do array
            // Verifica se o jogador selecionado é válido
            if (selectedPlayer >= 0 && selectedPlayer < numJogadores) {
                
                // Esconde a seção de escolha do jogador e o questionário de inicialização
                
                questionario.style.display = "none";
                startSection.style.display = "none";
                // Inicia o jogo com o jogador selecionado
                new JogoNunca(numJogadores, selectedPlayer);
            } else {
                alert('Por favor, selecione um jogador válido.');
            }
        });
        
    } else {
        alert('Por favor, selecione um número de jogadores entre 2 e 4.');
    }
});
