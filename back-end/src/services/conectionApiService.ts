import requestPromise = require('request-promise');
const apiBase = "https://api.mercadolibre.com/",
conectionApi = {
    sendRequest: sendRequest
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

export {conectionApi as default};