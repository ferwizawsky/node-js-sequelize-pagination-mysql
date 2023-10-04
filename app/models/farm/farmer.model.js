module.exports.farmer = (sequelize, Sequelize) => {
  return sequelize.define("farmer", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    gender: {
      type: Sequelize.STRING,
    },
    total: {
      type: Sequelize.INTEGER,
    },
    year: {
      type: Sequelize.INTEGER,
    },
  });
};

module.exports.land = (sequelize, Sequelize) => {
  return sequelize.define("land", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    total: {
      type: Sequelize.INTEGER,
    },
    year: {
      type: Sequelize.INTEGER,
    },
  });
};

module.exports.farmerGroup = (sequelize, Sequelize) => {
  return sequelize.define("farmerGroup", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    name: {
      type: Sequelize.STRING,
    },
    noReg: {
      type: Sequelize.STRING,
    },
    leader: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.STRING,
    },
  });
};

module.exports.plant = (sequelize, Sequelize) => {
  return sequelize.define("plant", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
};

module.exports.plantData = (sequelize, Sequelize) => {
  return sequelize.define("plantData", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    name: {
      type: Sequelize.STRING,
    },
    total: {
      type: Sequelize.INTEGER,
    },
  });
};
