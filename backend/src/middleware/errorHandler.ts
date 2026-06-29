import { Request, Response } from "express";
import multer from "multer";

export function errorHandler(err: Error, req: Request, res: Response) {
  console.error(err.message);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: err.message,
    });
  }

  if (err.message === "Unexpected end of form") {
    return res.status(400).json({
      error: "Malformed multipart/form-data request.",
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
}
