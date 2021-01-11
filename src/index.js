import app from "./server.js";
import("./database.js");

// Server is listening
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
