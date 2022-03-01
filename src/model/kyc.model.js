const DataTypes = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('kyc', {
        userId: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        applicantId: {
            type: DataTypes.STRING
        },
        checkId: {
            type: DataTypes.STRING
        },
        selfiStatus:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        documentStatus:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        resultUri: {
            type: DataTypes.STRING
        },
        kycStatus: {
            type: DataTypes.TEXT,
        },
        kycResultStatus:{
            type: DataTypes.TEXT,
            defaultValue:"not initiated",
        },
        identityPhoto: {
            type: DataTypes.TEXT
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