
import conectionApiService from "./conectionApiService";
import CurrencyService from "./currencyService";
import {itemListDto} from "../DTOs/itemListDto";
import {authorDto} from "../DTOs/authorDto";
import {itemResponseDto} from "../DTOs/itemResponseDto";
import {priceDto} from "../DTOs/priceDto";
import {itemDetailDto} from "../DTOs/itemDetailDto";

const products = {
    getItemsSearch: getItemsSearch,
    getItemsDetailById: getItemsDetailById,
}, 
author : authorDto = new authorDto("Federico",  "Santos");

function getItemsDetailById(id : string) {
    //TODO Obtener la descricion con el id
    var request = {
        method: "items",
        type: "url",
        params: id
    };

    return new Promise(function (resolve, reject) {
        conectionApiService.sendRequest(request, "GET").then((data : any) => {
            var currencyList : Array<any> = [];
            var itemData : itemDetailDto = new itemDetailDto(
                data.id, 
                data.title, 
                new priceDto(data.price, data.currency_id,0), 
                data.thumbnail, 
                data.condition, 
                data.shipping.free_shipping,
                data.sold_quantity,
                "",
                [],
            );
            request.params = id + "/description";
            CurrencyService.getCurrencyList().then((response : any) => {
                currencyList = response;
                var currency : any = currencyList.find((currency : any) =>{
                    return currency.id == data.currency_id;
                });
                var amountDecimals : number = currency ? currency.decimal_places : 0;
                var symbol : string = currency ? currency.symbol : data.currency_id;
                itemData.price.decimals = amountDecimals;
                itemData.price.currency = symbol;
                getCategoryDataById(data.category_id).then((categoryList : any) =>{
                    itemData.categories = categoryList;
                    getItemsDescriptionById(request).then((description) => {
                        itemData.description = description;
                        resolve(itemData);
                    }).catch((error : any) => {
                        resolve(itemData);
                    });
                }).catch((error:any) => {
                    getItemsDescriptionById(request).then((description) => {
                        itemData.description = description;
                        resolve(itemData);
                    }).catch((error : any) => {
                        resolve(itemData);
                    });
                })
            }).catch((error : any) =>{
                getCategoryDataById(data.category_id).then((categoryList : any) =>{
                    itemData.categories = categoryList;
                    getItemsDescriptionById(request).then((description) => {
                        itemData.description = description;
                        resolve(itemData);
                    }).catch((error : any) => {
                        resolve(itemData);
                    });
                }).catch((error:any) => {
                    getItemsDescriptionById(request).then((description) => {
                        itemData.description = description;
                        resolve(itemData);
                    }).catch((error : any) => {
                        resolve(itemData);
                    });
                })
            });
        }).catch((error : any) => {
            reject(error);
        });
    });
}

function getItemsDescriptionById(request : any) {
    return new Promise((resolve, reject) => {
        conectionApiService.sendRequest(request, "GET").then((data : any) => {
            resolve(data.plain_text);
        }).catch(function (error : any) {
            reject(error);
        });
    })
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
        conectionApiService.sendRequest(request, "GET").then((data : any) => {
            var categories = data.available_filters.find((filter : any) => {
                return filter.id == "category"
            });

            categories = categories.values;
            var categoryResults = 0;
            var categoryId : string = '';
            categories.forEach((category : any) => {
                if(categoryResults < category.results) {
                    categoryResults = category.results;
                    categoryId = category.id
                }
            });

            getCategoryDataById(categoryId).then((categoryList : any) =>{
                var currencyList : Array<any> = [];
                CurrencyService.getCurrencyList().then((response : any) => {
                    currencyList = response;
                    resolve(getResponseItemsFormated(data, amountResultMax, currencyList, categoryList));
                }).catch(() =>{
                    resolve(getResponseItemsFormated(data, amountResultMax, currencyList, categoryList));
                });
            }).catch((error:any) => {
                var currencyList : Array<any> = [];
                CurrencyService.getCurrencyList().then((response : any) => {
                    currencyList = response;
                    resolve(getResponseItemsFormated(data, amountResultMax, currencyList));
                }).catch(() =>{
                    resolve(getResponseItemsFormated(data, amountResultMax, currencyList));
                });
            })
           
        }).catch((error : any) => {
            reject(error);
        });
    });
}

function getCategoryDataById(id : string) {
    let request = {
        method: "categories",
        type: "url",
        params: id
    };

    return new Promise((resolve, reject) => {
        conectionApiService.sendRequest(request, "GET").then((data : any) => {
            resolve(data.path_from_root);
        }).catch((error : any) => {
            reject(error)
        })

    })
}

function getResponseItemsFormated(data : any, amountResultMax : number, currencyList:Array<any>, categoryList?:Array<any>) {
    var listItems : Array<itemListDto> = [];
    
    if(data.results && data.results.length) {
        amountResultMax = amountResultMax ? amountResultMax : data.results.length;
        for(var i = 0; i < amountResultMax; i++) {
            var currency : any = currencyList.find((currency : any) =>{
                return currency.id == data.results[i].currency_id;
            });
            var amountDecimals : number = currency ? currency.decimal_places : 0;
            var symbol : string = currency ? currency.symbol : '';
            listItems.push(new itemListDto(
                data.results[i].id,
                data.results[i].title,
                new priceDto(data.results[i].price, symbol, amountDecimals),
                data.results[i].thumbnail,
                data.results[i].condition,
                data.results[i].shipping.free_shipping,
                data.results[i].address.state_name,
            ));
        }
    }

    return new itemResponseDto(
        author,
        categoryList,
        listItems
    )
}

export {products as default};