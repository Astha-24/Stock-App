var express = require('express');
var Stock = require('../models/stock');

var router = express.Router();
var getStock=require('./scrapper.js');
var displayStock=require('./display.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    
    var ticker=req.query.ticker;
    if(ticker===undefined){
        res.send('Ticker Field Necessary');
    }
    var startDate=req.query.startDate;
    var endDate=req.query.endDate;
    var dataType=req.query.dataType;
    console.log(ticker);
    
    Stock.find({ "ticker": ticker }, function (err, stock) {
        
        if (err) throw err;
    
        if (stock.length === 0){
            getStock.getStock(ticker,(errorMessage,results)=>{
                if(errorMessage){
                    console.log(errorMessage);
                }
                else{
                    var ticker=results.ticker;
                    var priceHistory=results.priceHistory;
                    var createdDate=results.createdDate;
                    var updatedDate=results.updatedDate;
                    var newStock = new Stock({
                       ticker:ticker,
                       priceHistory:priceHistory,
                       createdDate:createdDate,
                       updatedDate:updatedDate
                    });
                    console.log(newStock);
                    
                    newStock.save(function (err) {
                        if (err) throw err;
                        console.log('Stock Saved!');
                    });
                    displayStock.displayStock(ticker,dataType,startDate,endDate,results,(errorMessage,display)=>{
                        if(errorMessage){
                            console.log(errorMessage);
                        }
                        else{
                            res.send(display);
                        }
                    })
                    
                }

            })
        }else{
            //display the stored data and update
           getStock.getStock(ticker,(errorMessage,results)=>{
               if(errorMessage){
                   console.log(errorMessage);
                }else{
                   var newpriceHistory = results.priceHistory;
                   var updatedDate = results.updatedDate;
                    console.log(newpriceHistory);
                    
                   Stock.update({ "ticker": ticker }, {
                       priceHistory: newpriceHistory,
                       updatedDate:updatedDate
                   }, function (err, affected, resp) {
                       console.log(resp);
                   });
                }
               displayStock.displayStock(ticker, dataType, startDate, endDate, results, (errorMessage, display) => {
                   if (errorMessage) {
                       console.log(errorMessage);
                   }
                   else {
                       res.send(display);
                   }
               })
           })
            
        }
        //res.send(stock.length === 0);
    });
    
});

module.exports = router;
