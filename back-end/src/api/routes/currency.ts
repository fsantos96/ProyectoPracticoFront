
import CurrencyService from "../../services/currencyService";
const express = require("express"),
    router = express.Router();

    router.get("/reloadCurrencyList", (req : any, res: any) => {     
        CurrencyService.reloadCurrencyList().then((response : any) => {
            res.json("La lista de tipo de cambio fue recargada");
        }).catch((error : any) =>{
            res.send(error);
        });
    });

    module.exports = router;