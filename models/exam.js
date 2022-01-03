'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      exam.belongsTo(models.examTerm, { foreignKey: "examTermId"})
      exam.belongsTo(models.marksDistribution, { foreignKey: "marksDistributionId"})
    }
  };
  exam.init({
    name: DataTypes.STRING,
    examType: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'exam',
    tableName: 'exam',
  });
  return exam;
};