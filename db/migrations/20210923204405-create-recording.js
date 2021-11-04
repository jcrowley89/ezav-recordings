"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Recordings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      presentationTitle: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      PresenterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Presenters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      presentationFile: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      numSlides: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      recordingFile: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      completedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Recordings");
  },
};
