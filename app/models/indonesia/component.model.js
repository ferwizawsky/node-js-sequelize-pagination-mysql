module.exports = (sequelize, Sequelize, table) => {
  return sequelize.define(
    table,
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false, // Disable timestamps for this model
    }
  );
};
