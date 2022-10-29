const db = require("../models");
const Semester = db.semester;
const Op = db.Sequelize.Op;
// Create and Save 
exports.create = (req, res) => {
        // Validate input
    if (!req.body.code) {
        res.status(400).send({
        message: "Code can not be empty!"
        });
        return;
    }
    else if(!req.body.startDate) {
      res.status(400).send({
      message: "StartDate can not be empty!"})
      return;
    }
    else if(!req.body.endDate) {
      res.status(400).send({
      message: "EndDate can not be empty!"})
      return;
    }

    // Create
    const semester = {
        name: req.body.name
    };
    // Save in the database
    Semester.create(semester)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Semester."
        });
        });
};

// Retrieve all courses from the database.
exports.findAll = (req, res) => {
    Semester.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving semester."
        });
      });
};

// Find a single course with a id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Semester.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Semester with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Semester with id=" + id
        });
      });
};
// Update by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Semester.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Semester was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Semester with id=${id}. Maybe Semester was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Semester with id=" + id
        });
      });
};
// Delete with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Semester.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Semester was deleted successfully!"
          });
        } else {
          console.log("error: " + num)
          res.send({
            message: `Cannot delete Semester with id=${id}. Maybe Semester was not found!`
          });
        }
      })
      .catch(err => {
        console.log("error: " + err)
        res.status(500).send({
          message: "Could not delete Semester with id=" + id
        });
      });
};