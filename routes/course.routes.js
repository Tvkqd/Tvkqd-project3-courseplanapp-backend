module.exports = app => {
    const courses = require("../controllers/course.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", courses.create);
    // Retrieve all 
    router.get("/", courses.findAll);
    // Retrieve a single with id
    router.get("/:id", courses.findOne);
    // Retrieve a single with department
    router.get("/dept/:dept", courses.findDept);
    // Retrieve a single with name
    router.get("/name/:name", courses.findName);
    // Update with id
    router.put("/:id", courses.update);
    // Delete with id
    router.delete("/:id", courses.delete);
    //Changed to schedule to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/courses', router);
  };