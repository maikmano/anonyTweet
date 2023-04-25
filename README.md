
# AnonyTwitter
#### Sistema de Mensagens Anônimas para Twitter

Este é um sistema simples de mensagens anônimas para usuários do Twitter. Ele permite que os usuários enviem mensagens anônimas para qualquer conta do Twitter, sem a necessidade de revelar sua identidade. O sistema usa a API v1.1 do Twitter para postar as mensagens e um filtro de palavras ofensivas para garantir que as mensagens não contenham palavras inapropriadas.

## Site:
http://anonytwt.online/


## Configuração

Antes de executar o sistema, é necessário criar um arquivo `.env` com as seguintes propriedades:

```bash
CONSUMER_KEY=
CONSUMER_SECRET=
ACCESS_TOKEN=
ACCESS_TOKEN_SECRET=
```
Essas propriedades são as credenciais da API do Twitter, que podem ser obtidas ao se inscrever na API do Twitter e criar um app.

## Instalação e Execução

Para executar, siga os passos abaixo:
```bash
  git clone https://github.com/seu-usuario/sistema-de-mensagens-anonimas-para-twitter.git
```

```bash
npm install
```

```bash
node index.js
```

Abra o navegador e acesse http://localhost:3000 para acessar a página inicial do sistema.
