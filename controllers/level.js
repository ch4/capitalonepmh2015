/**
 * Created by hc on 3/7/2015.
 */
var request = require('request');

exports.getData = function(req, res) {
    request({
        uri: 'https://api.levelmoney.com/api/v2/hackathon/get-accounts',
        method: 'POST',
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
        data: {"args": {"uid": 1110568334, "token": "B464BEA43FEE78E84EA134D532551C3A", "api-token": "HackathonApiToken"}}
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(500,body);
        } else {
            res.send(500,body);
        }
    });
};