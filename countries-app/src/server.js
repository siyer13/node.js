const express = require('express')
const request = require('request');
const bodyParser = require('body-parser');
const e = require('express');
const { json } = require('body-parser');
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index', {capital: null, error: null});
})

app.post('/', function (req, res) {  

    let country = req.body.country
    let code = req.body.code
    let url = null

    if (country) {
        url = `https://restcountries.eu/rest/v2/name/${country}`
    } 
    else if (code) {
        url = `https://restcountries.eu/rest/v2/alpha/${code}`
    }
    
    request(url, function (err, response, body) {
        if(err){
          res.render('index', {capital: null, error: 'Error, please try again'});
        } 
        else {
            let jsonResponse = JSON.parse(body)
            console.log(jsonResponse)
            if(jsonResponse.status === 400) {
                res.render('index', {capital: null, error: jsonResponse.message});
            }
            if(jsonResponse == undefined) {
                console.log('Undefined')
                res.render('index', {capital: null, error: 'Error, please try again'});
              }
            else {
                let responseText = ''
                if(Array.isArray(jsonResponse)) {
                    for(var countryData in jsonResponse) {
                            responseText += `Capital of ${jsonResponse[countryData].name} is ${jsonResponse[countryData].capital}! ` 
                            console.log(responseText)
                    }
                    res.render('index', {capital: responseText, error: null});
                }else {
                    responseText += `Capital of ${jsonResponse.name} is ${jsonResponse.capital}! `
                    res.render('index', {capital: responseText, error: null}); 
                }
                
                responseText = ''
        }
    }
      });
})

app.listen(3000, function () {
  console.log('Country app listening on port 3000!')
})
