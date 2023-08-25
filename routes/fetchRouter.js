const express = require("express");
const router = express.Router();
const fetch = require("../controllers/fetchDataController");
router.get("/tag-list", fetch.fetchTagList);

module.exports = router;
