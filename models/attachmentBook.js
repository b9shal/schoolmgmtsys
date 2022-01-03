'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachmentBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      attachmentBook.belongsTo(models.classRoom, { foreignKey: { name: "classRoomId" } })

      attachmentBook.belongsTo(models.subject, { foreignKey: "subjectId" })
      
      attachmentBook.belongsTo(models.attachmentBookType, { foreignKey: "attachmentBookTypeId" })
    }
  };
  attachmentBook.init({
    title: DataTypes.STRING,
    notAccordingToSubject: DataTypes.BOOLEAN,
    publishDate: DataTypes.DATE,
    remarks: DataTypes.STRING,
    attachmentFile: DataTypes.STRING,
    availableForAllClasses: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'attachmentBook',
    tableName: 'attachmentBook'
  });
  return attachmentBook;
};