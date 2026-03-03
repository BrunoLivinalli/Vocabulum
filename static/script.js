
// VARIÁVEIS PRINCIPAIS DO JOGO

let resposta = "";        // Palavra sorteada do backend
let tentativaAtual = "";  // Letras digitadas pelo jogador
let linha = 0;            // Linha atual (0 a 5)


// BUSCA A PALAVRA DO BACKEND

fetch("/palavra")
  .then(r => r.text())
  .then(p => {
    resposta = p.trim().toUpperCase();
    console.log("Palavra sorteada:", resposta);
  });

// CRIAÇÃO DO TABULEIRO 
const board = document.getElementById("board");

for (let i = 0; i < 30; i++) { // 6 tentativas * 5 letras
    const div = document.createElement("div");
    div.classList.add("tile");
    board.appendChild(div);
}



// TECLADO VIRTUAL, as teclas JÁ EXISTEM no HTML

const keyboard = document.getElementById("keyboard");

// Clique em teclas do teclado virtual
keyboard.addEventListener("click", (e) => {
    if (!e.target.classList.contains("key")) return;

    const valor = e.target.textContent;

    if (valor === "ENTER") {
        enviar();
    } else if (valor === "⌫") {
        apagar();
    } else {
        digitar(valor);
    }
});



// TECLADO FÍSICO
document.addEventListener("keydown", (e) => {
    if (e.key.match(/^[a-zA-Z]$/)) digitar(e.key.toUpperCase());
    if (e.key === "Backspace") apagar();
    if (e.key === "Enter") enviar();
});



// FUNÇÕES DO JOGO

// Adiciona uma letra à tentativa atual
function digitar(l) {
    if (tentativaAtual.length < 5) {
        tentativaAtual += l;
        atualizarDisplay();
    }
}

// Apaga última letra
function apagar() {
    tentativaAtual = tentativaAtual.slice(0, -1);
    atualizarDisplay();
}

// Atualiza a linha de quadrados na tela
function atualizarDisplay() {
    const tiles = document.querySelectorAll(".tile");

    for (let i = 0; i < 5; i++) {
        tiles[linha * 5 + i].textContent = tentativaAtual[i] || "";
    }
}

// Valida tentativa
function enviar() {
    if (tentativaAtual.length !== 5) return;

    const tiles = document.querySelectorAll(".tile");

    for (let i = 0; i < 5; i++) {
        const letra = tentativaAtual[i];
        const tile = tiles[linha * 5 + i];

        // Feedback igual ao Termo
        if (letra === resposta[i]) {
            tile.classList.add("correct");
        } else if (resposta.includes(letra)) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }

    // Acertou
    if (tentativaAtual === resposta) {
        setTimeout(() => alert("Parabéns! Você acertou! 🎉"), 100);
        return;
    }

    linha++;
    tentativaAtual = "";

    // Perdeu o jogo
    if (linha === 6) {
        alert("Fim de jogo! A palavra era: " + resposta);
    }
}