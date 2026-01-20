import express from "express";
import cors from "cors";
import stocksRouter from "./routes/stocks";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/stocks", stocksRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
