
const submitLogin = document.getElementById('loginSubmit');

let usuarioEncontrado = null;
const cadastros = JSON.parse(localStorage.getItem('cadastros')) || []

function logar(){
    const loginUsuario = document.getElementById('login').value;
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const lembrarDeMim = document.getElementById('lembrarSenha');

// inicia com 0 valor, depois verifica o tamanho dos cadastros, e assim vai aumentando a cada analise do loop.
for (let iLoginCadastrados = 0; iLoginCadastrados < cadastros.length; iLoginCadastrados++){
    
    // Dentro do loop, você verifica se o login e a senha do usuário atual (cadastros[iLoginCadastrados]) correspondem aos valores fornecidos pelo usuário. Se ambos forem iguais, o usuário foi encontrado.
    if(cadastros[iLoginCadastrados].login === login && cadastros[iLoginCadastrados].senha === senha){
        usuarioEncontrado = true; // se for encontrado
        break;
    }
}

if (usuarioEncontrado){
    localStorage.setItem('usuarioLogado', JSON.stringify(loginUsuario));
    location.href = "perfil.html";
   
} else {
    alert('Login ou senha inválidos!');
  }
}

const esqueciSenha = document.querySelector('.esqueci-senha');

esqueciSenha.addEventListener('click', (evento) => {
    evento.preventDefault();

    const login = document.getElementById('login').value;

  for (let iLoginCadastrados = 0; iLoginCadastrados < cadastros.length; iLoginCadastrados++) {
    if (cadastros[iLoginCadastrados].login === login) {
      usuarioEncontrado = cadastros[iLoginCadastrados];
      break;
    }
  }

    if (usuarioEncontrado){
        const dicaSenha = usuarioEncontrado.dicaSenha
        
        if(dicaSenha){
            alert (`A dica da sua senha é: ${dicaSenha}`)
        } else {
         alert('Não há uma dica de senha registrada para este login.')
        }
        }else {
            alert('Login não encontrado.');
        }
});  

submitLogin.addEventListener('click',(evento) => {
    evento.preventDefault();
    logar();

});




