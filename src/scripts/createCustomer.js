
const fs = require('fs');
var jwt = require('jsonwebtoken');
const axios = require("axios").default;

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
    method: 'POST',
    url: 'https://api.lirium-sandbox.com/v1/customers',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    data: {
      reference_id: 'AA24053066',
      profile: {
        label: 'jcpetella',
        first_name: 'Juan',
        middle_name: 'Carlos',
        last_name: 'Petella',
        date_of_birth: '1974-08-09',
        national_id_country: 'AR',
        national_id_type: 'national_id',
        national_id: '24053066',
        citizenship: 'AR',
        address_line1: '1234 Any St',
        address_line2: 'Apt. C',
        city: 'Buenos Aires',
        state: 'CABA',
        country: 'AR',
        zip_code: '1430'
      },
      contact: { email: 'sample@nada.com', cellphone: '+5491156668452' }
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
})
