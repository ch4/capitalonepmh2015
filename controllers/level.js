/**
 * Created by hc on 3/7/2015.
 */
var request = require('request');

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
            console.log(body);
            res.send(body);
        } else {
            res.send(body);
        }
    });
};