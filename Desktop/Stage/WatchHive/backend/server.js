const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WatchHive API running");
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});
