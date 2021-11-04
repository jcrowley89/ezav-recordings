"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Presenter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Program, { onDelete: "cascade", hooks: true });
      this.hasMany(models.Recording, { onDelete: "cascade", hooks: true });
    }
  }
  Presenter.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      code: DataTypes.STRING,
      ProgramId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Presenter",
    }
  );
  return Presenter;
};
