//JSON Parsing done.

const request=require('request');
var getStock=(ticker,callback)=>{
    request({
    url: `https://www.quandl.com/api/v3/datasets/NSE/${ticker}.json?api_key=MX4zkypoSjUzp8CyotQg`,
    json:true
   },(error,response,body)=>{
    var coloumnLength = body.dataset.column_names.length
    var dataLength = body.dataset.data.length;
    
    var ticker= body.dataset.dataset_code;
    var priceHistory={};
    for(var i=0;i<coloumnLength;i++){
        priceHistory[body.dataset.column_names[i]]=[];
    }
    
    for(var i=0;i<coloumnLength;i++){
        for(var j=0;j<dataLength;j++){
            priceHistory[body.dataset.column_names[i]].push(body.dataset.data[j][i]);         
        }
    }
    var createdDate=Date();    
    var updatedDate=Date();
    var stock={};
    stock.ticker=ticker;
    stock.priceHistory=priceHistory;
    stock.createdDate=createdDate;
    stock.updatedDate=updatedDate;
    callback(null,stock);
    //console.log(JSON.stringify(stock,null,2));
});
};
module.exports.getStock = getStock;
