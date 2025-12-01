import express from "express";
import cors from "cors";
import "dotenv/config";
import versionsRouter from "./routes/version.js";

const app = express();

const corsOptions = {
  origin: [process.env.CLIENT_ORIGIN, "https://localhost:5173"],
};

app.use(express.json({ limit: "16kb" }));
app.use(cors(corsOptions));
app.use("/", versionsRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
