import conectionApiService from "./conectionApiService";
const currency = {
    getCurrencyList: getCurrencyList,
    reloadCurrencyList: reloadCurrencyList
};
var currencyList : any = null;

function getCurrencyList() {
    return new Promise(function (resolve, reject) {
        if(currencyList) {
            resolve(currencyList);
        } else {
            var request = {
                method: "currencies",
                type: "url",
                params: ""
            };
            conectionApiService.sendRequest(request, "GET").then((data : any) => {
                currencyList = data;
                resolve(currencyList);
            }).catch((error : any) => {
                reject("No se puedo obtener la lista de tipo de cambio");
            })
        }
    })

}

function reloadCurrencyList() {
    currencyList = null;
    return new Promise(function (resolve, reject) {
        getCurrencyList().then(() => {
            resolve();
        }).catch((error: any) =>{
            reject(error);
        })
    })
}

export {currency as default};