module.exports = app => {
    const courses = require("../controllers/course.controller.js");
    var router = require("express").Router();
    const csvController = require("../controllers/csv.controller.js");
    const uploadCourses = require("../middlewares/uploadCourses");
    //const uploadSections = require("../middlewares/uploadSections");
    // Create 
    router.post("/", courses.create);
    // Retrieve all 
    router.get("/", courses.findAll);
    // Retrieve a single with id
    // Retrieve a single with course_number
    router.get("/:course_number", courses.findOne);
    // Retrieve a single with department
    router.get("/dept/:dept", courses.findDept);
    // Retrieve a single with name
    router.get("/name/:name", courses.findName);
    // Update with id
    router.put("/:id", courses.update);
    // Delete with id
    router.delete("/:id", courses.delete);
    // Upload courses file
    router.post("/upload/courses", uploadCourses.single("file"), csvController.uploadCourses);
    // Upload sections file
    //router.post("/upload/sections", uploadSections.single("file"), csvController.uploadSections);

    app.use('/schedule-t1', router);
  };