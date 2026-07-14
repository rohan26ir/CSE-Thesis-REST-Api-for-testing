const app = require("./src/app")
const conectDB = require("./src/db/db")
// require("dotenv").config();

conectDB()


app.listen(3000, () => {
  console.log("Surver is Running Port 3000");
});
