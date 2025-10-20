const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const { initialDatabase } = require("./db.connect/db.connect");
initialDatabase();

const jobRoutes = require("./routes/job.routes");

app.use("/", jobRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
