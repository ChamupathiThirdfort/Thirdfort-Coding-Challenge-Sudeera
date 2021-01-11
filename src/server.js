import express from "express";
import bodyParser from "body-parser";

import noteRoute from "./routes/note.routes.js";
import userRoute from "./routes/user.routes.js";

// Initializations
const app = express();

// Parse application/json
app.use(bodyParser.json());

// Settings
app.set("port", process.env.PORT);

// Routes
app.use("/api/user", userRoute);
app.use("/api/note", noteRoute);

// Data Validation Custom Response
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      errors: err.error.details.map((error) => {
        return {
          key: error.path[0],
          message: error.message,
        };
      }),
      message: "Data Validation Failed",
      success: false,
    });
  } else {
    next(err);
  }
});

// Not Found
app.use((req, res) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end("Not Found");
});

export default app;
