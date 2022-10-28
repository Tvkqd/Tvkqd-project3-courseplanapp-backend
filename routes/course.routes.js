module.exports = app => {
  var router = require("express").Router();
  const csvController = require("../controllers/csv.controller.js");
  const upload = require("../middlewares/upload");

  router.post("/upload", upload.single("file"), csvController.upload);
  router.get("/courses", csvController.getCourses);

  app.use('/schedule-t1', router);
};