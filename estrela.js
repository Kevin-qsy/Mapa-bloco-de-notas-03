
  const params = new URLSearchParams(window.location.search);
  const nomeEstrela = params.get('nome');

  if (!nomeEstrela) {
    alert('Nome da estrela não encontrado.');
    window.close();
  }

  document.getElementById('titulo').innerText = `Blocos de Notas da Estrela: ${nomeEstrela}`;

  const listaBlocos = document.getElementById('blocos');
  const editor = document.getElementById('editor');
  const salvarBtn = document.getElementById('salvarBtn');

  let blocos = {}; // { "Nome do bloco": "Texto do bloco" }
  let blocoAtual = null;

  function carregarBlocos() {
    const dados = JSON.parse(localStorage.getItem('blocos_' + nomeEstrela)) || {};
    blocos = dados;
    atualizarLista();
  }

  function salvarBlocos() {
    localStorage.setItem('blocos_' + nomeEstrela, JSON.stringify(blocos));
  }

  function atualizarLista() {
  listaBlocos.innerHTML = '';

  for (let nome in blocos) {
    const li = document.createElement('li');
    li.textContent = nome;

    li.addEventListener('click', function () {
      abrirBloco(nome);
      const ativos = listaBlocos.querySelectorAll('.active');
      ativos.forEach(el => el.classList.remove('active'));
      li.classList.add('active');
    });

    listaBlocos.appendChild(li);
  }
}


  function criarNovoBloco() {
    const novoNome = prompt('Nome do novo bloco de notas:');
    if (novoNome && !blocos[novoNome]) {
      blocos[novoNome] = '';
      salvarBlocos();
      atualizarLista();
    } else if (blocos[novoNome]) {
      alert('Já existe um bloco com esse nome.');
    }
  }

  function abrirBloco(nome) {
  const url = `bloco.html?estrela=${encodeURIComponent(nomeEstrela)}&bloco=${encodeURIComponent(nome)}`;
  window.open(url, '_blank');
}


  function salvarBloco() {
    if (blocoAtual) {
      blocos[blocoAtual] = editor.value;
      salvarBlocos();
      alert('Bloco salvo!');
    }
  }

  carregarBlocos();
