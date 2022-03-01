const DataTypes = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('session', {
    userId: {
      allowNull: false,
      primarykey: true,
      type: DataTypes.BIGINT
    },
    token: {
      type: DataTypes.STRING
    },
    isLogin: {
      type: DataTypes.BOOLEAN,
      defaultValue: '0'
    },
    deviceType: {
      type: DataTypes.STRING,
    },
    playerId: {
      type: DataTypes.STRING
    },
    ipAddress:{
      type: DataTypes.TEXT
    },
    deviceName:{
      type: DataTypes.TEXT
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
  }, {
    freezeTableName: true,
  })
}