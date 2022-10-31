const db = require("../models");
const Course = db.courses;

const fs = require("fs");
const csv = require("fast-csv");

// Courses file
const uploadCourses = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let courses = [];
    let path = __basedir + "/resources/static/assets/uploads/courses/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        let newRow = {dept:row["Department"], course_number:row["Course"], level:row["Course Levels"], hours:row["Min Credits"], name:row["Short Title"], description:row["Description"]}
        console.log(newRow);
        courses.push(newRow);
        console.log(courses);
      })
      .on("end", () => {
        Course.bulkCreate(courses)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getCourses = (req, res) => {
  Course.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses.",
      });
    });
};

module.exports = {
  uploadCourses,
  getCourses
};