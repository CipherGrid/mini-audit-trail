import express from "express";
import { getVersions, saveVersion } from "../controller/version.controller.js";

const router = express.Router();

// GET /versions
router.get("/versions", getVersions);

// POST /save-version
router.post("/save-version", saveVersion);

export default router;
