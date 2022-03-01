const DataTypes = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('bank', {
        userId: {
            allowNull: false,
            primarykey: true,
            type: DataTypes.BIGINT,
        },
        accountNumber: {
            unique: true,
            type: DataTypes.BIGINT
        },
        ifscCode: {
            type: DataTypes.TEXT
        },
        virtualAccountNumber: {
            unique: true,
            type: DataTypes.TEXT
        },
        balance: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: "0"
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