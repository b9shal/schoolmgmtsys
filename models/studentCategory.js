'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      studentCategory.hasOne(models.admission, { foreignKey: "studentCategoryId" })
    }
  };
  studentCategory.init({
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'studentCategory',
    tableName: 'studentCategory',
  });
  return studentCategory;
};