const dotenv = require("dotenv");
dotenv.config();

const db = require("./app/models");
const fs = require("fs");

// drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");

  // jsonImport("./seeder/province.json", db.province);
  // jsonImport("./seeder/regency.json", db.regency);
  // jsonImport("./seeder/district.json", db.district);
  // jsonImport("./seeder/village.json", db.village);

  addUser();
  addTutorial();
  // addComment();
});

function jsonImport(url, dbmodel) {
  const jsonData = fs.readFileSync(url, "utf8");
  const data = JSON.parse(jsonData);
  importData(data, dbmodel);
}

async function importData(products, dbmodel) {
  try {
    for (const productData of products) {
      await dbmodel.create(productData);
    }
    console.log("Data imported successfully.");
  } catch (error) {
    console.error("Error importing data:", error);
  } finally {
    // Close the Sequelize connection when done
    // db.sequelize.close();
  }
}

function addComment() {
  const comment = db.comments;
  for (let x = 0; x < 10; x++) {
    const payload = {
      name: "test",
      text: "Testt Comment " + x,
      tutorialId: x + 1,
      userId: x + 1,
    };
    comment.create(payload);
  }
}

function addTutorial() {
  const tutorial = db.tutorials;
  for (let x = 0; x < 10; x++) {
    const payload = {
      title: "Judul Tutorial " + x,
      description: "Description Tutorial " + x,
      published: true,
    };
    tutorial.create(payload);
  }
}

async function addUser() {
  try {
    const bcrypt = require("bcrypt");
    const User = db.users;
    for (let x = 0; x < 10; x++) {
      const hashedPassword = await bcrypt.hash("test123", 10);
      const payload = {
        name: "Ferenyr " + x,
        username: "ferenyr" + x,
        password: hashedPassword,
        roleId: 0,
      };
      User.create(payload);
    }
  } catch (error) {}
}
