
const fs = require('fs');
var jwt = require('jsonwebtoken');
const axios = require("axios").default;

let customer_id = '1cefb3a849814552a534622e7e9a850d'

fs.readFile('private.pem', 'utf8', (err, private_key) => {
  if (err) {
    console.error(err)
    return
  }
  payload = {
    "iss": "9e9d0116cda8419bad9768ee97a7ce27",
    "iat": Math.floor((new Date()).getTime() / 1000)
  }

  var token = jwt.sign(payload, private_key, { algorithm: 'RS512' });

  const options = {
    method: 'GET',
    url: `https://api.lirium-sandbox.com/v1/customers/${customer_id}/accounts`,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
})

