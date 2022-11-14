const db = require("../models");
const SpecialList = db.specialList;
const User = db.user;
const Course = db.courses;
const Op = db.Sequelize.Op;
// Create and Save 
exports.create = (req, res) => {
        // Validate input
    if (!req.body.name) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    // Create
    const specialList = {
        name: req.body.name,
        userId: req.body.userId,
        courseId: req.body.courseId
    };
    // Save in the database
    SpecialList.create(specialList)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the SpecialList."
        });
        });
};

// Retrieve all specialLists from the database.
exports.findAll = (req, res) => {
    SpecialList.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving specialList."
        });
      });
};

// Find a single specialList with a id
exports.findOne = (req, res) => {
    const id = req.params.id;
    SpecialList.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find SpecialList with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving SpecialList with id=" + id
        });
      });
};

// Find SpecialList of a user with an id
exports.findUserSpeciallist = (req, res) => {
  const id = req.params.id;
  User.findByPk(id, {include: ["specialList"]})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find SpecialList of a user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SpecialList of a user with id=" + id
      });
    });
};

// Find SpecialList of a course with an id
exports.findCourseSpeciallist = (req, res) => {
  const id = req.params.id;
  Course.findByPk(id, {include: ["specialList"]})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find SpecialList of a course with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SpecialList of a course with id=" + id
      });
    });
};


// Update by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    SpecialList.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "SpecialList was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update SpecialList with id=${id}. Maybe SpecialList was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating SpecialList with id=" + id
        });
      });
};
// Delete with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    SpecialList.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "SpecialList was deleted successfully!"
          });
        } else {
          console.log("error: " + num)
          res.send({
            message: `Cannot delete SpecialList with id=${id}. Maybe SpecialList was not found!`
          });
        }
      })
      .catch(err => {
        console.log("error: " + err)
        res.status(500).send({
          message: "Could not delete SpecialList with id=" + id
        });
      });
};