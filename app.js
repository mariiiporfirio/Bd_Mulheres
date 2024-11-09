// Importando o módulo Express para criar o servidor e gerenciar rotas
const express = require('express');

// Importando a conexão com o banco de dados do arquivo 'mulherconectada'
var conexao = require("./blogdepesquisa/mulherconectada");

const app = express(); // Cria uma aplicação Express
const path = require('path'); // Importa o módulo 'path' para lidar com diretórios de arquivos

app.use(express.static(path.join(__dirname, 'public')));

// Configura o diretório onde as views (templates) estão localizadas
app.set('views', path.join(__dirname, 'views'));
// Define EJS como o motor de visualização (view engine) para renderizar templates
app.set('view engine', 'ejs');


// Importando o body-parser para lidar com dados de formulários
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // Configura o body-parser para interpretar dados JSON

app.use(bodyParser.urlencoded({ extended: true })); // Configura o body-parser para interpretar dados de formulários enviados via URL

conexao.connect(function(error) {
    if (error) {
        throw error; // Lança um erro caso não consiga conectar
    }
    console.log(`Conexão com o banco de dados estabelecida`);
});

app.get('/', function(req, res){
        
    // Consulta no banco de dados
    var sql = "SELECT * FROM pesquisadores";
    conexao.query(sql, function(error, result){
        if (error) {
            throw error;
        }

        // Passa os dados para a view
        res.render("cadastroleitura", { pesquisadores: result });
    });
});

// Rota POST para receber os dados do formulário e inseri-los no banco de dados
app.post('/', function(req, res){
     // Pega os valores enviados pelo formulário
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var paragrafo = req.body.paragrafo;

    // SQL de inserção para adicionar os dados no banco
    var sql = "INSERT INTO pesquisadores (nome, sobrenome, email, paragrafo) VALUES (?, ?, ?, ?)";

    // Executa a query com os dados do formulário
    conexao.query(sql, [nome, sobrenome, email,paragrafo], function(error,result){
        if(error) {
            throw error;// Lança um erro se a query falhar
        }

        // Envia uma resposta para o usuário confirmando o cadastro e exibindo o parágrafo
        res.redirect('/');
    });
        
});    


// Configura o servidor para rodar na porta 7000
let porta = app.listen(7000, () => {
    console.log(`Servidor rodando na porta ${porta.address().port}!`);
});
