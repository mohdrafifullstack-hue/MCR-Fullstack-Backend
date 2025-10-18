const express = require("express");
const router = express.Router();

const {
  jobPost,
  jobList,
  jobDelete,
  jobSearch,
} = require("../controller/JobPost.controller");

router.post("/job", jobPost);
router.get("/job", jobList);
router.get("/job/search", jobSearch);
router.delete("/job/:id", jobDelete);

module.exports = router;
