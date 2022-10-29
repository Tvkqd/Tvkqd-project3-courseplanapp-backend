const db = require("../models");
const Course = db.courses;
const Op = db.Sequelize.Op;
// Create and Save 
exports.create = (req, res) => {
        // Valcourse_numberate request
    if (!req.body.course_number) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    // Create
    const course = {
        dept: req.body.dept,
        description: req.body.description,
        course_number: req.body.course_number,
        level: req.body.level,
        hours: req.body.hours,
        name: req.body.name
    };
    // Save in the database
    Course.create(course)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Course."
        });
        });
};

// Retrieve all courses from the database.
exports.findAll = (req, res) => {
    const course_number = req.query.course_number;
    var condition =course_number ? {course_number: { [Op.like]: `%$course_number}%` } } : null;
    Course.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving courses."
        });
      });
};

// Retrieve all courses from the database in a specific department.
exports.findDept = (req, res) => {
  const dept = req.params.dept;
  Course.findAll({ where: {dept: dept} })
      .then(data => {
      res.send(data);
      })
      .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving courses."
      });
    });
};

// Retrieve all courses from the database with a specific title.
exports.findName = (req, res) => {
  const name = req.params.name;
  Course.findAll({ where: {name: {[Op.substring]: name}} })
      .then(data => {
      res.send(data);
      })
      .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving courses."
      });
    });
};

// Find a single course with a course_number
exports.findOne = (req, res) => {
    const course_number = req.params.course_number;
    Course.findByPk(course_number)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Course with course_number=${course_number}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Course with course_number=" + course_number
        });
      });
};
// Update by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Course.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Course was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Course with id=" + id
        });
      });
};
// Delete with the specified course_number in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Course.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Course was deleted successfully!"
          });
        } else {
          console.log("error: " + num)
          res.send({
            message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
          });
        }
      })
      .catch(err => {
        console.log("error: " + err)
        res.status(500).send({
          message: "Could not delete Course with id=" + id
        });
      });
};