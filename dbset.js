const db = require("./app/models");
// drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  addUser();
  addTutorial();
  addComment();
});

function addComment() {
  const comment = db.comments;
  for (let x = 0; x < 10; x++) {
    const payload = {
      name: "test",
      text: "Testt Comment " + x,
      tutorialId: x + 1,
      userId: x + 1,
    };
    comment
      .create(payload)
      .then((data) => {})
      .catch((err) => {});
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
    tutorial
      .create(payload)
      .then((data) => {})
      .catch((err) => {});
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
    User.create(payload)
      .then((data) => {})
      .catch((err) => {});
  }
}
