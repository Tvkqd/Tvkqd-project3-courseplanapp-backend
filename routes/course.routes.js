module.exports = app => {
    const course = require("../controllers/course.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/course/", course.create);
    // Retrieve all 
    router.get("/course/", course.findAll);
    // Retrieve a single with id
    // Retrieve a single with course_number
    router.get("/course/:course_number", course.findOne);
    // Retrieve a single with department
    router.get("/course/dept/:dept", course.findDept);
    // Retrieve a single with name
    router.get("/course/name/:name", course.findName);
    // Update with id
    router.put("/course/:id", course.update);
    // Delete with id

    router.delete("/course/:id", course.delete);
    // Upload course file
    // router.post("/upload/course", uploadCourses.single("file"), csvController.uploadCourses);
    
    app.use('/schedule-t1', router);

  };