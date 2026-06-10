const router = require("express").Router();
const { completeSession, getTodaySessions } = require("../../controller/studySessionController");

router.post("/complete", completeSession);
router.get("/today", getTodaySessions);

module.exports = router;
