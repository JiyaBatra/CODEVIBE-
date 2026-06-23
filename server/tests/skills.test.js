const {
  normalizeSkill,
  validateAndNormalizeSkills,
  searchSkills,
  getAllSkills,
} = require("../utils/skills");

describe("Skills Utility", () => {
  describe("normalizeSkill", () => {
    test("should return null for empty input", () => {
      expect(normalizeSkill("")).toBeNull();
      expect(normalizeSkill(null)).toBeNull();
      expect(normalizeSkill(undefined)).toBeNull();
    });

    test("should normalize exact match (case-insensitive)", () => {
      expect(normalizeSkill("javascript")).toBe("JavaScript");
      expect(normalizeSkill("JAVASCRIPT")).toBe("JavaScript");
      expect(normalizeSkill("JavaScript")).toBe("JavaScript");
    });

    test("should normalize common aliases", () => {
      expect(normalizeSkill("js")).toBe("JavaScript");
      expect(normalizeSkill("reactjs")).toBe("React");
      expect(normalizeSkill("node")).toBe("Node.js");
      expect(normalizeSkill("c++")).toBe("C++");
      expect(normalizeSkill("golang")).toBe("Go");
    });

    test("should return unrecognized skill as-is", () => {
      expect(normalizeSkill("SomeRareSkill")).toBe("SomeRareSkill");
    });
  });

  describe("validateAndNormalizeSkills", () => {
    test("should handle string input with commas", () => {
      const result = validateAndNormalizeSkills("js, react, python");
      expect(result).toEqual(["JavaScript", "React", "Python"]);
    });

    test("should handle array input", () => {
      const result = validateAndNormalizeSkills(["js", "react", "python"]);
      expect(result).toEqual(["JavaScript", "React", "Python"]);
    });

    test("should remove duplicates", () => {
      const result = validateAndNormalizeSkills(["js", "JavaScript", "JS"]);
      expect(result).toEqual(["JavaScript"]);
    });

    test("should filter out empty entries", () => {
      const result = validateAndNormalizeSkills("js, , react,");
      expect(result).toEqual(["JavaScript", "React"]);
    });

    test("should return empty array for null/undefined", () => {
      expect(validateAndNormalizeSkills(null)).toEqual([]);
      expect(validateAndNormalizeSkills(undefined)).toEqual([]);
    });
  });

  describe("searchSkills", () => {
    test("should return all skills for empty query", () => {
      const results = searchSkills("");
      expect(results).toEqual(getAllSkills());
    });

    test("should find skills by name", () => {
      const results = searchSkills("react");
      expect(results).toContain("React");
      expect(results).toContain("React");
    });

    test("should find skills by alias", () => {
      const results = searchSkills("golang");
      expect(results).toContain("Go");
    });

    test("should return empty array for no match", () => {
      const results = searchSkills("xyznonexistent");
      expect(results).toEqual([]);
    });
  });

  describe("getAllSkills", () => {
    test("should return all skill names", () => {
      const skills = getAllSkills();
      expect(skills).toContain("JavaScript");
      expect(skills).toContain("Python");
      expect(skills).toContain("React");
      expect(skills.length).toBeGreaterThan(30);
    });
  });
});
