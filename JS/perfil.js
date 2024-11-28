
// ---------imagem do perfil----------


// Carregar dados do localStorage
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
const usuarioAtual = cadastros.find(user => user.login === usuarioLogado);

// Selecionar elementos do DOM
const imgPerfil = document.getElementById("img-perfil");
const perfilDescricao = document.getElementById("descricaoPerfil");
const imageUpload = document.getElementById("image-upload");

// Verificar se há um usuário logado
if (usuarioAtual) {
    // Atualizar informações do perfil
    document.getElementById("nome").innerText = usuarioAtual.nome;
    document.getElementById("username").innerText = "@" + usuarioAtual.login;

    // Carregar imagem do perfil (escolhida pelo usuário) ou exibir a padrão
    if (usuarioAtual.imagem) {
        imgPerfil.innerHTML = `
            <img src="${usuarioAtual.imagem}" alt="Imagem do Perfil ${usuarioAtual.nome}" class="imagem-perfil">
        `;
    } else {
        imgPerfil.innerHTML = `
            <img src="imagem-padrao.png" alt="Imagem padrão" class="imagem-perfil">
        `;
    }

    // Atualizar descrição do perfil
    perfilDescricao.textContent = usuarioAtual.descricao || "";

    // Salvar nova descrição ao alterar o texto
    perfilDescricao.addEventListener("input", () => {
        usuarioAtual.descricao = perfilDescricao.textContent;
        const usuarioIndex = cadastros.findIndex(user => user.login === usuarioLogado);
        cadastros[usuarioIndex] = usuarioAtual;
        localStorage.setItem("cadastros", JSON.stringify(cadastros));
    });




    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    const usuarioCriador = cadastros.find(user => user.projetos && user.projetos.includes(projetos.Id));

    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];


    document.querySelector('.titulo-projeto').textContent = projetos.nomeDoProjeto;
    document.querySelector('.texto-projeto-publicado').textContent = projetos.descricaoDoProjeto;
    document.querySelector('.imagem-principal-publicado').src = projetoSelecionado.imagemSrc;











} else {
    // Exibir informações padrão se o usuário não estiver logado
    imgPerfil.innerHTML = `
        <img src="imagem-padrao.png" alt="Imagem padrão" class="imagem-perfil">
    `;
    document.getElementById("nome").innerText = "Visitante";
    document.getElementById("username").innerText = "@visitante";
}

// Abrir seletor de arquivos ao clicar na imagem
imgPerfil.addEventListener("click", (evento) => {
    evento.preventDefault(); // Previne qualquer comportamento padrão
    imageUpload.click(); // Simula o clique no input de upload de arquivo
});

// Evento para alterar a imagem do perfil
imageUpload.addEventListener("change", function (evento) {
    const arquivoImgPerfil = evento.target.files[0];
    if (arquivoImgPerfil) {
        const leitor = new FileReader();
        leitor.onload = function (img) {
            // Atualizar imagem no DOM
            const elementoImg = document.createElement("img");
            elementoImg.classList.add("imagem-perfil");
            elementoImg.src = img.target.result;
            elementoImg.alt = "Imagem do Perfil " + (usuarioAtual ? usuarioAtual.nome : "Visitante");

            // Atualizar localStorage se houver usuário logado
            if (usuarioAtual) {
                const usuarioIndex = cadastros.findIndex(user => user.login === usuarioLogado);
                cadastros[usuarioIndex].imagem = img.target.result; // Salva a nova imagem no cadastro
                localStorage.setItem("cadastros", JSON.stringify(cadastros));
            }

            // Atualizar exibição no DOM
            imgPerfil.innerHTML = "";
            imgPerfil.appendChild(elementoImg);
        };

        leitor.readAsDataURL(arquivoImgPerfil); // Converte a imagem para Base64
    }
});

// Função de logout
function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html"; // Redireciona para a página de login
};


//---------- 