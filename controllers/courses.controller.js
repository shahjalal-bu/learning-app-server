const { usersCollection, coursesCollection } = require("../db");
const { ObjectId } = require("mongodb");

module.exports.findAll = async (req, res) => {
  try {
    const courses = await coursesCollection.find().toArray();
    if (courses.length === 0) {
      return res.status(404).send("courses not found");
    }
    res.send(courses);
  } catch (error) {
    res.status(500).send("Error retrieving user with classes");
  }
};

module.exports.find = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const courses = await coursesCollection
      .find({ _id: new ObjectId(courseId) })
      .toArray();
    if (courses.length === 0) {
      return res.status(404).send("courses not found");
    }
    res.send(courses);
  } catch (error) {
    res.status(500).send("Error retrieving user with classes");
  }
};
module.exports.addCourse = async (req, res) => {
  try {
    const newCourse = req.body;
    const insertedCourse = await coursesCollection.insertOne(newCourse);
    res.send({
      course: insertedCourse,
    });
  } catch (error) {
    res.status(500).send("Error retrieving user with course");
  }
};

//enroll a user
module.exports.enrollCourse = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const userEmail = req.body.userEmail;
    // Enroll the user in the course by courseId
    const course = await coursesCollection.findOne({
      _id: new ObjectId(courseId),
    });
    if (!course) {
      console.error(`Course with ID ${courseId} not found.`);
      return res.status(404).send("Course not found");
    }
    // Update the course's enrolledUsers array
    await coursesCollection.updateOne(
      { _id: new ObjectId(courseId) },
      { $addToSet: { enrolledUsers: userEmail } }
    );
    // Update the user's enrolledCourses array
    await usersCollection.updateOne(
      { email: userEmail },
      { $addToSet: { enrolledCourses: new ObjectId(courseId) } }
    );
    // Send a success response
    res.send(
      `User with email ${userEmail} enrolled in course with ID ${courseId}`
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error enrolling user in course"); // Send a 500 response for errors
  }
};
//add syllabus
module.exports.addSyllabus = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await coursesCollection.findOne({
      _id: new ObjectId(courseId),
    });
    if (!course) {
      console.error(`Course with ID ${courseId} not found.`);
      return res.status(404).send("Course not found");
    }
    // Update the course's syllabus array
    await coursesCollection.updateOne(
      { _id: new ObjectId(courseId) },
      { $addToSet: { syllabus: req.body } }
    );
    // Send a success response
    res.send(`Syllabus added in course with ID ${courseId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding syllabus in course");
  }
}; //add syllabus
module.exports.addSyllabus = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await coursesCollection.findOne({
      _id: new ObjectId(courseId),
    });
    if (!course) {
      console.error(`Course with ID ${courseId} not found.`);
      return res.status(404).send("Course not found");
    }
    // Update the course's syllabus array
    await coursesCollection.updateOne(
      { _id: new ObjectId(courseId) },
      { $addToSet: { syllabus: req.body } }
    );
    // Send a success response
    res.send(`Syllabus added in course with ID ${courseId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding syllabus in course");
  }
};

//add syllabus
module.exports.addContent = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await coursesCollection.findOne({
      _id: new ObjectId(courseId),
    });
    if (!course) {
      console.error(`Course with ID ${courseId} not found.`);
      return res.status(404).send("Course not found");
    }
    // Update the course's syllabus array
    await coursesCollection.updateOne(
      { _id: new ObjectId(courseId) },
      { $addToSet: { contents: req.body } }
    );
    // Send a success response
    res.send(`Content added in course with ID ${courseId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding content in course");
  }
};
