const client = require("twilio")(AppConfig.TWILIO_ACCOUNT_SID, AppConfig.TWILIO_AUTH_TOKEN);
const OneSignal = require('onesignal-node');
const oneSignalClient = new OneSignal.Client(AppConfig.ONE_SIGNAL_APP_ID, AppConfig.ONE_SIGNAL_ANDROID_KEY);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(AppConfig.SENDGRID_API_KEY);

function sendMessage(body, to) {
    client.messages.create({
        body: body,
        to: to,
        from: AppConfig.FROM
    })
}

async function sendEmail(to, subject, body) {
    const msg = {
        to: to,
        from: AppConfig.CONSTANT.EMAIL_FROM,
        subject: subject,
        html: body
    };
    sgMail.send(msg)
    .then(() => {
    }).catch((error) => {
        console.log('ERROR', error);
    });;
}

function response(res, data, message, status, error) {
    const responsedata = {
        status,
        message,
        data: data,
        error: error || null,
    };
    res.status(status);
    res.format({
        json: () => {
            res.json(responsedata)
        }
    })
}

const createNotification = async (obj) => {
    try {
        let playerIdArray = [];
        playerIdArray.push(obj.playerId)
        const notification = {
            headings: {
                "en": obj.title
            },
            contents: {
                "en": obj.body
            },
            include_player_ids: playerIdArray,
        };
        await oneSignalClient.createNotification(notification);
        return true
    } catch (e) {
        if (e instanceof OneSignal.HTTPError) {
            return false
        }
    }
}

module.exports = {
    response,
    sendMessage,
    createNotification,
    sendEmail
}