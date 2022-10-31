const db = require("../models");
const SectionTime = db.sectionTime;
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
    const sectionTime = {
        name: req.body.name
    };
    // Save in the database
    SectionTime.create(sectionTime)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the SectionTime."
        });
        });
};

// Retrieve all courses from the database.
exports.findAll = (req, res) => {
    SectionTime.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving SectionTime."
        });
      });
};

// Find a single course with a id
exports.findOne = (req, res) => {
    const id = req.params.id;
    SectionTime.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find SectionTime with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving SectionTime with id=" + id
        });
      });
};
// Update by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    SectionTime.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "SectionTime was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update SectionTime with id=${id}. Maybe SectionTime was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating SectionTime with id=" + id
        });
      });
};
// Delete with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    SectionTime.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "SectionTime was deleted successfully!"
          });
        } else {
          console.log("error: " + num)
          res.send({
            message: `Cannot delete SectionTime with id=${id}. Maybe SectionTime was not found!`
          });
        }
      })
      .catch(err => {
        console.log("error: " + err)
        res.status(500).send({
          message: "Could not delete SectionTime with id=" + id
        });
      });
};