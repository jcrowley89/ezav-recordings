"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Recording extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Presenter, { onDelete: "cascade", hooks:true });
    }
  }
  Recording.init(
    {
      presentationTitle: DataTypes.STRING,
      PresenterId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Presenter",
          key: "id",
        },
      },
      presentationFile: DataTypes.STRING,
      numSlides: DataTypes.INTEGER,
      recordingFile: DataTypes.STRING,
      completedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Recording",
    }
  );
  return Recording;
};
