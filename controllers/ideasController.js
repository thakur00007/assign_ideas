const db = require("../db");
const helper = require("../helper/helper");
const Idea = require("../model/ideaModel");
exports.fetchAll = (req, res) => {
  let idea = new Idea();
  db.query(idea.fetchAll("ideas"), (err, result) => {
    if (err) {
      res.status(200).json({
        status: "fail",
        message: "something went wrong",
        data: [],
      });
    } else if (result.length === 0) {
      res.status(200).json({
        status: "success",
        message: "no data found",
        data: [],
      });
    } else {
      result[0].forEach((obj) => {
        if (obj.tags !== null) {
          obj.tags = convertTagsToArray(obj.tags);
        }
      });
      res.status(200).json({
        status: "success",
        message: "data found",
        data: result[0],
      });
    }
  });
};
// }

exports.ideaUpload = (req, res) => {
  if (!helper.verifyLoggedIn(req)) {
    res.status(403).json({
      status: "fail",
      message: "Unauthrorised Login",
      data: [],
    });
    return;
  } else {
    const obj = req.body.data;
    // console.log(obj);
    if (obj === null || obj === {} || obj === undefined) {
      res.status(200).json({
        status: "fail",
        message: "data object is empty",
        data: [],
      });
    } else if (
      !helper.dataValidator(obj.title) &&
      !helper.dataValidator(obj.description)
    ) {
      if (obj.tags) {
        if (obj.tags.length > 0) {
          var isOk = false;
          obj.tags.forEach((elem) => {
            if (helper.dataValidator(elem)) {
              res.status(200).json({
                status: "fail",
                message: "invalid tag name",
                data: [],
              });
              isOk = false;
              return;
            }
            isOk = true;
          });

          if (isOk) {
            const uploadData = {
              title: obj.title,
              description: obj.description,
              userEmail: req.body.auth.email,
            };
            // console.log(uploadData);
            let idea = new Idea();
            db.query(idea.insertIdea("ideas", uploadData), (err, result) => {
              if (err) {
                // console.log(err);
                res.status(200).json({
                  status: "fail",
                  message: "something went wrong",
                  data: [],
                });
              } else {
                (async () => {
                  try {
                    const promises = obj.tags.map(async (tag) => {
                      try {
                        await new Promise((resolve, reject) => {
                          db.query(
                            "INSERT INTO tagmaping (tagId, ideaId) VALUES((SELECT id FROM tags WHERE tagName = ?), ?)",
                            [tag, result.insertId],
                            (err, result) => {
                              if (err) {
                                reject(err);
                              } else {
                                resolve(result);
                              }
                            }
                          );
                        });
                      } catch (error) {
                        throw error;
                      }
                    });

                    await Promise.all(promises);
                    // console.log(87897897);
                    res.status(200).json({
                      status: "success",
                      message: "Assigned Successfully",
                      data: [],
                    });
                  } catch (error) {
                    res.status(200).json({
                      status: "fail",
                      message: "something went wrong",
                      data: [],
                    });
                  }
                })();
              }
            });
          }
        } else {
          res.status(200).json({
            status: "fail",
            message: "tags name not provided",
            data: [],
          });
        }
      } else {
        const uploadData = {
          title: obj.title,
          description: obj.description,
          userEmail: req.body.auth.email,
        };
        // console.log(uploadData);
        let idea = new Idea();
        db.query(idea.insertIdea("ideas", uploadData), (err, result) => {
          if (err) {
            // console.log(err);
            res.status(200).json({
              status: "fail",
              message: "something went wrong",
              data: [],
            });
          } else {
            res.status(200).json({
              status: "success",
              message: "Assigned Successfully",
              data: result,
            });
          }
        });
      }
    } else {
      res.status(200).json({
        status: "fail",
        message: "invalid data ",
        data: [],
      });
    }
  }
};

const convertTagsToArray = (tags) => {
  return tags.split(",").map((tag) => tag.trim());
};
