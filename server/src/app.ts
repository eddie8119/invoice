import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(routes);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
