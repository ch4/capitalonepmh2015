/**
 * Created by hc on 3/7/2015.
 */
var request = require('request');
var secrets = require('../config/secrets');

exports.testSms = function(req, res) {
    var targetNumber = '18194171381';
    var message = 'hello';
    request({
        uri: 'https://rest.nexmo.com/sms/json?api_key='+secrets.nexmo.apikey+'&api_secret='+secrets.nexmo.apisecret+'&from='+secrets.nexmo.number+'&to='+targetNumber+'&text='+message,
        method: 'GET',
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
        //headers: {
        //    'Content-Type': 'application/json',
        //    'Accept': 'application/json'
        //},
        //json: {"args": {"uid": 1110568334, "token": "B464BEA43FEE78E84EA134D532551C3A", "api-token": "HackathonApiToken"}}
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            res.send(body);
        } else {
            res.send(body);
        }
    });
};

exports.callmomma = function(req, res) {
    var targetNumber = '18194171381';
    var message = 'hello';
    request({
        uri: 'https://api.nexmo.com/tts/json?api_key='+secrets.nexmo.apikey+'&api_secret='+secrets.nexmo.apisecret+'&from='+secrets.nexmo.number+'&to='+targetNumber+'&text='+message,
        method: 'POST',
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        json: {
            'api_key':secrets.nexmo.apikey,
            'api_secret':secrets.nexmo.apisecret,
            'from':secrets.nexmo.number,
            'to':targetNumber,
            'text':'hello'
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            res.send(body);
        } else {
            res.send(body);
        }
    });
};

exports.callFunction = function(){
    var targetNumber = '18194171381';
    var message = 'Harvey has exceeded his spending limits';
    request({
        uri: 'https://api.nexmo.com/tts/json?api_key='+secrets.nexmo.apikey+'&api_secret='+secrets.nexmo.apisecret+'&from='+secrets.nexmo.number+'&to='+targetNumber+'&text='+message,
        method: 'POST',
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        json: {
            'api_key':secrets.nexmo.apikey,
            'api_secret':secrets.nexmo.apisecret,
            'from':secrets.nexmo.number,
            'to':targetNumber,
            'text':message
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            //res.send(body);
        } else {
            //res.send(body);
        }
    });
}

exports.sendSms = function(targetNumber, message, callback) {
    request({
        uri: 'https://rest.nexmo.com/sms/json?api_key='+secrets.nexmo.apikey+'&api_secret='+secrets.nexmo.apisecret+'&from='+secrets.nexmo.number+'&to='+targetNumber+'&text='+message,
        method: 'GET',
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(error, response, body) {
        callback();
    });
};