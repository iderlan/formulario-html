document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validação do CPF
    let cpf = document.getElementById('cpf').value;
    if (!validarCPF(cpf)) {
        alert('CPF inválido');
        return;
    }

    // Validação do Email
    let email = document.getElementById('email').value;
    if (!validarEmail(email)) {
        alert('Email inválido');
        return;
    }

    alert('Cadastro realizado com sucesso!');
    // Aqui pode ser adicionado mais tarde o código para enviar os dados para o servidor
});

function validarCPF(cpf) {
    // Adicione a validação do CPF aqui
    // Esta é uma implementação simples, você pode melhorar a lógica de validação
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf.length !== 11) return false;

    let soma = 0;
    for(let i=0; i<9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if(resto === 10 || resto === 11) resto = 0;
    if(resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for(let i=0; i<10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if(resto === 10 || resto === 11) resto = 0;
    if(resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}

function validarEmail(email) {
    // Simples regex para validar email
    let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}
