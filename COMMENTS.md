# +A Educação - Documentação

#### Arquitetura
A arquitetura da aplicação é divida em dois diretórios: api e client, sendo respectivamente responsáveis pelo Backend e Frontend, ambas dentro de um mesmo repositório. O Frontend se comunica com o Backend através de requisições REST. 

O Frontend faz as chamadas a API através da biblioteca Axios de dentro dos compoentes presentes no repositório Pages. 

O Backend da aplicação recebe uma requisição pela rota presente no arquivo principal do Node Server, server.js. Essa rota direciona a requisição para um arquivo de rota especifico para o módulo Students. Lá é possível aplicar a dependencia da requisição a um validador customizado e sendo filtrado, é mandado para o Controller que fará diretamente a comunicação com o Model e sendo assim, as manipulações no banco de dados. 

#### Bibliotecas utilizadas
##### Frontend
- Vue.js
- Vue CLI
- Vuetify
- Vue Router
- Axios
##### Backend
- Node.js
- Express.js
- Express Validator
- Sequelize ORM
- MySQL

#### Melhorias que poderiam ser feitas

Dada a simplicidade da aplicação, não vi a necessidade da divisão dos blocos HTML em diferentes componentes, pois de forma geral a biblioteca utilizada para construção da página, Vuetify, simplifica a construção. Porem, seria uma ótima prática a componentização da aplicação e quebra dos módulos presentes no diretório Pages em Child components com partes específicas de código caso houvesse mais blocos a serem implementados nas páginas.

No backend a proposta ideal seria uma camada Repository que se comunicasse com o Banco de dados ao invés de termos as chamadas feitas diretamente de dentro do Controller, sendo assim o controller seria responsável apenas para o recebimento, encaminhamento e retorno das requisições, ou mesmo uma camada de lógica do negócio dentro de um Service que comunicasse com o Repository e que fosse chamado pelo Controller. 

#### Requisitos não entregues
Gostaria de ter implementado uma camadas de testes unitários provavelmente usando a biblioteca Jest.

Algo que também seria muito interessante haver na aplicação seria autenticação. Eu gostaria de ter feito essa camada de segurança usando a biblioteca JWT, no haveriamos uma pagina de criação de usuario no qual ao comunicar-se com a API um token seria gerado e uma tela para login, no qual o token seria gerado pela API e passado ao Frontend e que por sua vez o salvaria em Local Storage, passando o token válido ás API's na medidas que as  requisições forem feitas. 

Outra camada de segurança que seria ideal haver e que não pude desenvolver por falta de tempo é a camada de Autorização, no qual eu faria através de Middlewares para as rotas e validando o controle de acesso de determinados usuários através de uma lógica de tipos de usuário. 

#### Instalação
Vamos começar pelo Backend, portanto no seu editor MySQL, executar o comando: 
```sh
CREATE DATABASE mais_a_educacao_challenge
```
Editar o arquivo: api/config/config.json de acordo com sua conexão no Mysql (username, password). 

Uma vez criado o banco dentro do seu MySQL e editado o arquivo de configuração, prosseguir com a instalação: 
```sh
cd api
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
node server.js
```

Após isso, agora é hora de iniciar o Frontend
```sh
cd ../client
npm install
npm run serve
```
Acesse a aplicação pela url http://localhost:8080