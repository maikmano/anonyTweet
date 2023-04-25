require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Twit = require('twit');
const Filter = require('bad-words');
const path = require('path');
const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;

const apiLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutos
  max: 1,
  keyGenerator: function (req) {
    return req.ip; // utiliza o IP do usuário como chave
  },
  message: 'Aguarde 3 minutos antes de enviar outra mensagem!',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/post', apiLimiter,  async  (req, res) => {
  const message = req.body.message;
  const recipient = req.body.recipient;


// Inscreva-se na API do Twitter para obter acesso à API do Twitter v2. Em seguida, crie um arquivo .env com as seguintes propriedades:
//  CONSUMER_KEY=
//  CONSUMER_SECRET=
//  ACCESS_TOKEN=
//  ACCESS_TOKEN_SECRET=

  const twitterClient = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });
  const filter = new Filter({ placeHolder: 'x' });
filter.addWords('adicione palavras ofensivas aqui', 'ofensa1', 'ofensa2');


  if (filter.isProfane(message)) {
    return res.status(400).send('A mensagem contém palavras ofensivas!');
  }

  const tweet = 'Para ' + '@' + `${recipient}` +  ' : ' + `${message}` + ' #CartaAnonima';

  try {
    const response = await twitterClient.post('statuses/update', {
      status: tweet,
    });

    res.send('A mensagem foi postada no Twitter com sucesso!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao postar mensagem no Twitter!');
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
