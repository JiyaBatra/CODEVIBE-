const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const notesController = require("../../controller/notesController");

router.get("/", verifyToken, notesController.getNotes);
router.post("/", verifyToken, notesController.createNote);
router.put("/:id", verifyToken, notesController.updateNote);
router.delete("/:id", verifyToken, notesController.deleteNote);

module.exports = router;
