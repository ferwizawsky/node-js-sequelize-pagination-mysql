const db = require("./app/models");
const fs = require("fs");

// drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");

  // const sqlFilePath = "./indonesia.sql";
  // importSQLFile(sqlFilePath);

  addUser();
  addTutorial();
  addComment();
});

// Function to import SQL file
async function importSQLFile(filePath) {
  try {
    const sql = fs.readFileSync(filePath, "utf8");
    await db.sequelize.query(sql);
    console.log("Database imported successfully");
  } catch (error) {
    console.error("Error importing database:", error);
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

function addUser() {
  const User = db.users;
  for (let x = 0; x < 10; x++) {
    const payload = {
      name: "Ferenyr " + x,
      username: "ferenyr" + x,
      password: "test123",
    };
    User.create(payload);
  }
}
