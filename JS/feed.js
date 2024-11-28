
const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript","Back-end"]  
const inputTags = document.getElementById("search-projeto");
const listaTags = document.getElementById("lista-tags");
const listaSugestoes = document.getElementById('listaSugestoes'); // lista das tags sugeridas na barra

let tagsSelecionada = [] // mantem uma lista de tags que ja foram selecionadas  


function atualizarSugestoes () {
    listaSugestoes.innerHTML = ''; // Limpa a lista antes de adicionar as sugestões
    const texto = inputTags.value.toLowerCase();


const tagsVisiveis = tagsDisponiveis.filter(tag =>!tagsSelecionada.includes(tag) && tag.toLocaleLowerCase().startsWith(texto)).sort();

tagsVisiveis.forEach(sugestao => {
    const itemSugestao = document.createElement('li');
    itemSugestao.textContent = sugestao;

    itemSugestao.addEventListener('click', () =>{
        console.log(`sugestao "${sugestao}"clicado`)
        adicionarTag(sugestao);
        filtrarProjetos();
      
});

listaSugestoes.appendChild(itemSugestao);

});

listaSugestoes.style.display = tagsVisiveis.length ? 'flex' : 'none' ; //Exibe a lista apenas se houver sugestoes
};




// Exibe as sugestoes ao focar no input
inputTags.addEventListener('focus', atualizarSugestoes);


console.log('pesquisa focada - lista de sugestoes exibida');
 
// Exibe as sugestoes conforme o usuario digita
inputTags.addEventListener('input', atualizarSugestoes); 
    console.log('input focado - lista de sugestoes exibida');






function adicionarTag(tagTexto) {
    console.log('funcao adicionarTag chamada com:',tagTexto)
    
    const tagNova = document.createElement("li");
    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
    listaTags.appendChild(tagNova);
   
    tagsSelecionada.push(tagTexto) // adiciona a tag a lista de tags selecionada
    inputTags.value = "";
    listaSugestoes.style.display = 'none'; // Oculta a lista após adicionar
    filtrarProjetos()
};





// Oculta a lista quando o input perde o foco
inputTags.addEventListener('blur', () => {
    setTimeout(() =>{
        listaSugestoes.style.display = 'none';
        console.log('input perdeu foco - lista de sugestoes escondidas')
},200) // garante que o tempo de registro do clique seja registrado

});






function filtrarProjetos () {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    cardContainer.innerHTML = ""

    console.log('tags selecionadas para filtragem', tagsSelecionada)



    const projetosFiltrados = tagsSelecionada.length === 0 ? projetos : projetos.filter(projeto => 
        tagsSelecionada.some(tag => projeto.tags.includes(tag))
    )
 
    console.log("Projetos filtrados:", projetosFiltrados);

    projetosFiltrados.forEach(projeto =>{
        // Busca os dados do criador do projeto
        const usuarioCriador = cadastros.find(user => user.projetos && user.projetos.includes(projeto.Id));
        const loginCriadorProjeto = usuarioCriador ? usuarioCriador.login : 'Desconhecido'
        const imagemCriadorProjeto = usuarioCriador ?.imagem || 'imagem-padrao.png'

        const card = criarCard(projeto.nomeDoProjeto, projeto.descricaoDoProjeto, projeto.imagemSrc,loginCriadorProjeto,imagemCriadorProjeto);
     

    card.addEventListener('click',(evento) =>{
        evento.stopPropagation()
        localStorage.setItem('projetoSelecionado',JSON.stringify(projeto));
        console.log('projeto selecionado salvo:',projeto)
        location.href = "projetoPublicado.html" 
    });

    cardContainer.appendChild(card); 
    
    });

    if(projetosFiltrados.length === 0){
        console.log('nenhum projeto corresponde as tags selecionadas')
    }
};







listaTags.addEventListener('click',(evento) => {
    if(evento.target.classList.contains('remove-tag')){
        const tagQueQueremosRemover = evento.target.parentElement;
        const tagTexto = tagQueQueremosRemover.querySelector('p').textContent;
        listaTags.removeChild(tagQueQueremosRemover);

        //remove a tag das tags selecionadas
        tagsSelecionada = tagsSelecionada.filter(tag => tag !== tagTexto);   
        atualizarSugestoes() // atualiza a lista de sugestoes
        filtrarProjetos()
        listaSugestoes.style.display = 'none'; 

    };

});




// Adiciona a tag ao pressionar Enter
inputTags.addEventListener('keypress', async (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();

    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      try {
        const tagExiste = await verificaTagsDisponiveis(tagTexto);
        if (tagExiste) {
         adicionarTag(tagTexto)
         
        } else {
          alert("Tag não foi encontrada!");
        }
      } catch (error) {
        console.error("Erro ao verificar as tags disponíveis!");
        alert('Tag não disponível!');
      }
    }
  }
});




async function verificaTagsDisponiveis(tagTexto){
    return new Promise((resolve) => {
        setTimeout (() =>{
            resolve(tagsDisponiveis.includes(tagTexto));
        })
    }, 1000)
}
    




const btnLimparTudo = document.querySelector('.limpar-botao');

btnLimparTudo.addEventListener('click', ()=>{
    tagsSelecionada = []
   listaTags.innerHTML = ""
   atualizarSugestoes();
    filtrarProjetos()
})
    




const cardContainer = document.querySelector('.container-card');
let cardsCarregados = false; 


document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded executado!"); 
    if (window.location.pathname.endsWith('feed.html')) {        
        if (!cardsCarregados) { // Verifica se os cards já foram carregados
            cardsCarregados = true;
            
            const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
            const projetos = JSON.parse(localStorage.getItem('projetos')) || [];

            // Verifique se o card já existe
        console.log("Dados carregados do localstorage",projetos);
          // encontrar o criador do projeto
            projetos.forEach(projeto =>{
                const usuarioCriador = cadastros.find(user => user.projetos && user.projetos.includes(projeto.Id));
                const loginCriadorProjeto = usuarioCriador ? usuarioCriador.login : 'Desconhecido'
                const imagemCriadorProjeto = usuarioCriador ?.imagem || 'imagem-padrao.png'
                
                const card = criarCard(projeto.nomeDoProjeto, projeto.descricaoDoProjeto, projeto.imagemSrc,loginCriadorProjeto,imagemCriadorProjeto);
                cardContainer.appendChild(card)
               
                card.addEventListener('click',(evento) =>{
                    evento.stopPropagation()
                    localStorage.setItem('projetoSelecionado',JSON.stringify(projeto));
                    console.log('projeto selecionado salvo:',projeto)
                    location.href = "projetoPublicado.html" 
                                  
                 });
            });
        }
     }
    });  


function salvarProjetoEIrParaPagina(projeto){
    localStorage.setItem('projetoSelecionado',JSON.stringify(projeto));
    console.log('projeto selecionado salvo:',projeto)
    location.href = "projetoPublicado.html" 
}


export function criarCard (nomeDoProjeto,descricaoDoProjeto,imagemSrc, loginCriadorProjeto, imagemCriadorProjeto){
        
        const cardContainer = document.createElement ('div');
        cardContainer.classList.add('container-card'); 

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-projetos');

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('imagem-projeto');

        const imgProjeto = document.createElement('img');
        imgProjeto.src = imagemSrc;
        imgProjeto.alt = "Pré-visualização do projeto"
        imgProjeto.classList.add('imagem-principal')

        imgDiv.appendChild(imgProjeto);
        cardDiv.appendChild(imgDiv);

        const descricaoProjContainer = document.createElement('div');
        descricaoProjContainer.classList.add('descricao-projeto');

        const tituloProjDescricao = document.createElement('h2');
        tituloProjDescricao.textContent = nomeDoProjeto;
        tituloProjDescricao.classList.add("titulo-projeto");

        const textoProjeto = document.createElement('p');
        textoProjeto.textContent = descricaoDoProjeto ;
        textoProjeto.classList.add('texto-projeto');


        descricaoProjContainer.appendChild(tituloProjDescricao);
        descricaoProjContainer.appendChild(textoProjeto);
        cardDiv.appendChild(descricaoProjContainer);

        const iconeDivContainer = document.createElement('div');
        iconeDivContainer.classList.add('icones-projetos');
        
       const projeto = {nomeDoProjeto,descricaoDoProjeto,imagemSrc, loginCriadorProjeto, imagemCriadorProjeto} // criacao do objeto do projeto

       
        const iconeDivCodigo = document.createElement('div');
        iconeDivCodigo.addEventListener('click', (evento) => {
            evento.preventDefault()
            evento.stopPropagation()
            salvarProjetoEIrParaPagina(projeto)
        })
        const iconeImgCodigo = document.createElement('img');
        iconeImgCodigo.src = "./img/code.png"
        iconeImgCodigo.alt = "Código"
    
        iconeDivCodigo.appendChild(iconeImgCodigo);
 
    
        const pContagemCodigo = document.createElement('p');
        pContagemCodigo.textContent = ""
        pContagemCodigo.classList.add("icone-contagem");

        iconeDivCodigo.appendChild(pContagemCodigo)

       
        const iconeDivCompartilhar =document.createElement('div');
       iconeDivCompartilhar.addEventListener('click', (evento) => {
            evento.preventDefault()
            evento.stopPropagation()
            salvarProjetoEIrParaPagina(projeto)

        });

        const iconeImgCompartilhar = document.createElement('img');
        iconeImgCompartilhar.src = "./img/share.png";
        iconeImgCompartilhar.alt = "Compartilhar";
        const pContagemCompartilhar = document.createElement('p');
        pContagemCompartilhar.textContent = "";
        pContagemCompartilhar.classList.add("icone-contagem");

        iconeDivCompartilhar.appendChild(iconeImgCompartilhar);
        iconeDivCompartilhar.appendChild(pContagemCompartilhar);
    

     
        const iconeDivChat = document.createElement('div');
        iconeDivChat.addEventListener('click', (evento) => {
            evento.preventDefault()
            evento.stopPropagation()
            salvarProjetoEIrParaPagina(projeto)
        })

        const iconeImgChat = document.createElement('img');
        iconeImgChat.src = "./img/chat.png"
        iconeImgChat.alt = "Comentar"
        const pContagemChat = document.createElement('p');
        pContagemChat.textContent = "";
        pContagemChat.classList.add("icone-contagem");

        iconeDivChat.appendChild(iconeImgChat);
       
        iconeDivChat.appendChild(pContagemChat);
        

        const iconeDivPerfil = document.createElement('div');
        iconeDivPerfil.classList.add("icone-perfil");
        iconeDivPerfil.addEventListener('click', (evento) => {
            evento.preventDefault()
            evento.stopPropagation()
            location.href ="perfil.html"
        });

        const iconeImgPerfil = document.createElement('img')
        iconeImgPerfil.src = imagemCriadorProjeto
        iconeImgPerfil.alt = "Perfil" 
        const pUsuario = document.createElement('p');
        pUsuario.innerText = "@" + loginCriadorProjeto
        pUsuario.classList.add('icone-perfil-paragrafo')


        iconeDivPerfil.appendChild(iconeImgPerfil)
        iconeDivPerfil.appendChild(pUsuario)
        

        iconeDivContainer.appendChild(iconeDivCodigo);
        iconeDivContainer.appendChild(iconeDivCompartilhar);
        iconeDivContainer.appendChild(iconeDivChat);
       
        cardDiv.appendChild(iconeDivPerfil);
        
        cardDiv.appendChild(iconeDivContainer);
        
        cardContainer.appendChild(cardDiv);
    

        return cardDiv
    };   


    



