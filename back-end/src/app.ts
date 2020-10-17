import express = require('express');
const config = require('./config'),
routes = require('./api');

// Create a new express application instance
const app: express.Application = express();

app.use('/api', routes);
app.get('/', function (req, res) {
  res.send('Hello World2!');
});
app.listen(config.port, function () {
  console.log('Example app listening on port 3000!');
});

/*
Construir endpoints
- /api/items?q=:query
    https://api.mercadolibre.com/sites/MLA/search?q=:query
-/api/items/:id
    https://api.mercadolibre.com/items/:id
    https://api.mercadolibre.com/items/:id/description 

*/