const config = require("../config/config");
const AWS = require("aws-sdk");

mailSent = (type, data) => {
  console.log(type + " " + data);
  try {
    var templateData = "";
    var email = "";
    var Template_Name = "";

    if (type === config.SES.type.SIGNUP) {
      email = data;
      Template_Name = "Signup";
      templateData = {};
    } else if (type === config.SES.type.KYC) {
      email = data.email;
      Template_Name = "KYC";
      templateData = {};
    } else if (type === config.SES.type.BUY) {
      email = data.email;
      Template_Name = "Buy";
      templateData = {};
    } else if (type === config.SES.type.SELL) {
      email = data.email;
      Template_Name = "Sell";
      templateData = {};
    }

    var params = {
      Destination: {
        // CcAddresses: [    more CC email addresses   ]
        ToAddresses: [email],
      },
      Source: config.SES.email,
      Template: Template_Name,
      TemplateData: JSON.stringify(templateData),
      // ReplyToAddresses: ["EMAIL_ADDRESS"],
    };
    var sendPromise = new AWS.SES({
      // accessKeyId: config.ACCESS_KEY_ID,
      // secretAccessKey: config.SECRET_ACCESS_KEY,
      // region: config.REGION,

      accessKeyId: "AKIAUOJ5TD3TWTJPASW2",
      secretAccessKey: "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",
      region: "ap-south-1",
    })
      .sendTemplatedEmail(params)
      .promise();

    sendPromise
      .then(function (data) {
        // callBack(true, "An email has been sent to your account", data);
        console.log("An email has been sent to your account " + data);
      })
      .catch(function (err) {
        // callBack(false, "Error occured. Try again.", err);
        console.log("Error occured. Try again ." + err);
      });
  } catch (error) {
    // callBack(false, "Error occured. Try again.", error);
    console.log("Error occured. Try again ." + error);
  }
};
module.exports = { mailSent };
