let estrelas = [];

function salvarEstrelas() {
    localStorage.setItem('estrelas', JSON.stringify(estrelas));
}

function carregarEstrelas() {
    const estrelasSalvas = JSON.parse(localStorage.getItem('estrelas')) || [];
    estrelas = estrelasSalvas; // <<< Adicionar esta linha para carregar no array também

    estrelasSalvas.forEach(dados => {
        criarEstrelaNaTela(dados.nome, dados.x, dados.y);
    });
}


function criarEstrela() {
    const nome = prompt("Digite o nome da estrela:");
    if (!nome) return;

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    estrelas.push({ nome, x, y });
    salvarEstrelas();
    criarEstrelaNaTela(nome, x, y);
}

function criarEstrelaNaTela(nome, x, y) {
    const estrela = document.createElement('div');
    estrela.classList.add('estrela');
    estrela.style.position = 'absolute';
    estrela.style.left = x + 'px';
    estrela.style.top = y + 'px';
    estrela.style.cursor = 'move';
    estrela.style.userSelect = 'none';

    // Cria o link da estrela
    const link = document.createElement('a');
    link.innerText = nome;
    link.href = `estrela.html?nome=${encodeURIComponent(nome)}`;
    link.target = "_blank";
    link.style.textDecoration = 'none';
    link.style.color = 'white';
    
    // Cria o botão de excluir
    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerText = '❌';
    botaoExcluir.style.marginLeft = '5px';
    botaoExcluir.style.cursor = 'pointer';
    botaoExcluir.style.background = 'transparent';
    botaoExcluir.style.border = 'none';
    botaoExcluir.style.color = 'red';
    botaoExcluir.style.fontWeight = 'bold';

    botaoExcluir.addEventListener('click', function(e) {
        e.stopPropagation(); // Impede de clicar no link
        e.preventDefault();
    
        const confirmar = confirm(`Tem certeza que deseja excluir a estrela "${nome}"?`);
        if (confirmar) {
            // Remove da tela
            estrela.remove();
    
            // Remove do array
            estrelas = estrelas.filter(est => est.nome !== nome);
            salvarEstrelas();
        }
    });
    

    estrela.appendChild(link);
    estrela.appendChild(botaoExcluir);
    document.body.appendChild(estrela);

    // Parte de arrastar (mesmo que já corrigimos antes)
    let isDragging = false;
    let arrastou = false;
    let offsetX = 0, offsetY = 0;

    estrela.addEventListener('mousedown', function(e) {
        if (e.target.tagName === 'BUTTON') return; // Não arrastar clicando no botão de excluir

        isDragging = true;
        arrastou = false;
        offsetX = e.clientX - estrela.offsetLeft;
        offsetY = e.clientY - estrela.offsetTop;
        e.preventDefault();

        function onMouseMove(e) {
            if (!isDragging) return;
            estrela.style.left = (e.clientX - offsetX) + 'px';
            estrela.style.top = (e.clientY - offsetY) + 'px';
            arrastou = true;
        }

        function onMouseUp() {
            if (isDragging) {
                isDragging = false;

                const index = estrelas.findIndex(est => est.nome === nome);
                if (index !== -1) {
                    estrelas[index].x = estrela.offsetLeft;
                    estrelas[index].y = estrela.offsetTop;
                    salvarEstrelas();
                }
            }

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    link.addEventListener('click', function(e) {
        if (arrastou) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
}



// Carregar as estrelas ao abrir a página
window.onload = carregarEstrelas;
