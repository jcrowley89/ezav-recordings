'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Recording, { onDelete: "cascade", hooks: true });
    }
  };
  Flag.init({
    RecordingId: DataTypes.INTEGER,
    time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Flag',
  });
  return Flag;
};