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

    // Validação do Telefone
    let telefone = document.getElementById('telefone').value;
    if (!validarTelefone(telefone)) {
        alert('Telefone inválido');
        return;
    }

    let dataNascimento = document.getElementById('dataNascimento').value;
    if (!validarIdade(dataNascimento)) {
        alert('Idade inválida. Usuário deve ter entre 5 e 120 anos.');
        return;
    }

    // Validação das Senhas
    let senha = document.getElementById('senha').value;
    let confirmarSenha = document.getElementById('confirmarSenha').value;
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem');
        return;
    }

    if (!validarSenha(senha)) {
        alert('A senha deve conter pelo menos um caractere maiúsculo, um caractere minúsculo, um número, um caractere especial e ter mais de 6 caracteres.');
        return;
    }

    alert('Cadastro realizado com sucesso!');
    // Aqui pode ser adicionado mais tarde o código para enviar os dados para o servidor
});

function validarCPF(cpf) {
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
    let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

function validarTelefone(telefone) {
    let re = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
    return re.test(telefone);
}

function validarIdade(dataNascimento) {
    let hoje = new Date();
    let nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    let mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade >= 5 && idade <= 120;
}

function validarSenha(senha) {
    // Pelo menos um caractere maiúsculo, um caractere minúsculo, um número, um caractere especial e mais de 6 caracteres
    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    return re.test(senha);
}