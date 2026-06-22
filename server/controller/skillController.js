const Skill = require("../models/Skill");
const { searchSkills, getAllSkills, COMMON_SKILLS } = require("../utils/skills");

const listSkills = async (req, res) => {
  try {
    const { search } = req.query;

    if (search) {
      const results = searchSkills(search);
      return res.json({ success: true, skills: results });
    }

    const dbSkills = await Skill.find({}).lean();
    if (dbSkills.length > 0) {
      return res.json({ success: true, skills: dbSkills.map((s) => s.name) });
    }

    return res.json({ success: true, skills: getAllSkills() });
  } catch (err) {
    console.error("Skill list error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const seedSkills = async (req, res) => {
  try {
    const existing = await Skill.countDocuments();
    if (existing > 0) {
      return res.json({ success: true, message: "Skills already seeded" });
    }

    await Skill.insertMany(COMMON_SKILLS);
    res.status(201).json({ success: true, message: "Skills seeded successfully" });
  } catch (err) {
    console.error("Skill seed error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { listSkills, seedSkills };
