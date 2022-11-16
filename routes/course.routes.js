module.exports = app => {
    const course = require("../controllers/course.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
    // Create 
    router.post("/", [authenticate], course.create);
    // Retrieve all 
    router.get("/", [authenticate], course.findAll);
    // Retrieve a single with id
    router.get("/:id", [authenticate], course.findOne);
    // Retrieve a single with department
    router.get("/dept/:dept", [authenticate], course.findDept);
    // Retrieve a single with name
    router.get("/name/:name", [authenticate], course.findName);
    // Update with id
    router.put("/:id", [authenticate], course.update);
    // Delete with id
    router.delete("/:id", [authenticate], course.delete);
    //Changed to schedule to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/course', router);
  };