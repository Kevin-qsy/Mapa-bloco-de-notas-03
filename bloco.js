const params = new URLSearchParams(window.location.search);
const nomeEstrela = params.get('estrela');
const nomeBloco = params.get('bloco');

if (!nomeEstrela || !nomeBloco) {
  alert('Dados faltando!');
  window.close();
}

document.getElementById('titulo').innerText = `Editando: ${nomeBloco}`;

const editor = document.getElementById('editor');
let blocos = {};

function carregarBloco() {
  const dados = JSON.parse(localStorage.getItem('blocos_' + nomeEstrela)) || {};
  blocos = dados;
  editor.innerHTML = blocos[nomeBloco] || '';
}

function salvar() {
  blocos[nomeBloco] = editor.innerHTML;
  localStorage.setItem('blocos_' + nomeEstrela, JSON.stringify(blocos));
  alert('Bloco salvo!');
}

function format(command, value = null) {
  document.execCommand(command, false, value);
}

carregarBloco();
