module.exports = app => {
    const faculty = require("../controllers/faculty.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", faculty.create);
    // Retrieve all 
    router.get("/", faculty.findAll);
    // Retrieve a single faculty with id
    router.get("/:id", faculty.findOne);
    // Update with id
    router.put("/:id", faculty.update);
    // Delete with id
    router.delete("/:id", faculty.delete);
    //Changed to schedule to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/faculty', router);
  };