const db = require("../models");
const Course = db.courses;
const SectionTime = db.sectionTime;
const Section = db.section;
const Semester = db.semester;
const Room = db.room;
const Faculty = db.faculty;
const FacultySection = db.facultySection;

const fs = require("fs");
const csv = require("fast-csv");

// Sections file sectionTime table
const uploadSections = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let sectionTimes = [];
    let facultySections = []
    let path = __basedir + "/resources/static/assets/uploads/sections/" + req.file.filename;

    new Promise((resolve, reject) => {
      const promises = [];
      async function processData(row){
        // Foreign key courseID
        let number = row["Course #"];
        if (number.length == 1){
          number = "000".concat(number);
        }
        else if (number.length == 2){
          number = "00".concat(number);
        }
        else if (number.length == 3){
          number = "0".concat(number);
        }
        number = row["Subject"].concat("-",number);
        const [course, createdCourse] = await Course.findOrCreate({
          where: { dept: row["Depts"], course_number: number, subject: row["Subject"], courseNum:row["Course #"], level: row["Crs Level"], hours: row["Min Cred"], name: row["Section Title"]},
        });
        console.log(course.id);
        console.log(createdCourse);
        // Foreign key semesterID
        const [semester, createdSemester] = await Semester.findOrCreate({
          where: { code: row["Term"]},
        });
        console.log(semester.id);
        console.log(createdSemester);
        // Foreign key sectionID
        const [section, createdSection] = await Section.findOrCreate({
          where: { number: row["Section Number"] || "", sectionNum: row["Section #"], courseId: course.id, semesterId: semester.id },
        });
        console.log(section.id);
        console.log(createdSection);
        // Foreign key roomID
        const [room, createdRoom] = await Room.findOrCreate({
          where: {bldg: row["Bldg1"], name: row["Room1"], number: row["Room1"].split("*")[1] || "" },
        });
        console.log(room.id);
        console.log(createdRoom);
        
        // LEC faculty
          let name = row["Faculty Name (LFM)"].split(", ");
        // Handle empty values
        let first = "";
        let middle = "";
        if (name[1]){
          first = name[1].split(" ")[0];
          middle = name[1].split(" ")[1] || "";
        }
          let last = name[0];
          console.log(first);
          console.log(last);
          // Foreign key faculty
          const [faculty, createdFaculty] = await Faculty.findOrCreate({
            where: {fName: first, lName: last, mName: middle},
          });
          console.log(faculty.id);
          console.log(createdFaculty);
  
          // Read data for facultySection table
          let faclRow = {facultyId: faculty.id, sectionId: section.id };
          facultySections.push(faclRow);
          console.log(faclRow);
       
        // Read data for sectionTime table
        let start =  row["Start Time 24hr"].split(", ");
        let end = row["End Time 24hr"].split(", ");
        let building = row["Bldg2"].split(", ");
        let location = row["Room"].split(", ");
        let method = row["Instr Method"].split(", ");
        let newRow = {startDate:row["Sec Start Date"] || "2000-01-01", endDate:row["Sec End Date"] || "2000-01-01", startTime:start[0] || "00:00:00", endTime:end[0] || "00:00:00", dayWeek:row["Days"], numWeek:row["Sec Num Of Weeks "] || 0, capacity:row["Capacity"] || 0, instrMethod:row["Instr Method"], sectionId:section.id, roomId:room.id}
        
        // Checking LEC, LAB
        if (start.length > 1){   
          // Foreign key sectionID
          const [section, createdSection] = await Section.findOrCreate({
            where: { number: row["Section Number"].concat("L") || "", sectionNum: row["Section #"], courseId: course.id, semesterId: semester.id },
          });
          console.log(section.id);
          console.log(createdSection);
          // Foreign key roomID
          const [room, createdRoom] = await Room.findOrCreate({
            where: {number: location[1] || "", bldg: building[1], name: building[1].concat("*",location[1])},
          });
          console.log(room.id);
          console.log(createdRoom);
          // LAB faculty
          let name = row["Faculty Name 2 (LFM)"].split(", ");
          let first = "";
          let middle = "";
          if (name[1]){
            first = name[1].split(" ")[0];
            middle = name[1].split(" ")[1] || "";
          }
          let last = name[0];
          // Foreign key faculty
          const [faculty, createdFaculty] = await Faculty.findOrCreate({
            where: {fName: first, lName: last, mName: middle},
          });
          console.log(faculty.id);
          console.log(createdFaculty);
  
          // Read data for facultySection table
          let faclRow = {facultyId: faculty.id, sectionId: section.id };
          facultySections.push(faclRow);
          console.log(faclRow);
          // Day week for Lab and Lec
          let days = row["Days"].split(" ");
          let day = days[days.length-1];
          let correctDay;
          if (day.charAt(0) != 'T' || day.charAt(1) != 'H'){
            correctDay = day.slice(1,days.length);
          }
          else{
            correctDay = day.slice(2, days.length);
          }
          newRow.dayWeek = row["Days"].slice(0, row["Days"].length - correctDay.length);
          newRow.instrMethod = method[0];
          // SectionTimes for LAB
          let newRow1 = {startDate:row["Sec Start Date"] || "2000-01-01", endDate:row["Sec End Date"] || "2000-01-01", startTime:start[1] || "00:00:00", endTime:end[1] || "00:00:00", dayWeek:correctDay, numWeek:row["Sec Num Of Weeks "] || 0, capacity:row["Capacity"] || 0, instrMethod:method[1], sectionId:section.id, roomId:room.id};
          console.log(newRow1);
          sectionTimes.push(newRow1);
        }
        // SectionTimes for LEC
        console.log(newRow);
        sectionTimes.push(newRow);
      }
      fs.createReadStream(path)
        .pipe(csv.parse({ headers: ["Term","Synonym","UG/GR","Section Number","Subject","Course #","Section #","Crs Level","Course Type","Reg Restrictions","Bldg1","Room1","Section Title","Faculty Name (LFM)","Faculty Name 2 (LFM)","Sec Start Date","Meeting Start Date","Sec End Date","Meeting End Date","Start Time1","End Time1","Days","Sec Num Of Weeks ","Min Cred","Max Cred","Capacity","Enr Count","Wait","Depts","Divisions","College","Faculty name Name","Faculty First Name","Instr Method","Sun","Mon","Tue","Wed","Thu","Fri","Sat","SEC.XLIST","SEC.FEE","Primary Section ","SEC.COMMENTS","SEC.PRINTED.COMMENTS","Academic Year","Term Sort No","Only Pass/NoPass","Allow Pass/NoPass","Bldg2","Room","Start Date","End Date","Start Time2","Start Time 24hr","End Time2","End Time 24hr"], renameHeaders:true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", row => promises.push(processData(row)))
        .on("error", reject)
        .on("end", async () => {
          await Promise.all(promises);
          resolve();
          //console.log(sectionTimes)
          await SectionTime.bulkCreate(sectionTimes)
          await FacultySection.bulkCreate(facultySections)
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
    });
    // fs.createReadStream(path)
    //   .pipe(csv.parse({ headers: ["Term","Synonym","UG/GR","Section Number","Subject","Course #","Section #","Crs Level","Course Type","Reg Restrictions","Bldg1","Room1","Section Title","Faculty Name (LFM)","Faculty Name 2 (LFM)","Sec Start Date","Meeting Start Date","Sec End Date","Meeting End Date","Start Time1","End Time1","Days","Sec Num Of Weeks ","Min Cred","Max Cred","Capacity","Enr Count","Wait","Depts","Divisions","College","Faculty name Name","Faculty First Name","Instr Method","Sun","Mon","Tue","Wed","Thu","Fri","Sat","SEC.XLIST","SEC.FEE","Primary Section ","SEC.COMMENTS","SEC.PRINTED.COMMENTS","Academic Year","Term Sort No","Only Pass/NoPass","Allow Pass/NoPass","Bldg2","Room","Start Date","End Date","Start Time2","Start Time 24hr","End Time2","End Time 24hr"], renameHeaders:true }))
    //   .on("error", (error) => {
    //     throw error.message;
    //   })
    //   .on("data", async (row) => {
    //     // Foreign key courseID
    //     console.log(row);
    //     const [course, createdCourse] = await Course.findOrCreate({
    //       where: { dept: row["Depts"], subject: row["Subject"], courseNum:row["Course #"]},
    //     });
    //     console.log(course.id);
    //     console.log(createdCourse);
    //     // Foreign key semesterID
    //     const [semester, createdSemester] = await Semester.findOrCreate({
    //       where: { code: row["Term"]},
    //     });
    //     console.log(semester.id);
    //     console.log(createdSemester);
    //     // Foreign key sectionID
    //     const [section, createdSection] = await Section.findOrCreate({
    //       where: { number: row["Section Number"], subject: row["Subject"], courseNum:row["Course #"], sectionNum: row["Section #"], title: row["Section Title"], courseId: course.id, semesterId: semester.id },
    //     });
    //     console.log(section.id);
    //     console.log(createdSection);
    //     // Foreign key roomID
    //     const [room, createdRoom] = await Room.findOrCreate({
    //       where: {bldg: row["Bldg1"], name: row["Room1"] },
    //     });
    //     console.log(room.id);
    //     console.log(createdRoom);
    //     // Read data for sectionTime table
    //     let newRow = {startDate:row["Sec Start Date"], endDate:row["Sec End Date"], startTime:row["Start Time 24hr"], endTime:row["End Time 24hr"], dayWeek:row["Days"], numWeek:row["Sec Num Of Weeks "], capacity:row["Capacity"], instrMethod:row["Instr Method"], sectionId:section.id, roomId:room.id}
    //     console.log(newRow);
    //     sectionTimes.push(newRow);
    //     console.log(sectionTimes);
    //   })
      
    //   .on("end", async () => {
    //     console.log(sectionTimes)
    //     await SectionTime.bulkCreate(sectionTimes)
    //       .then(() => {
    //         res.status(200).send({
    //           message:
    //             "Uploaded the file successfully: " + req.file.originalname,
    //         });
    //       })
    //       .catch((error) => {
    //         res.status(500).send({
    //           message: "Fail to import data into database!",
    //           error: error.message,
    //         });
      //     });
      // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};


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
        let newRow = {dept:row["Department"], course_number:row["Course"], subject:row["Subject"],courseNum:row["Course No"], level:row["Course Levels"], hours:row["Min Credits"], name:row["Short Title"], description:row["Description"]}
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
  getCourses,
  uploadSections
};