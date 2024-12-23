const players = [];
const btPts = [...document.querySelectorAll("bt-anotarPts")];
const input = document.querySelector("#input");
const btAdd = document.querySelector("#bt-add");
btAdd.addEventListener("click", addPlayer);
const partidas = [...document.querySelectorAll(".ptsPartida")]
const cartas = [...document.querySelectorAll(".ptsCartas")]

function addPlayer() {

  if (input.value == "") {
    alert("Preencha o nome!")
  } else { 
    let nome = document.createElement("div");
    let total = document.createElement("div");
    let historico = document.createElement("div");
    let rodada = document.createElement("div");
    let indexRodada = document.createElement('div');
    let historicoRodada = document.createElement('div');
    let totalRodada = document.createElement('div');
    let inputPartida = document.createElement("input");
    let inputCartas = document.createElement("input");
    let btAnotarPts = document.createElement("button");
    let cabecalho = document.createElement("div");
    let marcadores = document.createElement("div");
    let player = document.createElement("div");
    let main = document.querySelector("main");
    
    nome.classList.add("nome");
    nome.setAttribute("placeholder", "Jogador ou Dupla");
    total.classList.add("total");
    historico.classList.add("historico");
    indexRodada.classList.add('index-rodada');
    historicoRodada.classList.add('historico-rodada');
    totalRodada.classList.add('total-rodada');
    rodada.classList.add("rodada")
    inputPartida.classList.add("ptsPartida");
    inputPartida.setAttribute("placeholder", "Partiu");
    inputCartas.classList.add("ptsCartas");
    inputCartas.setAttribute("placeholder", "Cartas");
    btAnotarPts.classList.add("bt-anotarPts");
    btAnotarPts.setAttribute('id', 'bt'+(btPts.length+1))
    marcadores.classList.add("marcadores");
    cabecalho.classList.add("cabecalho");
    player.classList.add("jogadores");

    nome.innerHTML = input.value;
    total.innerHTML = 0;
    btAnotarPts.innerHTML = "Somar";
    
    btAnotarPts.addEventListener("click", function () {
      const index = btPts.indexOf(btAnotarPts);
      const jogador = players[index];
      const pontosPartida = parseInt(inputPartida.value) || 0;
      const pontosCartas = parseInt(inputCartas.value) || 0;
      const pontosRodada = pontosPartida + pontosCartas

      jogador.pts.pp += pontosPartida;
      jogador.pts.pc += pontosCartas;
      jogador.pts.tt = jogador.pts.pt();

      if (pontosPartida  == "" || pontosCartas==""){
        alert('Preencha todos os campos')
      } else { 
        // Atualizar o elemento total com os pontos totais
      total.innerHTML = jogador.pts.tt;
    
      // Atualizar o histórico de pontos
      // rodada.innerHTML = 'Rodada ';
      // historicoRodada.innerHTML = `Partiu de ${jogador.pts.pp} + Cartas ${jogador.pts.pc}`;
      // totalRodada.innerHTML = `${jogador.pts.tt}`


      historico.innerHTML += `<p class="historico-rodada">${inputPartida.value} + ${inputCartas.value} = ${pontosRodada}</p>`;

      // Limpar os campos de entrada após marcar os pontos
      inputPartida.value = "";
      inputCartas.value = "";
      }
    
  });

  marcadores.appendChild(inputPartida);
  marcadores.appendChild(inputCartas);
  marcadores.appendChild(btAnotarPts);
  cabecalho.appendChild(nome);
  cabecalho.appendChild(total);
  player.appendChild(cabecalho);
  player.appendChild(historico);
  player.appendChild(marcadores);
  main.appendChild(player);

  
  players.push({
    nome: input.value,
    pts: {
      pp: 0,
      pc: 0,
      pt: function () {
        return this.pp + this.pc
      },
      tt: 0
    },
  });

  btPts.push(btAnotarPts);
  partidas.push()
  input.value = "";
  input.focus();
  }
} 