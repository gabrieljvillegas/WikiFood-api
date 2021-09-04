const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Recipe", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    image: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    // diets: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    // },
    summary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    spoonacularScore: {
      type: DataTypes.STRING,
    },
    healthScore: {
      type: DataTypes.STRING,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
};
