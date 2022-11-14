const db = require("../models");
const SectionTime = db.sectionTime;
const Section = db.section;
const Room = db.room;
const Op = db.Sequelize.Op;
// Create and Save 
exports.create = (req, res) => {
        // Validate input
    if (!req.body.startDate) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    // Create
    const sectionTime = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        dayWeek: req.body.dayWeek,
        numWeek: req.body.numWeek,
        capacity: req.body.capacity,
        instrMethod: req.body.instrMethod,
        sectionId: req.body.sectionId,
        roomId: req.body.roomId
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

// Retrieve all from the database.
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

// Find a single with a id
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

// Find sectionTime of a room with an id
exports.findRoomSectiontime = (req, res) => {
  const id = req.params.id;
  Room.findByPk(id, {include: ["sectionTime"]})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find sectionTime of Room with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving sectionTime of Room with id=" + id
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