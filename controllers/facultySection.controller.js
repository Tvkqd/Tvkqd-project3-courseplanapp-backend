//ASK ANDREW
const db = require("../models");
const FacultySection = db.facultySection;
const Op = db.Sequelize.Op;
// Create and Save 
exports.create = (req, res) => {
        // Validate input
    if (!req.body.name) {
        res.status(400).send({
        message: "Name can not be empty!"
        });
        return;
    }
    // Create
    const facultySection = {
        name: req.body.name
    };
    // Save in the database
    FacultySection.create(facultySection)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the FacultySection."
        });
        });
};

// Retrieve all courses from the database.
exports.findAll = (req, res) => {
    FacultySection.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving FacultySection."
        });
      });
};

// Find a single course with a id
exports.findOne = (req, res) => {
    const id = req.params.id;
    FacultySection.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find FacultySection with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving FacultySection with id=" + id
        });
      });
};
// Update by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    FacultySection.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "FacultySection was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update FacultySection with id=${id}. Maybe FacultySection was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating FacultySection with id=" + id
        });
      });
};
// Delete with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    FacultySection.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Faculty was deleted successfully!"
          });
        } else {
          console.log("error: " + num)
          res.send({
            message: `Cannot delete Faculty with id=${id}. Maybe FacultySection was not found!`
          });
        }
      })
      .catch(err => {
        console.log("error: " + err)
        res.status(500).send({
          message: "Could not delete FacultySection with id=" + id
        });
      });
};