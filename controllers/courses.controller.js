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

module.exports.enrollCourse = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const userEmail = req.body.userEmail;
    //enroll course by course id
    const course = await coursesCollection.findOne({
      _id: new ObjectId(courseId),
    });
    if (!course) {
      console.error(`Course with ID ${courseId} not found.`);
      return;
    }
    await coursesCollection.updateOne(
      { _id: ObjectId(courseId) },
      { $addToSet: { enrolledUsers: userEmail } }
    );
    // Add the course's ID to the user's enrolledCourses array
    await usersCollection.updateOne(
      { email: userEmail },
      { $addToSet: { enrolledCourses: new ObjectId(courseId) } }
    );
    res.send(
      `User with email ${userEmail} enrolled in course with ID ${courseId}`
    );
  } catch (error) {
    res.status(500).send("Error retrieving user with enrolled course");
  }
};
