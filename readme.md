# FlexFood
*Um projeto de aprendizado para alunos do Instituto Flexpeak.*

Bem-vindo ao repositório FlexFood, um projeto desenvolvido para os alunos do Instituto Flexpeak praticarem suas habilidades em desenvolvimento web. FlexFood é um aplicativo de delivery de comida inspirado no iFood, porém com menos funcionalidades para facilitar o processo de aprendizagem.

## Tecnologias Utilizadas

O projeto é dividido em duas partes: backend e frontend. As tecnologias utilizadas são as seguintes:

### Backend

-   Node.js: Plataforma de desenvolvimento JavaScript do lado do servidor.
-   Express: Framework web minimalista e flexível para Node.js, facilitando a criação de APIs REST.
-   Sequelize: Um ORM (Object-Relational Mapping) para Node.js que permite trabalhar com banco de dados SQL de forma mais simples e abstrata.

### Frontend

-   React: Biblioteca JavaScript para construção de interfaces de usuário.
-   Material-UI (Mui): Biblioteca de componentes React que implementa o Material Design do Google, facilitando a criação de interfaces bonitas e responsivas.

## Objetivos do Projeto

O principal objetivo do FlexFood é proporcionar aos alunos do Instituto Flexpeak uma oportunidade de aplicar seus conhecimentos em desenvolvimento web, usando as tecnologias mencionadas acima. Os alunos poderão praticar:

1.  Criação de APIs REST com Node.js e Express.
2.  Gerenciamento de banco de dados com Sequelize.
3.  Construção de interfaces de usuário com React e Material-UI.

## Passo a passo para a instalação e configuração

### O que você vai precisar instalado
* NodeJS (com NPM)
* Mysql Server
* Sequelize-cli Global

### Instalação
1. Clonando o projeto
````sh
git clone https://github.com/flexpeak/flexfood.git
````

2. Instalando dependências
````sh
cd flexfood # entrando na pasta do projeto
cd backend # entrando na pasta do backend
npm install # instalando dependências do backend
cd ../frontend # entrando na pasta do frontend
npm install # instalando dependências do frontend
````

### Configuração
1. Configurando o arquivo .env
````sh
cd backend # entrando na pasta do backend
cp .env.example .env # criando o arquivo .env a partir do .env.example
````

2. Preencher as variáveis necessárias do .env do backend
Exemplo:
````
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=flexfood
DB_HOST=127.0.0.1
JWT_KEY='jwtk3y'
````

3. Criar o banco de dados
````
sequelize db:create
````

### Inicializar o servidor
````sh
cd backend # entrando na pasta do backend
npm run dev # iniciando o servidor em ambiente de desenvolvimento
````

### Testar criação de usuário
Uma vez iniciado o servidor, você deve conseguir acessar a aplicação em ``http://localhost:3000``. 
Utilize um Client para APIs Rest, como o ***Insomnia***. Tente fazer uma requisição com o seguinte conteúdo:

**Tipo:** POST

**URL:** http://localhost:3000/registrar

**Parâmetros:** 
````json
{
	"nome": "Usuário Teste",
	"email": "teste@teste.com",
	"tipo": "C",
	"senha": "teste"
}
````

Se você recebeu o status code ``200`` para essa requisição, o projeto está configurado com sucesso!
