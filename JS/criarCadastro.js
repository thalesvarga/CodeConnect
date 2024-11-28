

function cadastrar () {
    const loginUsuario = document.getElementById('login').value;
    const senha = document.getElementById ('senha').value;
    const dicaSenha = document.getElementById('dica-senha').value;
    const nomeCompleto = document.getElementById('nomeCompleto').value;


    if(loginUsuario !== "" && senha !== "" ) {
       
        let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
        const usuarioExistente = cadastros.find(user => user.login === loginUsuario);
        const novoCadastros = {
            nome: nomeCompleto,
            login: loginUsuario,
            senha: senha,
            dicaSenha: dicaSenha
          };


        if (!usuarioExistente) {
            cadastros.push(novoCadastros);
            localStorage.setItem('cadastros', JSON.stringify(cadastros));
            localStorage.setItem('usuarioLogado', JSON.stringify(loginUsuario));
            alert('Cadastro com Sucesso');
            location.href = "perfil.html";
        } else {
            alert('Usuário já existente, tente novamente!');        
}
        
    }
   
};

const submitCadastrar = document.getElementById('cadastrar');

submitCadastrar.addEventListener('click', (evento) =>{
    evento.preventDefault();
    cadastrar();

});


