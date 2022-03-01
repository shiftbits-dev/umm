const DataTypes = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.BIGINT
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      primarykey: true,
      unique: true,
      type: DataTypes.BIGINT
    },
    token: {
      type: DataTypes.STRING
    },
    verifyEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verifyPhone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // verifyOtp: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.STRING
    },
    userRole: {
      type: DataTypes.ENUM('superadmin', 'supportadmin', 'customer'),
      defaultValue: 'customer'
    },
    applicantId: {
      type: DataTypes.STRING
    },
    otp: {
      type: DataTypes.INTEGER
    },
    emailOtp: {
      type: DataTypes.INTEGER
    },
    promotionalMail: {
      type: DataTypes.BOOLEAN,
    },
    lastKycMailSend: {
      type: DataTypes.DATE
    },
    profilePicture: {
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
    freezeTableName: true
  });
}