const DataTypes = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('help', {
        userId: {
            allowNull: false,
            type: DataTypes.BIGINT
        },
        zendeskId:{
            type: DataTypes.BIGINT   
        },
        url:{
            type: DataTypes.STRING
        },
        subject:{
            type:DataTypes.STRING 
        },
        description:{
            type: DataTypes.STRING
        },
        status:{
            type: DataTypes.STRING
        },
        requesterId:{
            type: DataTypes.STRING
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
        freezeTableName: true
    });
}