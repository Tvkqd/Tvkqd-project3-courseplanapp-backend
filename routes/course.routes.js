module.exports = app => {
    const course = require("../controllers/course.controller.js");
    var router = require("express").Router();
    const csvController = require("../controllers/csv.controller.js");
    const uploadCourses = require("../middlewares/uploadCourses");
    // Create 
    router.post("/", course.create);
    // Retrieve all 
    router.get("/", course.findAll);
    // Retrieve a single with id
    router.get("/:id", course.findOne);
    // Retrieve a single with department
    router.get("/dept/:dept", course.findDept);
    // Retrieve a single with name
    router.get("/name/:name", course.findName);
    // Update with id
    router.put("/:id", course.update);
    // Delete with id
    router.delete("/:id", course.delete);
    // Upload courses file
    router.post("/upload/courses", uploadCourses.single("file"), csvController.uploadCourses);
     //Changed to schedule to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/course', router);
  };