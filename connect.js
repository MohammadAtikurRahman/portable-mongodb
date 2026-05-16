const { startDatabase } = require("./db-config/main_connection");

startDatabase("Test-Database")
  .then(() => {

    console.log("Database Ready");

  })
  .catch((err) => {

    console.error("Database Error:", err);

  });