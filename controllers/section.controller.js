const db = require("../models");
const Section = db.section;
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
    const section = {
        name: req.body.name
    };
    // Save in the database
    Section.create(section)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Section."
        });
        });
};

// Retrieve all courses from the database.
exports.findAll = (req, res) => {
    Section.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Section."
        });
      });
};

// Find a single course with a id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Section.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Section with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Section with id=" + id
        });
      });
};
// Update by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Section.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Section was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Section with id=${id}. Maybe Section was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Section with id=" + id
        });
      });
};
// Delete with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Section.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Section was deleted successfully!"
          });
        } else {
          console.log("error: " + num)
          res.send({
            message: `Cannot delete Section with id=${id}. Maybe Section was not found!`
          });
        }
      })
      .catch(err => {
        console.log("error: " + err)
        res.status(500).send({
          message: "Could not delete Section with id=" + id
        });
      });
};