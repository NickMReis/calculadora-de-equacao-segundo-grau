/*
Funções de Login e Cadastro do Programa
*/
function realizarCadastro(){
    alert("\nCadastro!")
    var username = prompt("Digite o nome de usuário (em letras minúsculas): ");
    username = evitarStringVazia(username, "Preencha o dado Nome de Usuário corretamente. \nNome de usuário: ");
    username = username.toLowerCase();
    currentUser = username;
    var password = prompt("Digite a senha: ");
    password = evitarStringVazia(password, "Preencha o dado Senha corretamente. \nSenha:");
    password = verificaSenha(password)
    var busca = buscaUsuarioCadastro(username);
        
    if(busca == null){
        addUsuario(username, password);
        resultado = true;
        console.log("Cadastro realizado com sucesso!");
        alert(`\nSeja muito bem-vindo, ${username}! \nSiga as instruções abaixo! \nO programa irá pedir para você definir os 3 coeficientes da equação do segundo grau. Ao final do processo te retornará todas as informações dessa equação! \nVocê poderá utilizar a calculadora novamente.`);
    } else{
        console.log("Esse nome de usuário já está sendo utilizado!\n");
        executarPrograma();
    }
}
    
function realizarLogin(){
    if(datas.length == 0){
        alert("\nNão há usuários cadastrados para fazer login!");
        executarPrograma();
    }else{
        alert("\nLogin!")
        var username = prompt("Digite o nome do usuário (em letras minúsculas): ");
        username = evitarStringVazia(username, "Preencha o dado Nome de Usuário corretamente. \nNome de usuário: ");
        username = username.toLowerCase();
        currentUser = username;
        var password = prompt("Digite a senha: ");
        password = evitarStringVazia(password, "Preencha o dado Senha corretamente. \nSenha:");
        password = verificaSenha(password);
            
        var busca = buscaUsuarioLogin(username, password);
            
        if(busca == null){
            alert("O usuário ou senha estão incorretos.\n");
            executarPrograma();
        } else{
            resultado = true;
            alert("Login realizado com sucesso.");
            alert(`\nBem-vindo de volta, ${username}! \nO programa irá pedir para você definir os 3 coeficientes da equação do segundo grau. Ao final do processo te retornará todas as informações dessa equação. \nVocê poderá utilizar a calculadora novamente.`);
        }
    }
}

function excluirUsuario(){
    var inicio = 0;
    var fim = datas.length - 1;
        
    while (inicio <= fim){
        var meio = Math.floor((inicio + fim) / 2);
            
        if(datas[meio].username == currentUser){
            datas.splice(meio, 1); // Remove o usuário encontrado
            break;
        } else if (datas[meio].username < currentUser){
            inicio = meio + 1;
        } else{
            fim = meio - 1;
        }
    }
}
    
function evitarStringVazia(string, texto){
    while (string == "" || string == null) {
        string = prompt(`${texto}`);
    }
    return string;
}
    
function verificaSenha(senha){
    var minimo_caracteres = 6;
    while(senha.length < minimo_caracteres){
        senha = prompt(`Quantidade de caracteres insuficiente (Minimo ${minimo_caracteres}). \nSenha: `);
    }
    return senha;
}
    
function buscaUsuarioCadastro(nome){
    var inicio = 0;
    var fim = datas.length - 1;
        
    while (inicio <= fim){
        var meio = Math.floor((inicio + fim) / 2);
            
        if(datas[meio].username == nome){
            return "Found";
        } else if (datas[meio].username < nome){
            inicio = meio + 1;
        } else{
            fim = meio - 1;
        }
    }
        
    return null; 
}
    
function buscaUsuarioLogin(nome, senha){
    var inicio = 0;
    var fim = datas.length - 1;
        
    while (inicio <= fim){
        var meio = Math.floor((inicio + fim) / 2);
            
        if(datas[meio].username == nome && datas[meio].password == senha){
            datas[meio].entries += 1;
            return "Found";
        } else if (datas[meio].username < nome){
            inicio = meio + 1;
        } else{
            fim = meio - 1;
        }
    }
        
    return null; 
}
    
function addUsuario(nome, senha){
    var novoUsuario = { username: nome, password: senha, entries: 1 };
    var inicio = 0;
    var fim = datas.length - 1;
        
    while (inicio <= fim){
        var meio = Math.floor((inicio + fim) / 2);
            
        if(datas[meio].username < nome){
            inicio = meio + 1;
        } else {
            fim = meio - 1;
        }
    }
    datas.splice(inicio, 0, novoUsuario);
}
    
function executarPrograma(){
    var execucao = prompt("Digite '1' para Login, '2' para Cadastro ou '0' para Sair do programa. \nDigite: ");
    
    while (execucao != 1 && execucao != 2 && execucao != 0){
        execucao = prompt("Erro! Apenas '1', '2' ou '0'! \nDigite '1' para Login, '2' para Cadastro ou '0' para Sair do programa! \nDigite: ");
    }
        
    if (execucao == "1"){
        realizarLogin();
    } else if (execucao == "2"){
        realizarCadastro();
    } else{
         console.table(datas); //Utilizar isso, caso queira ver todos os usuários cadastrados no final do programa
        alert("Programa Finalizado!");
        resultado = "finalizado";
    }
}



/*
Funções do app da calculadora
*/
function addValores(){
    var valor;
    alert("\nCalculadora!")        
    for (i = 1; i <= 3; i++){
        valor = prompt(`Digite o valor de ${String.fromCharCode(i + 'A'.charCodeAt(0) - 1)} na equação do segundo grau: `);
        while (i == 1 && valor == 0){
            valor = prompt(`O Valor de A não pode ser 0! \nDigite o valor de ${String.fromCharCode(i + 'A'.charCodeAt(0) - 1)} na equação do segundo grau: `); 
        }
        valor = verificarEntrada(valor, `Digite o valor de ${String.fromCharCode(i + 'A'.charCodeAt(0) - 1)} na equação do segundo grau: `);
        equacao.push(valor);
    }
}
        
function verificarEntrada(numero, texto){
    while (numero == ""){
        if (numero != ""){
            break;   
        }
        numero = prompt(`\nPreencha o campo corretamente! \nDigite números inteiros! \n${texto}`)
    }
    while (numero % 1 != 0){
        if(numero % 1 == 0){
            break;
        }
                
        numero = prompt(`\nErro! Digite números inteiros! \n${texto}`);
    }
    return parseInt(numero);
}
        
function calcularDelta(){
    var a = equacao[0];
    var b = equacao[1];
    var c = equacao[2];
    var delta = b**2 - 4 * a * c;
            
    return delta;
}
        
function verificarDelta(){
    //verifica a quantidade de raizes
    if (delta > 0){
        return 2;
    } else if(delta == 0){
        return 1;
    } else{
        return 0;
    }
}
        
function calcularRaizes(){
    var raiz;
    var a = equacao[0];
    var b = equacao[1];
            
    if (quantRaizes == 0){
        raizes = `A equação não possui raízes reais!`;
    } else{
        for (i = 0; i < 2; i++){
            raiz = (i % 2 == 0 ) ? ((-b + Math.sqrt(delta)) / (2 * a)) : ((-b - Math.sqrt(delta)) / (2 * a));
            raizes.push(raiz);
        }
        raizes = raizes.filter((item, index) => raizes.indexOf(item) === index);
    }
}
        
function execucaoApp(){
    var execucao = prompt("\nDigite '1' para Utilizar a Calculadora, '0' para Sair da sua conta ou '-1' para Excluir a conta. \nDigite: ");
    
    while (execucao != 1 && execucao != 0 && execucao != -1){
        if (execucao != ""){
            alert("\nPreencha o campo corretamente!");
        }
        execucao = prompt("Erro! Apenas '1', '0' '-1'! \nDigite '1' para Utilizar a Calculadora, '0' para Sair da sua conta ou '-1' para Excluir a conta. \nDigite: ");
    }
            
    if(execucao == '0'){
        console.log("Você saiu de sua conta!\n");
        resultado = false;
    } else if (execucao == '1'){
        addValores();
        delta = calcularDelta();
        quantRaizes = verificarDelta()
        calcularRaizes();
                
        console.log("\nResultados da equação do segundo grau!");
        console.log(`A equação é ${equacao[0]}x² + ${equacao[1]}x + ${equacao[2]};`);
        console.log(`Os coeficientes a, b, c da equação são ${equacao};`);
        console.log(`O delta é igual a ${delta};`);
        console.log(`A quantidade de raízes da equação é ${quantRaizes};`);
        if(quantRaizes == 0){
             console.log(raizes);
        } else{
            var textoRaizes = (quantRaizes == 1) ? `A raíz da equação é ${raizes}.` : `As raízes da equação são ${raizes}.`;
            console.log(textoRaizes);
        }
    } else if (execucao = "-1"){
        console.log("Você excluiu sua conta!\n");
        excluirUsuario();
        currentUser = '';
        resultado = false;
    }
}



/*
Execução de tudo
*/
var resultado = false; //variavel para permitir (true) ou não (false) execução da calculadora

var datas = [
    {
        username: "kehkel",
        password: "Kel080652!",
        entries: 4
    },
    {
        username: "nickname",
        password: "40028922",
        entries: 9
    }
]; //variavel relacionada aos dados dos usuários

var currentUser; // variavel que possui como valor o nome do usuário que acabou de logar
    
datas.sort((a, b) => (a.username < b.username) ? -1 : (a.username > b.username) ? 1 : 0);

while(resultado == false){
    //Execução do cadastro e login
    alert("Bem vindo ao programa Calculadora de Equação do Segundo Grau! \nSe já tiver uma conta, faça o Login. \nCaso contrário, faça o Cadastro!");
    executarPrograma();
    
    while(resultado == true){
        //Execucção do app calculadora
        var equacao = [];
        var delta;
        var quantRaizes;
        var raizes = [];
        
        execucaoApp();
    }
}

