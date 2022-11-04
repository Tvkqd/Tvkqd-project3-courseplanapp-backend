module.exports = app => {
    const officeHour = require("../controllers/officeHour.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", officeHour.create);
    // Retrieve all 
    router.get("/", officeHour.findAll);
    // Retrieve a single officeHour with id
    router.get("/:id", officeHour.findOne);
    // Update with id
    router.put("/:id", officeHour.update);
    // Delete with id
    router.delete("/:id", officeHour.delete);
    //Changed to offceHour to build the api path to match the AWS server. Making router file unique by adding /courses
    app.use('/schedule-t1/officeHour', router);
  };