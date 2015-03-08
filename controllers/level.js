/**
 * Created by hc on 3/7/2015.
 */
var request = require('request');
var _ = require('lodash');
var Alert = require('../models/Alert');
var Transaction = require('../models/Transaction');
var nexmoController = require('./nexmo')

exports.addTransactions = function(req, res) {
    var newTransaction = new Transaction({
        category : 'Shopping',
        amount : 100
    });
    newTransaction.save(function (err, doc) {
        if (err) { throw err; }

        res.json(doc);
    });
};

exports.getAccounts = function(req, res) {
    request({
        uri: 'https://api.levelmoney.com/api/v2/hackathon/get-accounts',
        method: 'POST',
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        json: {"args": {"uid": 1110568334, "token": "B464BEA43FEE78E84EA134D532551C3A", "api-token": "HackathonApiToken"}}
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        } else {
            res.send(body);
        }
    });
};

exports.getTransactions = function(req, res) {
    request({
        uri: 'https://api.levelmoney.com/api/v2/hackathon/get-all-transactions',
        method: 'POST',
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        json: {"args": {"uid": 1110568334, "token": "B464BEA43FEE78E84EA134D532551C3A", "api-token": "HackathonApiToken"}}
        //json: {"args": {"uid": 1110570164, "token": "119947F2D985C3788998543A3D3AD90C", "api-token": "HackathonApiToken"}}

    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            //res.send(body);
            var filterFloat = function (value) {
                if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
                        .test(value))
                    return Number(value);
                return 0;
            }

            var groupedTransactions =_.groupBy(body.transactions, function(n) {
                return n.categorization;
            });

            //var reducedByCat = _.reduce(groupedTransactions, function(result, n, key) {
            //    result[key] = result[key] + n.amount
            //    return result;
            //}, {});

            var reductionResult = {};
            var asyncCounter = 0;
            _.forEach(groupedTransactions, function(catarray, catkey) {

                //var reduction = _.reduce(catarray, function(result, n, key) {
                //    //result[key] = result[key] + n.amount
                //
                //    console.log(n.amount);
                //    console.log(Number(result) + Number(n.amount));
                //    result = Number(result) + Number(n.amount);
                //
                //    return result;
                //}, {});

                var reduction = _.reduce(catarray, function(sum, n) {
                    return filterFloat(sum) + filterFloat(n.amount);
                });
                //console.log(catarray);

                reductionResult[catkey] = -1 * (filterFloat(reduction) / (100*100)); //convert to dollars

                asyncCounter += 1;

                //get demo values
                Transaction.find({ category: catkey }, function(err, transactions) {
                    if (err) { throw err; }

                    if(transactions.length > 0) {
                        var reduction2 = _.reduce(transactions, function (sum, n) {
                            //console.log(filterFloat(n.amount));
                            return filterFloat(sum) + filterFloat(n.amount);
                        });
                        console.log(reduction2);
                        reductionResult[transactions[0].category] = filterFloat(reductionResult[transactions[0].category]) + filterFloat(reduction2);
                        //console.log(reductionResult[transactions[0].category]);
                        
                        //hack to call yo momma
                        if(reductionResult[transactions[0].category] > 3000){
                            //call yo momma
                            nexmoController.callFunction();
                        }
                    }

                    asyncCounter -= 1;
                    if(asyncCounter <= 0){
                        res.send(reductionResult);
                    }
                });
            });

            //res.send(reductionResult);
        } else {
            res.send(body);
        }
    });
};