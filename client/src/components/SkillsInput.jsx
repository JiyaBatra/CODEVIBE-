import React, { useState, useEffect, useCallback } from "react";
import { AutoComplete, Tag, Input } from "antd";
import axios from "axios";
import API_BASE_URL from "../config/api";

const SkillsInput = ({ value = [], onChange }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchSkills = useCallback(async (query) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/skills`, {
        params: { search: query || "" },
      });
      if (data.success) {
        return data.skills;
      }
    } catch {
      // fall through to empty
    }
    return [];
  }, []);

  const handleSearch = useCallback(async (value) => {
    setInputValue(value);
    if (!value.trim()) {
      const all = await fetchSkills("");
      setOptions(all.map((s) => ({ value: s, label: s })));
      return;
    }
    const results = await fetchSkills(value);
    setOptions(results.map((s) => ({ value: s, label: s })));
  }, [fetchSkills]);

  useEffect(() => {
    handleSearch("");
  }, [handleSearch]);

  const handleSelect = (skill) => {
    if (!value.includes(skill)) {
      onChange([...value, skill]);
    }
    setInputValue("");
  };

  const handleRemove = (skill) => {
    onChange(value.filter((s) => s !== skill));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      handleSelect(inputValue.trim());
    }
  };

  return (
    <div>
      <AutoComplete
        value={inputValue}
        options={options}
        onSearch={handleSearch}
        onSelect={handleSelect}
        onInputKeyDown={handleKeyDown}
        style={{ width: "100%" }}
      >
        <Input
          placeholder="Type a skill and press Enter or select from dropdown"
          allowClear
        />
      </AutoComplete>
      <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
        {value.map((skill) => (
          <Tag
            key={skill}
            closable
            onClose={() => handleRemove(skill)}
            style={{ margin: 0 }}
          >
            {skill}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;
