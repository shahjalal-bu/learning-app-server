const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/courses.controller");
// const { varifyJWT, verifyAdmin } = require("../middlewares/middlewares");
router.get("/", coursesController.findAll);
router.get("/:courseId", coursesController.find);
router.post("/", coursesController.addCourse);
router.put("/enroll", coursesController.enrollCourse);
module.exports = router;
