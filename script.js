const tabuleiro = document.getElementById("tabuleiro");
const embaralharBtn = document.getElementById("embaralharBtn");

// Modal
const modal = document.getElementById("modal");
const imgCartaGrande = document.getElementById("img-carta-grande");
const tituloCarta = document.getElementById("titulo-carta");
const fechar = document.getElementById("fechar");

let imagens = [];
for (let i = 1; i <= 63; i++) {
  imagens.push(`img/${i}.jpg`);
}

function embaralhar(array) {
  return array.sort(() => 0.5 - Math.random());
}

function mostrarCartaModal(caminhoImg) {
  imgCartaGrande.src = caminhoImg;
  tituloCarta.innerText = "Faça essa posição";
  modal.style.display = "flex";
}

function criarCartas() {
  tabuleiro.innerHTML = "";
  let imagensEmbaralhadas = embaralhar([...imagens]);

  for (let i = 0; i < 63; i++) {
    const container = document.createElement("div");
    container.classList.add("carta-container");

    const carta = document.createElement("div");
    carta.classList.add("carta");

    const frente = document.createElement("div");
    frente.classList.add("frente");
    frente.style.backgroundImage = `url('${imagensEmbaralhadas[i]}')`;

    const verso = document.createElement("div");
    verso.classList.add("verso");

    carta.appendChild(frente);
    carta.appendChild(verso);
    container.appendChild(carta);
    tabuleiro.appendChild(container);

    let revelada = false;
    carta.addEventListener("click", () => {
      if (!revelada) {
        carta.classList.add("virada");
        revelada = true;

        setTimeout(() => {
          mostrarCartaModal(imagensEmbaralhadas[i]);
        }, 500);
      }
    });
  }
}

embaralharBtn.addEventListener("click", criarCartas);

// Fecha o modal
fechar.onclick = () => modal.style.display = "none";
modal.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

criarCartas();
