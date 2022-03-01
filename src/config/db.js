const {
    Sequelize
} = require("sequelize");
const loggerName = '[ORM]'
const user = AppConfig.USER;
const password = AppConfig.PASSWORD;
const database = AppConfig.DATABASE;
const host = AppConfig.HOST;

const pg = new Sequelize(database, user, password, {
    host: host,
    dialect: 'postgres',
    define: {
        timestamps: true,
        freezeTableName: true
    },
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
        timezone: '+05:30',
        useUTC: true
    },
    timezone: '+05:30',
    logging: false,
})

// Model Sources
const UserModelSource = require('../model/user.model');
const SessionModelSource = require("../model/session.model");
const BankModelSource = require("../model/bank.model");
const KycModelSource = require("../model/kyc.model");
const PaymentModelSoure = require("../model/payment.model");
const HelpModelSource = require("../model/help.model");

const modelDefiners = [UserModelSource, SessionModelSource, BankModelSource, KycModelSource, PaymentModelSoure, HelpModelSource];

for (const modelDefiner of modelDefiners) {
    modelDefiner(pg)
}

pg.models.session.hasMany(pg.models.user, { as: "user", foreignKey: 'userId' });
pg.models.bank.hasOne(pg.models.user, { as: "user", foreignKey: 'userId' });
pg.models.kyc.hasMany(pg.models.user, { as: "user", foreignKey: 'userId' });
pg.models.help.hasMany(pg.models.user, { as: "user", foreignKey: 'userId' });

const autheticateDB = async () => {
    const methodName = loggerName + '[AuthenticateDB]'
    return new Promise(async (resolve, reject) => {
        try {
            await pg.authenticate();
            console.log(`DB Successfully Connected to DataBase : ${database}`);
            return resolve();
        } catch (error) {
            console.error(methodName, 'Unable to connect to the config:')
            console.error(methodName, error.message)
            return reject(error.message)
        }
    })
}

module.exports.autheticateDB = autheticateDB
module.exports.pg = pg