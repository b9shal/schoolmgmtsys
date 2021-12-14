'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guardian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      guardian.hasOne(models.admission, { foreignKey: "guardianId" })
      guardian.hasOne(models.student, { foreignKey: "guardianId" })
    }
  };
  guardian.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    relation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fatherName: DataTypes.STRING,
    motherName: DataTypes.STRING,
    occupation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    income: DataTypes.DECIMAL,
    education: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    mobile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    photo: DataTypes.STRING,
    skipLoginAuth: DataTypes.BOOLEAN,
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    retypePassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    linkedin: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'guardian',
    tableName: 'guardian',
  });
  return guardian;
};