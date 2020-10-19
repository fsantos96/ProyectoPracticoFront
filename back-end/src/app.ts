import express = require('express');
import CurrencyService from "./services/currencyService";
const config = require('./config'),
routes = require('./api');

// Create a new express application instance
const app: express.Application = express();

app.use('/api', routes);

app.listen(config.port, function () {
  CurrencyService.getCurrencyList().then(() => {
    console.log('Example app listening on port 3000!');
  }).catch((error : any) => {
    console.log(error);
  })
});

/*
Construir endpoints
- /api/items?q=:query
    https://api.mercadolibre.com/sites/MLA/search?q=:query
-/api/items/:id
    https://api.mercadolibre.com/items/:id
    https://api.mercadolibre.com/items/:id/description 

*/