import { Router } from "express";
import { StationCSVController } from "../../controller/station/StationCSVController";
import { CheckCsv } from "../../middleware/csv/check";
import multer from "multer";
import { asyncHandler } from "../../middleware/asyncHandler";

const stationCsvRouter = Router();
const upload = multer({
  dest: "upload/csv",
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

stationCsvRouter.post(
  "/",
  upload.single("file"),
  CheckCsv,
  asyncHandler(StationCSVController.import),
);

stationCsvRouter.get("/download", asyncHandler(StationCSVController.download));

export default stationCsvRouter;
