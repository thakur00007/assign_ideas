const express = require("express");
const router = express.Router();
const idea = require("../controllers/ideasController");
router.get("/", idea.fetchAll);
router.post("/", idea.ideaUpload);
module.exports = router;
