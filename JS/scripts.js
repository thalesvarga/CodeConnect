// import {carregarCards} from "./feed.js";


    const btnUpload = document.getElementById('upload-btn');
    const inputUpload = document.getElementById(('image-upload'));

    btnUpload.addEventListener('click', () =>{
        inputUpload.click();
    });

    function lerConteudoDoArquivo(arquivo){
        return new Promise ((resolve,reject) => {
            const leitor = new FileReader();
            leitor.onload = () =>{
            resolve({url:leitor.result, nome:arquivo.name})
        }
        leitor.onerror =() =>{
        reject(`Erro na leitura do arquivo! ${arquivo.name}`)
        }
        leitor.readAsDataURL(arquivo)
        })
    }

    const imagemPrincipal = document.querySelector('.main-imagem');
    const nomeDaImagem = document.querySelector('.container-imagem-nome p');

    inputUpload.addEventListener('change', async (evento) =>{
        const arquivoImgPrincipal = evento.target.files[0];

        if(arquivoImgPrincipal){
            try{
                const conteudoDoArquivo = await lerConteudoDoArquivo(arquivoImgPrincipal);
                imagemPrincipal.src = conteudoDoArquivo.url;
                nomeDaImagem.textContent = conteudoDoArquivo.nome

            } catch (erro) {
                console.error('Erro na leitura do arquivo.')
            }
        }
    })

    const inputTags = document.getElementById("input-tags");
    const listaTags = document.getElementById("lista-tags");

    listaTags.addEventListener('click',(evento) => {
        if(evento.target.classList.contains('remove-tag')){
            const tagQueQueremosRemover = evento.target.parentElement;
            listaTags.removeChild(tagQueQueremosRemover);
        };
    })


   export async function verificaTagsDisponiveis(tagTexto){
        return new Promise((resolve) => {
            setTimeout (() =>{
                resolve(tagsDisponiveis.includes(tagTexto));
            })
        }, 1000)
    }

    const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"]

    inputTags.addEventListener('keypress',async (evento) =>{
        if (evento.key === "Enter"){
            evento.preventDefault();
            const tagTexto = inputTags.value.trim();
            if (tagTexto !== "") {
                try {
                    const tagExiste = await verificaTagsDisponiveis(tagTexto);
                        if(tagExiste){
                            const tagNova = document.createElement("li");
                            tagNova.innerHTML =`<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                            listaTags.appendChild(tagNova);
                            inputTags.value = "";
                        }else{
                            alert("Tag não foi encontrada!")
                        }    
                    }catch(error){
                            console.error("Erro ao verificar as tags disponiveis!")
                            alert('Tag não disponivel!')    
                }
            }
        }
    })

    const btnPublicar = document.querySelector('.botao-publicar');

    async function publicarProjeto (nomeDoProjeto,descricaoDoProjeto,tagsDoProjeto,imagemPrincipal){
        return new Promise((resolve, reject) => {
            setTimeout(() =>{
            const deuCerto = true
                if(deuCerto){
                    resolve('Projeto publicado com sucesso.')

                }else{
                    reject('Erro ao publicar projeto')
                }
                }, 2000)
            })
        };

    btnPublicar.addEventListener('click', (evento) => {
                evento.preventDefault()
                
                // let tagsSelecionada = []

                // if(tagsSelecionada.length === 0){
                //     alert('Por favor seleciona uma tag antes de publicar o projeto')
                //     return;
                // }else{
                
                const nomeDoProjeto = document.getElementById('nome').value;
                const descricaoDoProjeto = document.getElementById('descricao').value;
                const tags = Array.from(listaTags.querySelectorAll('p')).map((tag) => tag.textContent);
                const imagemSrc = document.querySelector(".main-imagem").src; 
               
                


                const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
                let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

                const Id = `card-${Date.now()}`;
                
                // const projetoExistente = projetos.some(card => card.nomeDoProjeto === nomeDoProjeto)
                
            const novoProjeto = {
                    Id,
                    nomeDoProjeto,
                    descricaoDoProjeto,
                    tags,
                    imagemSrc,
                    loginCriadorProjeto: usuarioLogado
                };

                let projetos = JSON.parse(localStorage.getItem('projetos')) || [];
                projetos.push(novoProjeto);
                localStorage.setItem('projetos', JSON.stringify(projetos));
                console.log('estrutura do projeto salvo',novoProjeto)

                // encontra o indice do usuario logado nos cadastros
                const usuarioIndex = cadastros.findIndex(user=> user.login === usuarioLogado);
                if(usuarioIndex !== -1){
                    if(!cadastros[usuarioIndex].projetos){
                        cadastros[usuarioIndex].projetos = []
                }
                cadastros[usuarioIndex].projetos.push(Id);
                console.log(Id ,"localizado!")
                localStorage.setItem('cadastros', JSON.stringify(cadastros));
                location.href = "feed.html"
                } else {
                    alert("Um projeto com esse nome já existe! Tente um nome diferente."); // Alerta de duplicata
                
            }
        });


    const botaoDescartar = document.querySelector(".botao-descartar");

    botaoDescartar.addEventListener("click", (evento) => {
        evento.preventDefault();

        const formulario = document.querySelector("form");
        formulario.reset();

        imagemPrincipal.src = "./img/imagem1.png";
        nomeDaImagem.textContent = "image_projeto.png";

        listaTags.innerHTML = "";
    })


