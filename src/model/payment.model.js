const DataTypes = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('payment', {
        userId: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        modeOfPayment: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        amount: {
            allowNull: true,
            type: DataTypes.BIGINT,
        },
        paymentStatus: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        utrNumber: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        messageId: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cyptoTransactionId: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cryptoType: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cryptoReferenceNumber: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cryptoTransactionStatus: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW
        }
    }, {
        freezeTableName: true,
    })
}