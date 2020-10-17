
import {itemDto} from "../DTOs/itemDto";
import {authorDto} from "../DTOs/authorDto";
import {itemResponseDto} from "../DTOs/itemResponseDto";
import {priceDto} from "../DTOs/priceDto";
import {itemDetailDto} from "../DTOs/itemDetailDto";
const requestPromise = require('request-promise'),
author : authorDto = new authorDto("Federico",  "Santos"),
apiBase = "https://api.mercadolibre.com/",
conectionApi = {
    getItemsDetailById: getItemsDetailById,
    getItemsSearch: getItemsSearch
};

function getParamsFormater(params : any) : string {
    var paramsFormated : string = "";
    var index : number = 0;
    for (const property in params) {
        paramsFormated += index == 0 ? "" : "&";
        paramsFormated += property + "=" + params[property];
    }

    return paramsFormated;
}

function getContextApi(config : any, method: string) : any {
    const options = {
        uri: apiBase,
        method: method
    }

    switch(config.type) {
        case "query": 
            options.uri += config.method + "?" + getParamsFormater(config.params);
        break;
        case "url": 
            options.uri += config.method + "/" + config.params;
        break;
        default:
            options.uri += config.method;
        break
    }

    return options;
}

function sendRequest(options : any, method : string) {
    let optionsRequest = getContextApi(options, method);
    return new Promise((resolve, reject) => {
        requestPromise(optionsRequest).then((data : any) => {
            if(data) {
                resolve(JSON.parse(data));
            }
            reject("Ocurrio un error al procesar los datos");
        }).catch((error : any) => {
            reject("Ocurrio un error al obtener los datos");
        })
    });
}

function getItemsSearch(searchText : string, amountResultMax : number)  {
    let request = {
        method: "sites/MLA/search",
        type: "query",
        params: {
            q: searchText
        }
    };

    return new Promise((resolve, reject) => {
        sendRequest(request, "GET").then((data : any) => {
            var listItems : Array<itemDto> = [];
            var categories : Array<string> = [];

            if(data.available_filters) {
                var categoryFilter = data.available_filters.find((filter : any) => {
                    return filter.id == "category";
                })

                categories = categoryFilter ? categoryFilter.values : categories;
            }

            if(data.results && data.results.length) {
                amountResultMax = amountResultMax ? amountResultMax : data.results.length;
                for(var i = 0; i < amountResultMax; i++) {
                    listItems.push(new itemDto(
                        data.results[i].id,
                        data.results[i].title,
                        new priceDto(data.results[i].price, data.results[i].currency_id),
                        data.results[i].thumbnail,
                        data.results[i].condition,
                        data.results[i].shipping.free_shipping
                    ));
                }
            }

            resolve(new itemResponseDto(
                author,
                categories,
                listItems
            ));
        }).catch((error : any) => {
            reject(error);
        });
    });
}

function getItemsDetailById(id : string) {
    //TODO Obtener la descricion con el id
    var request = {
        method: "items",
        type: "url",
        params: id
    };

    return new Promise(function (resolve, reject) {
        sendRequest(request, "GET").then((data : any) => {
            var itemData : itemDetailDto = new itemDetailDto(
                data.id, 
                data.title, 
                new priceDto(data.price, data.currency_id), 
                data.thumbnail, 
                data.condition, 
                data.shipping.free_shipping,
                data.sold_quantity,
                "",
            );
            request.params = id + "/description"
            sendRequest(request, "GET").then((data : any) => {
                itemData.description = data.plain_text;
                resolve(itemData);
            }).catch(function (error) {
                resolve(itemData);
            });
        }).catch(function (error) {
            reject(error);
        });
    });
}
module.exports = conectionApi; 