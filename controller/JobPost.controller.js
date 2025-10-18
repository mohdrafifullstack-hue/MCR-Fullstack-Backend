const Job = require("../models/job.model");
const Detail = require("../models/detail.model");

const jobPost = async (req, res) => {
  try {
    const {
      title,
      name,
      location,
      jobType,
      salary,
      description,
      qualification,
    } = req.body;
    if (
      !title ||
      !name ||
      !location ||
      !jobType ||
      !salary ||
      !description ||
      !qualification
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const job = new Job({ title, name, location, jobType });
    const savedJob = await job.save();

    const jobDetail = new Detail({
      job: savedJob._id,
      salary,
      description,
      qualification,
    });
    const savedDetail = await jobDetail.save();
    const details = await savedDetail.populate("job");
    res.status(201).json({ message: "Job post create successfull", details });
  } catch (error) {
    console.log(`Error message ${error.message}`);
    res.status(500).json({ error: "Server error" });
  }
};

const jobList = async (req, res) => {
  try {
    const job = await Detail.find().populate("job");
    res.status(200).json({ message: "All jobs are fetch successfuly", job });
  } catch (error) {
    console.log(`Error message ${error.message}`);
    res.status(500).json({ error: "Server error while fetching all jobs." });
  }
};

const jobDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await Detail.findById(id);
    if (!detail) {
      return res.status(400).json({ error: "Detail not found" });
    }
    await Detail.findByIdAndDelete(id);
    await Job.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Job and its details delete successfully" });
  } catch (error) {
    console.log(`error message ${error.message}`);
    res.status(500).json({ error: "Server Error" });
  }
};

const jobSearch = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ error: "Title query is required" });
    }
    const job = await Job.find({title:{ $regex: title, $options: "i"}})
    const jobId = job.map((item) => item._id)
    const jobDetail = await Detail.find({job:{$in:jobId}}).populate("job")

    res
      .status(200)
      .json({ message: "Job search by title successful", jobDetail });
  } catch (error) {
    console.error(`Error message: ${error.message}`);
    res.status(500).json({ error: "Server error while fetching job serach" });
  }
};

module.exports = { jobPost, jobList, jobDelete, jobSearch };
