const db = require("../db");
const helper = require("../helper/helper");
exports.fetchTagList = (req, res) => {
  db.query("SELECT GROUP_CONCAT(tagName) AS tags FROM tags", (err, result) => {
    if (err) {
      helper.responseSender(res, 200, "fail", "something went wrong", []);
    } else {
      result = convertTagsToArray(result[0].tags);
      helper.responseSender(res, 200, "success", "data found", result);
    }
  });
};

const convertTagsToArray = (tags) => {
  return tags.split(",").map((tag) => tag.trim());
};
