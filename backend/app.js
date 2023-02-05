const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "https://media-tracker-4aje.onrender.com",
    ],
  })
);

async function start() {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((err) => console.log(err));

    console.log(`MongoDB connection established ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
start();

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
