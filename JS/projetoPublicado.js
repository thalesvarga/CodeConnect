

//-----------------projeto publicado e suas informacoes-------------------


function carregarDadosProjetosPublicado() {
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    const projetoSelecionado = JSON.parse(localStorage.getItem('projetoSelecionado'));
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const loginCriadorProjeto = projetoSelecionado.loginCriadorProjeto || 'Desconhecido';
    const usuarioCriador = cadastros.find(user => user.login === projetoSelecionado.loginCriadorProjeto);


    if (projetoSelecionado) {
            console.log('Projeto selecionado', projetoSelecionado);

        
          const containerCard = document.querySelector('.container-card-publicado'); // Selecionando o contêiner do card
            containerCard.classList.add('container-publicado-card')

        // Exibe as informações do projeto
        document.querySelector('.titulo-projeto-publicado').textContent = projetoSelecionado.nomeDoProjeto;
        document.querySelector('.texto-projeto-publicado').textContent = projetoSelecionado.descricaoDoProjeto;
        document.querySelector('.imagem-principal-publicado').src = projetoSelecionado.imagemSrc;
        const imgCriador = document.querySelector('.img-perfil-login')
        if(usuarioCriador && usuarioCriador.imagem){
            imgCriador.src = usuarioCriador.imagem;
        }else{
            imgCriador.src = 'img/imagem-padrao.png'
        }
        
    document.querySelector('.login-criador-publicado').textContent = "@"+ loginCriadorProjeto ;




//-----------------Descrição da área do Código------------------

        if (usuarioLogado && loginCriadorProjeto) {
            const podeEditar = String(usuarioLogado).trim() === String(loginCriadorProjeto).trim();
            console.log("Usuário logado é o criador?", podeEditar);

            const textArea = document.querySelector('.card-codigo');
           
                // Permitir edição
                textArea.contentEditable = podeEditar
               if(podeEditar) textArea.focus();
        } else {
            console.error("Erro: Nenhum usuário logado encontrado ou login está ausente.");
        }
    } else {
        console.error("Erro: Nenhum projeto selecionado encontrado.");
    }
 

}


window.onload = carregarDadosProjetosPublicado;





//------------------------Comentários----------------------------




document.addEventListener("DOMContentLoaded", () => {
    const containerComentarios = document.querySelector(".container-comentarios");
    const barraMensagens = document.querySelector("#barra-mensagens");

        // Recuperar informações do projeto selecionado e do usuário logado
    const projetoSelecionado = JSON.parse(localStorage.getItem("projetoSelecionado"));
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    const idProjeto = projetoSelecionado?.Id;

    const usuario = cadastros.find(user => user.login === usuarioLogado);


    
    if(!usuario){
        console.error('Usuario logado não encontrado no array de cadastros!')
    
    }else{
        console.log('usuario logado:', usuario)
    }

    


    // Carregar comentários do localStorage ou iniciar com array vazio
const comentariosPorProjeto = JSON.parse(localStorage.getItem("comentariosPorProjeto")) || {};
const comentarios = comentariosPorProjeto[idProjeto] || []; // Carrega comentários do projeto específico


    // Função para salvar comentários no localStorage
function salvarComentarios() {
    const comentariosPorProjeto = JSON.parse(localStorage.getItem("comentariosPorProjeto")) || {};
    comentariosPorProjeto[idProjeto] = comentarios; // Armazena os comentários de acordo com o projeto
    localStorage.setItem("comentariosPorProjeto", JSON.stringify(comentariosPorProjeto));
}

    // Função para criar a estrutura de um comentário principal
    function criarCardComentario(comentario) {
        const card = document.createElement("div");
        card.className = "card-comentario";
        card.classList.add('card-comentarios');

        const estrutura = `
            <div class="estrutura-comentario">
                <img src="${comentario.imagem}" alt="Perfil" class="foto-perfil">
                <h4 class="nome-usuario">@${comentario.usuario}</h4>
                <p class="comentario">${comentario.mensagem}</p>
            </div>
       
            <button class="responder-btn">Responder</button>
            <button class="toggle-respostas-btn">Ver Respostas</button>
            <div class="respostas" style="display: none;"></div> 
            `;
            

        card.innerHTML = estrutura;

        // Botão para responder ao comentário
        const responderBtn = card.querySelector(".responder-btn");
        responderBtn.addEventListener("click", () => {
            const resposta = prompt("Digite sua resposta:");
            if (resposta) {
                adicionarResposta(comentario, { usuario: `${usuarioLogado}`, mensagem: resposta });
                renderizarComentarios(); // Atualiza os comentários após adicionar a resposta
                salvarComentarios(); // Salva os comentários atualizados
            }
        });

        // Botão para alternar exibição de respostas
        const toggleRespostasBtn = card.querySelector(".toggle-respostas-btn");
        const respostasContainer = card.querySelector(".respostas");
        toggleRespostasBtn.addEventListener("click", () => {
            const isVisible = respostasContainer.style.display === "block";
            respostasContainer.style.display = isVisible ? "none" : "block";
            toggleRespostasBtn.textContent = isVisible ? "Ver Respostas" : "Ocultar Respostas";
        });

        // Renderiza as respostas, se houver
        (comentario.respostas || []).forEach(resposta => { // Verifica se respostas existe e é um array
            const respostaCard = document.createElement("div");
            respostaCard.className = "estrutura-comentario resposta";
            respostaCard.innerHTML = `
                <img src=${comentario.imagem} alt="Perfil" class="foto-perfil">
                <h4 class="nome-usuario">@${resposta.usuario}</h4>
                <p class="comentario">${resposta.mensagem}</p>

            `;
            respostasContainer.appendChild(respostaCard);
        });

        return card;
    }

   
    // Adiciona um novo comentário principal
function adicionarComentario(comentario) {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    const usuario = cadastros.find(user => user.login === usuarioLogado);
    
    if(!usuario){
        console.error('Usuario logado não encontrado!')
        return;
    }

    // adicionar a imagem ao usuario, respostas e comentarios
    comentarios.push({...comentario, respostas: [], imagem: usuario.imagem || "img/imagem-padrao.png" });
    salvarComentarios(); // Salva os comentários no localStorage
    // Atualize o armazenamento de comentários por projeto
    const comentariosPorProjeto = JSON.parse(localStorage.getItem("comentariosPorProjeto")) || {};
    comentariosPorProjeto[idProjeto] = comentarios; // Atualiza os comentários do projeto atual
    localStorage.setItem("comentariosPorProjeto", JSON.stringify(comentariosPorProjeto));
}

    // Adiciona uma resposta a um comentário específico
    function adicionarResposta(comentario, resposta,) {
        if (!comentario.respostas) {
            comentario.respostas = []; // Garante que respostas exista como array
        }
        comentario.respostas.push(resposta); // Adiciona a resposta ao array de respostas do comentário
    }

    // Renderiza todos os comentários
    function renderizarComentarios() {
        // Limpa apenas os cards de comentários (mantém a barra de mensagens intacta)
        containerComentarios.querySelectorAll(".card-comentario").forEach(card => card.remove());

        comentarios.forEach(comentario => {
            const card = criarCardComentario(comentario);
            containerComentarios.appendChild(card);
        });
    }

    // Evento para adicionar um novo comentário ao pressionar Enter
    barraMensagens.addEventListener("keydown", (event) => {
        if (event.key === "Enter") { // Verifica se a tecla pressionada é Enter
            event.preventDefault(); // Impede a quebra de linha no input
            const mensagem = barraMensagens.value.trim();
            if (mensagem) {
                adicionarComentario({ usuario: usuarioLogado, mensagem });
                barraMensagens.value = ""; // Limpa a barra de mensagens
                renderizarComentarios(); // Atualiza a interface
            }
        }
    });

    // Renderiza os comentários na primeira carga
    renderizarComentarios();

});
