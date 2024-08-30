import express from "express";
import sequelize from "./config/database.js";
import cors from "cors";

import { errorHandler } from "./middlewares/errorHandler.js";
import routes from "./routes/index.routes.js";

const app = express();

// Applying middleware
app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5174"],
      credentials: true,
    })
  )
  .use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World! You should not be here.");
});

// Routes
app.use("/api", routes);

const PORT = 3000;

// Main
async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
sequelize.sync();
main();
