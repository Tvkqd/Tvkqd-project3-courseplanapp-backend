module.exports = app => {
    var router = require("express").Router();
    const csvController = require("../controllers/csv.controller.js");
    const uploadCourses = require("../middlewares/uploadCourses");
    const uploadSections = require("../middlewares/uploadSections");
    const { authenticate } = require("../authorization/authorization.js");
 
    // Upload courses file
    router.post("/courses",[authenticate], uploadCourses.single("file"), csvController.uploadCourses);
    // Upload sections file
    router.post("/sections",[authenticate], uploadSections.single("file"), csvController.uploadSections);

    app.use('/schedule-t1/upload', router);
  };