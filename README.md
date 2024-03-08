<h1> Como executar o projeto </h1>

<h2> Backend:</h2>
<p> Para o backend é necessário : </p>
<ul>
  <li>Node : 18.0 v</li>
  <li>Docker -> Necessário apenas se preferir subir o banco Postgres em um container</li>
</ul>

<H2>Configurando o Banco:</H2>
<p>Para a subir o banco de dados em containter basta executar o seguinte comando no diretório do projeto: </p>
  <p><strong>docker compose up </strong></p>

<p>Caso ja possua um banco em seu computador, altere as variaveis de ambiente que estão localizadas no arquivo <strong>".env"</strong></p>

<p>
  Após subir o banco de dados, conclua a configuração utilizando qualquer editor SQL
</p>
<ul>
  <li>Configure ,em seu editor, a conexão com o Banco de Dados colocando apenas as suas credencias, como usuário, senha e a porta em que o banco esta localizado</li>
  <li>Caso esteja executando o seu banco em um container, ira encontrar as credencias dentro do arquivo <strong>".env"</strong></li>
  <li>Abra um editor SQL </li>
  <li>Execute o seguinte Script:
    <code>
      CREATE DATABASE projeto_gerenciamento_clientes;
    </code>
  </li>
  <li>
    <code>
      CREATE TABLE clientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        telefone VARCHAR(20),
        coordenada_x FLOAT,
        coordenada_y FLOAT
      );
    </code>
  </li>
</ul>
<p> Após aderir a estas configurações é necessário executar o comando <strong> npm install </strong> para instalar todas as dependencias do projeto</p>
<p> Em seguida, no diretório do projeto execute o comando <strong>"npm run dev"</strong></p>
<p><strong>SEU BACKEND ESTÁ INICIADO</strong></p>

<h2> FrontEnd:</h2>
<p> executar o comando <strong> npm install </strong> para instalar todas as dependencias do projeto</p>
<p> Em seguida, no diretório do projeto execute o comando <strong>"npm run dev"</strong></p>
<p><strong>SEU FRONTEND ESTÁ INICIADO</strong></p>
