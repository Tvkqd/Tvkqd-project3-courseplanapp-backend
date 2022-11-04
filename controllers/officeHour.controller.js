const db = require("../models");
const OfficeHour = db.officeHour;
const Op = db.Sequelize.Op;
// Create and Save 
exports.create = (req, res) => {
        // Validate input
    // if (!req.body.name) {
    //     res.status(400).send({
    //     message: "Name can not be empty!"
    //     });
    //     return;
    // }
    // Create
    const officeHour = {
        name: req.body.name
    };
    // Save in the database
    OfficeHour.create(officeHour)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the OfficeHour."
        });
        });
};

// Retrieve all courses from the database.
exports.findAll = (req, res) => {
    OfficeHour.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving officeHour."
        });
      });
};

// Find a single course with a id
exports.findOne = (req, res) => {
    const id = req.params.id;
    OfficeHour.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find OfficeHour with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving OfficeHour with id=" + id
        });
      });
};
// Update by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    OfficeHour.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "OfficeHour was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update OfficeHour with id=${id}. Maybe OfficeHour was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating OfficeHour with id=" + id
        });
      });
};
// Delete with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    OfficeHour.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "OfficeHour was deleted successfully!"
          });
        } else {
          console.log("error: " + num)
          res.send({
            message: `Cannot delete OfficeHour with id=${id}. Maybe OfficeHour was not found!`
          });
        }
      })
      .catch(err => {
        console.log("error: " + err)
        res.status(500).send({
          message: "Could not delete OfficeHour with id=" + id
        });
      });
};