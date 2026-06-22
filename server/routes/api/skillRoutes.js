const express = require("express");
const Router = express.Router();
const { listSkills, seedSkills } = require("../../controller/skillController");

Router.get("/", listSkills);
Router.post("/seed", seedSkills);

module.exports = Router;
