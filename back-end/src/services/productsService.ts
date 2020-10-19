
import conectionApiService from "./conectionApiService";
import CurrencyService from "./currencyService";
import {itemDto} from "../DTOs/itemDto";
import {authorDto} from "../DTOs/authorDto";
import {itemResponseDto} from "../DTOs/itemResponseDto";
import {priceDto} from "../DTOs/priceDto";
import {itemDetailDto} from "../DTOs/itemDetailDto";

const products = {
    getItemsSearch: getItemsSearch,
    getItemsDetailById: getItemsDetailById
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
            conectionApiService.sendRequest(request, "GET").then((data : any) => {
                itemData.description = data.plain_text;
                resolve(itemData);
            }).catch(function () {
                resolve(itemData);
            });
        }).catch((error : any) => {
            reject(error);
        });
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
        conectionApiService.sendRequest(request, "GET").then((data : any) => {

            var currencyList : Array<any> = [];
            CurrencyService.getCurrencyList().then((response : any) => {
                currencyList = response;
                resolve(getResponseFormated(data, amountResultMax, currencyList));
            }).catch(() =>{
                resolve(getResponseFormated(data, amountResultMax, currencyList));
            });
           
        }).catch((error : any) => {
            reject(error);
        });
    });
}

function getResponseFormated(data : any, amountResultMax : number, currencyList:Array<any>) {
    var categories : Array<string> = [];
    var listItems : Array<itemDto> = [];
    if(data.available_filters) {
        var categoryFilter = data.available_filters.find((filter : any) => {
            return filter.id == "category";
        })

        categories = categoryFilter ? categoryFilter.values : categories;
    }

    if(data.results && data.results.length) {
        amountResultMax = amountResultMax ? amountResultMax : data.results.length;
        for(var i = 0; i < amountResultMax; i++) {
            var currency : any = currencyList.find((currency : any) =>{
                return currency.id == data.results[i].currency_id;
            });
            var amountDecimals : number = currency ? currency.decimal_places : 0;
            listItems.push(new itemDto(
                data.results[i].id,
                data.results[i].title,
                new priceDto(data.results[i].price, data.results[i].currency_id, amountDecimals),
                data.results[i].thumbnail,
                data.results[i].condition,
                data.results[i].shipping.free_shipping
            ));
        }
    }

    return new itemResponseDto(
        author,
        categories,
        listItems
    )
}

export {products as default};