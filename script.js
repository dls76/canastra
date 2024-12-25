const players = [];
const btPts = [];
const input = document.querySelector("#input");
const btAdd = document.querySelector("#bt-add");
const btWinner = document.querySelector("#bt-winner");

btAdd.addEventListener("click", addPlayer);

function addPlayer() {
  if (input.value == "") {
    alert("Preencha o nome!");
  } else {
    // Criação de elementos
    let winnerTag = document.createElement("div");
    let nome = document.createElement("div");
    let total = document.createElement("div");
    let historico = document.createElement("div");
    let inputPartida = document.createElement("input");
    let inputCartas = document.createElement("input");
    let btAnotarPts = document.createElement("button");
    let marcadores = document.createElement("div");
    let cabecalho = document.createElement("div");
    let player = document.createElement("div");
    let main = document.querySelector("main");

    // Configuração dos elementos
    winnerTag.classList.add("winner-tag");
    winnerTag.innerHTML = "Vencedor";
    winnerTag.style.display = "none";

    nome.classList.add("nome");
    total.classList.add("total");
    historico.classList.add("historico");

    inputPartida.classList.add("ptsPartida");
    inputPartida.setAttribute("placeholder", "Partida");

    inputCartas.classList.add("ptsCartas");
    inputCartas.setAttribute("placeholder", "Cartas");

    btAnotarPts.classList.add("bt-anotarPts");
    btAnotarPts.innerHTML = "Somar";

    marcadores.classList.add("marcadores");
    cabecalho.classList.add("cabecalho");
    player.classList.add("jogadores");

    nome.innerHTML = input.value;
    total.innerHTML = 0;

    // Evento para somar pontos
btAnotarPts.addEventListener("click", function () {
  // Identificar o índice do botão clicado
  const index = btPts.indexOf(btAnotarPts);
  const jogador = players[index];

  // Obter valores dos inputs
  const pontosPartida = inputPartida.value.trim() === "" ? null : parseInt(inputPartida.value);
  const pontosCartas = inputCartas.value.trim() === "" ? null : parseInt(inputCartas.value);

  // Verificar se ambos os campos foram preenchidos
  if (pontosPartida === null || pontosCartas === null) {
    alert("Preencha todos os campos");
    return; // Impedir que o restante do código seja executado
  }

  // Calcular pontuação da rodada
  const pontosRodada = pontosPartida + pontosCartas;

  // Atualizar os pontos do jogador
  jogador.pts.pp += pontosPartida;
  jogador.pts.pc += pontosCartas;
  jogador.pts.tt = jogador.pts.pt();

  // Atualizar pontuação total
  total.innerHTML = jogador.pts.tt;

  // Atualizar histórico de pontos
  historico.innerHTML += `<p>${pontosPartida} + ${pontosCartas} = ${pontosRodada}</p>`;

  // Limpar campos
  inputPartida.value = "";
  inputCartas.value = "";
});


    // Montagem do jogador no DOM
    marcadores.appendChild(inputPartida);
    marcadores.appendChild(inputCartas);
    marcadores.appendChild(btAnotarPts);
    cabecalho.appendChild(nome);
    cabecalho.appendChild(total);
    player.appendChild(cabecalho);
    player.appendChild(historico);
    player.appendChild(marcadores);
    player.appendChild(winnerTag);
    main.appendChild(player);

    // Adicionar jogador ao array
    players.push({
      nome: input.value,
      pts: {
        pp: 0,
        pc: 0,
        pt: function () {
          return this.pp + this.pc;
        },
        tt: 0
      },
      winnerTag: winnerTag, // Referência ao elemento no DOM
      historico: historico  // Referência ao histórico do jogador
    });

    btPts.push(btAnotarPts);
    input.value = "";
    input.focus();
  }
}
btWinner.addEventListener("click", function () {
  let max = 0;
  let winner = null;

  // Identificar maior pontuação
  players.forEach(player => {
    if (player.pts.tt > max) {
      max = player.pts.tt;
      winner = player;
    }
  });

  // Ordenar jogadores por pontuação em ordem decrescente
  const sortedPlayers = [...players].sort((a, b) => b.pts.tt - a.pts.tt);

  // Atualizar tags de vencedor
  players.forEach(player => {
    if (player === winner) {
      player.winnerTag.style.display = "block"; // Mostra a tag para o vencedor
    } else {
      player.winnerTag.style.display = "none"; // Esconde para os demais
    }
  });

  // Exibir diferença de pontos no histórico do vencedor
  let differenceHistory = `<p><strong>Diferença:</strong></p>`;
  for (let i = 1; i < sortedPlayers.length; i++) {
    const diff = sortedPlayers[0].pts.tt - sortedPlayers[i].pts.tt;
    differenceHistory += `<p>${diff} pontos a mais que ${sortedPlayers[i].nome}</p>`;
  }
  winner.historico.innerHTML += differenceHistory;

  console.log("Max points:", max);
  console.log("Winner:", winner);
});

