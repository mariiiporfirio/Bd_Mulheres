-- Criação do banco de dados 'trabalhofeminino', se ele não existir
CREATE DATABASE IF NOT EXISTS trabalhofeminino;

-- Seleção do banco de dados 'trabalhofeminino' para utilização nas próximas operações
USE trabalhofeminino;

-- Criação da tabela 'pesquisadores' com as colunas necessárias
CREATE TABLE pesquisadores (
   
   -- Coluna 'id' do tipo inteiro, com incremento automático e chave primária
   -- O valor será gerado automaticamente para garantir um identificador único
   id INT AUTO_INCREMENT PRIMARY KEY,      
   
   -- Coluna 'nome' do tipo string, com tamanho máximo de 50 caracteres
   -- Não permite valores nulos (obrigatório informar um nome)
   nome VARCHAR(50) NOT NULL,              
   
   -- Coluna 'sobrenome' do tipo string, com tamanho máximo de 100 caracteres
   -- Não permite valores nulos (obrigatório informar um sobrenome)
   sobrenome VARCHAR(100) NOT NULL,        
   
   -- Coluna 'email' do tipo string, com tamanho máximo de 50 caracteres
   -- Não permite valores nulos e deve ser único (não pode haver dois pesquisadores com o mesmo email)
   email VARCHAR(50) NOT NULL UNIQUE,      
   
   -- Coluna 'paragrafo' do tipo texto (para armazenar longos textos ou descrições)
   -- Não permite valores nulos (obrigatório informar um parágrafo)
   paragrafo TEXT NOT NULL                 
);
