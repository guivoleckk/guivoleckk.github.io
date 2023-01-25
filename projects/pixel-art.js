// pegando elementos

const pegandoPaletaCores = document.getElementById('color-palette');
const pegandoLousaTamanho = document.querySelector('#pixel-board');
let pegandoQuadradinhosPaleta = document.getElementsByClassName('color');
const pegaVqv = document.querySelector('#generate-board');

const valorInput = document.querySelector('#board-size');
// funcoes

// defindo valor inicial matriz
const construindoPaleta = () => {
  for (let index = 0; index < 4; index += 1) {
    const criaDiv = document.createElement('div');
    criaDiv.className = 'color';
    criaDiv.style.border = '1px solid black';
    criaDiv.style.width = '40px';
    criaDiv.style.height = '40px';
    criaDiv.style.display = 'inline-block';
    criaDiv.style.margin = '8px';
    pegandoPaletaCores.appendChild(criaDiv);
  }
};

const pintandoPaleta = () => {
  const primeiroParam = Math.floor(Math.random() * 254);
  const segundoParam = Math.floor(Math.random() * 254);
  const terceiroiroParam = Math.floor(Math.random() * 254);
  console.log(`rgb ${primeiroParam}, ${segundoParam}, ${terceiroiroParam}`);
  return `rgb(${primeiroParam}, ${segundoParam}, ${terceiroiroParam})`;
};

const guardandoCoresAleatoriasStorage = () => {
  const pegandoCoresQuadradinhos = document.getElementsByClassName('color');
  const salvandoCoresProStorage = [];
  for (let index = 0; index < pegandoCoresQuadradinhos.length; index += 1) {
    salvandoCoresProStorage.push(pegandoCoresQuadradinhos[index].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(salvandoCoresProStorage));
};

const jogandoCoresPaleta = () => {
  for (let index = 1; index < pegandoQuadradinhosPaleta.length; index += 1) {
    pegandoQuadradinhosPaleta[0].style.backgroundColor = 'black';
    pegandoQuadradinhosPaleta[index].style.backgroundColor = pintandoPaleta();
  }
  guardandoCoresAleatoriasStorage();
};

const gerandoCoresAleatorias = () => {
  const pegandoBotao = document.getElementById('button-random-color');
  pegandoBotao.addEventListener('click', () => {
    jogandoCoresPaleta();
  });
};

const pintandoCoresSalvasStorage = () => {
  const pegandoOsquadradinhosDeNovo = document.getElementsByClassName('color');
  const recuperandoCoresStorage = JSON.parse(localStorage.getItem('colorPalette'));

  for (let index = 0; index < pegandoOsquadradinhosDeNovo.length; index += 1) {
    pegandoOsquadradinhosDeNovo[index].style.backgroundColor = recuperandoCoresStorage[index];
  }
};

const pretoNoInicio = () => {
  for (let index = 1; index < pegandoQuadradinhosPaleta.length; index += 1) {
    pegandoQuadradinhosPaleta[0].classList = 'color selected';
  }
};

const selecionandoCor = () => {
  for (let index = 0; index < pegandoQuadradinhosPaleta.length; index += 1) {
    pegandoQuadradinhosPaleta[index].addEventListener('click', (event) => {
      const selecionado = document.querySelector('.selected');
      if (selecionado) {
        selecionado.classList.remove('selected');
      }
      event.target.classList.add('selected');
    });
  }
};

const pintarBoard = (event) => {
  if (event.target.classList.contains('pixel')) {
    const pegaSelected = document.querySelector('.selected');
    const pegaBckgcolor = window
      .getComputedStyle(pegaSelected)
      .getPropertyValue('background-color');
    event.target.style.backgroundColor = pegaBckgcolor;
  }
};

document.addEventListener('click', pintarBoard);
const pegarBoard = document.getElementsByClassName('pixel');
const botaoLimpar = document.querySelector('#clear-board');
const limpaBoard = () => {
  for (let index = 0; index < pegarBoard.length; index += 1) {
    pegarBoard[index].style.backgroundColor = 'white';
  }
};
botaoLimpar.addEventListener('click', limpaBoard);

const salvandoDesenho = () => {
  const pegandoOTalDesenho = document.querySelectorAll('.pixel');
  const arrayDesenhoSalvo = [];
  for (let index = 0; index < pegandoOTalDesenho.length; index += 1) {
    arrayDesenhoSalvo.push(pegandoOTalDesenho[index].style.backgroundColor);
    localStorage.setItem('pixelBoard', JSON.stringify(arrayDesenhoSalvo));
  }
};

const pintandoDesenhoSalvo = () => {
  const pegandoOTalDesenho = document.querySelectorAll('.pixel');
  for (let index = 0; index < pegandoOTalDesenho.length; index += 1) {
    pegandoOTalDesenho[index].addEventListener('click', () => {
      const quadradoPintado = document.querySelector('.selected');
      pegandoOTalDesenho[index].style.backgroundColor = quadradoPintado.style.backgroundColor;
      salvandoDesenho();
    });
  }
};

const jogarDesenhoTelaBranca = () => {
  const pegandoOTalDesenho = document.querySelectorAll('.pixel');
  const resgatandoStorageBckColor = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index = 0; index < pegandoOTalDesenho.length; index += 1) {
    pegandoOTalDesenho[index].style.backgroundColor = resgatandoStorageBckColor[index];
  }
};

// tive que refatorar tudo que eu tinha feito, mesmo os testes passando nos req 13 e 14, pois tive dificuldade para pegar o length do input dinamicamente e salvar o tamanho do board, por conta disso tive q refazer esses requisitos para finalmente tentar resolver o req 15.

const regularizaInput = () => {
  valorInput.type = 'number';
  valorInput.setAttribute('min', '1');
  valorInput.value = '';
};

// só um teste para ver o dinamismo do numero no localStorage
const roubandoNumeroLocalStorage = JSON.parse(localStorage.getItem('boardSize'))
console.log(roubandoNumeroLocalStorage);

const criacaoTamanhoBoard = () => {
  if (valorInput.value === '') {
    valorInput.value = roubandoNumeroLocalStorage;
  } if (valorInput.value < 5) {
    valorInput.value = 5;
  } else if (valorInput.value > 50) {
    valorInput.value = 50;
  }
  for (let index = 0; index < valorInput.value * valorInput.value; index += 1) {
    const divs = document.createElement('div');
    divs.classList.add('pixel');
    pegandoLousaTamanho.appendChild(divs);
    divs.style.backgroundColor = 'white';
    divs.style.width = '40px'; 
    divs.style.height = '40px';
    divs.style.border = '1px solid black'; 
    divs.style.display = 'inline-block'
    pegandoLousaTamanho.style.height = 42 * valorInput.value + 'px';
    pegandoLousaTamanho.style.width = 42 * valorInput.value + 'px';
  }
  valorInput.value = '';
};

const chamaCriacaoBoard = () => {
  const lousa = document.getElementById('pixel-board');
  lousa.innerText = null;
  if (valorInput.value === '') {
    alert ('Board inválido!');
  } else {
    localStorage.setItem('boardSize', JSON.stringify(valorInput.value));
    criacaoTamanhoBoard();
  }
};

const clicandoBotaoVqv = () => {
  pegaVqv.addEventListener('click', chamaCriacaoBoard);
};

// carregando funcoes

window.onload = () => {
  regularizaInput();
  chamaCriacaoBoard();
  criacaoTamanhoBoard();
  construindoPaleta();
  gerandoCoresAleatorias();
  if (localStorage.getItem('colorPalette') === null) {
    jogandoCoresPaleta();
  } else {
    pintandoCoresSalvasStorage();
  }
  clicandoBotaoVqv();
  pretoNoInicio();
  selecionandoCor();
  if (localStorage.getItem('pixelBoard') === null) {
    pintandoDesenhoSalvo();
  } else {
    jogarDesenhoTelaBranca();
  }
};