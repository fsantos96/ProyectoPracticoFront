
const express = require("express"),
    conectionApiService = require("../../services/conectionApiService"),
    router = express.Router();

    router.get("/", (req : any, res: any) => {     
        var searchText : string = req.query.searchText;
        var amountResults : number = req.query.amountResults;
        conectionApiService.getItemsSearch(searchText, amountResults).then((response : any) => {
            res.json(response);
        }).catch((error : any) =>{
            res.send(error);
        });
    });

    router.get("/:id", (req : any, res: any) => {     
        conectionApiService.getItemsDetailById(req.params.id).then((response : any) => {
            res.json(response);
        }).catch((error : any) =>{
            res.send(error);
        });
    });

module.exports = router;