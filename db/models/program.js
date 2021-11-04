"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Presenter, { onDelete: "cascade", hooks: true});
    }
  }
  Program.init(
    {
      eventTitle: DataTypes.STRING,
      clientName: DataTypes.STRING,
      logo: DataTypes.STRING,
      frame: DataTypes.STRING,
      beginsOn: DataTypes.DATE,
      endsOn: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Program",
    }
  );
  return Program;
};
