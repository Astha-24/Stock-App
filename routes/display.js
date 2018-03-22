//JSON Parsing done.

const request = require('request');
var displayStock = (ticker,dataType,startDate,endDate,stock,callback) => {
    console.log(dataType);
    
    if(ticker===undefined){
        callback("Ticker is required");
    }
    else if(dataType===undefined && startDate ===undefined && endDate===undefined){
        stockDisplay = {};
        var len = stock.priceHistory.Date.length;
        for (var i = 0; i < len; i++) {
            stockDisplay[stock.priceHistory.Date[i]] = (stock.priceHistory.Close[i]);
        }
        callback(null,display={
            ticker: stock.ticker,
            Close:stockDisplay,
            createdDate: stock.createdDate,
            updatedDate: stock.updatedDate
        });      
    }
    else{
        stockDisplay={};
        var len=stock.priceHistory.Date.length;
        for(var i=0;i<len;i++){
            stockDisplay[stock.priceHistory.Date[i]]=(stock.priceHistory[dataType][i]);
        }      
        callback(null,display={
            ticker: stock.ticker,
            [dataType]:stockDisplay,
            createdDate: stock.createdDate,
            updatedDate: stock.updatedDate
        })
    }
    
};
module.exports.displayStock = displayStock;
