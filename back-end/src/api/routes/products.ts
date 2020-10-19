
import ProductService from "../../services/productsService";
const express = require("express"),
    router = express.Router();

    router.get("/", (req : any, res: any) => {     
        var searchText : string = req.query.searchText;
        var amountResults : number = req.query.amountResults;
        ProductService.getItemsSearch(searchText, amountResults).then((response : any) => {
            res.json(response);
        }).catch((error : any) =>{
            res.send(error);
        });
    });

    router.get("/:id", (req : any, res: any) => {     
        ProductService.getItemsDetailById(req.params.id).then((response : any) => {
            res.json(response);
        }).catch((error : any) =>{
            res.send(error);
        });
    });

module.exports = router;