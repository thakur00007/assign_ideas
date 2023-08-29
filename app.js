const express = require("express");
const cors = require("cors");
const app = express();
const auth = require("./routes/authROuter");
const idea = require("./routes/ideaRoutes");
const fetch = require("./routes/fetchRouter");
app.use(cors());
app.use(express.json());
const defaultRoute = "/api/v1"
app.use(defaultRoute+"/auth", auth);
app.use(defaultRoute+"/ideas", idea);
app.use(defaultRoute+"/fetch", fetch);

app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: "Not Found!",
  });
});
module.exports = app;
