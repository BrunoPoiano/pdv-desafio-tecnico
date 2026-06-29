import { Router } from "express";

const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json({
    message: "backend is healthy",
    app: process.env.APP_VERSION,
    node: process.version,
  });
});

export default apiRouter;
