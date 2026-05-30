# Dynamic Lesson & Course Creation Guide

This guide details how to construct new curriculum modules on CodeVibe.

## 1. Lesson Schema
Lessons are defined dynamically as React components or database entries.
Ensure each course contains:
- `title`: Name of lesson module.
- `initialCode`: Starter template visible in editor.
- `expectedOutput`: Function, RegExp, or raw string check blocks.

## 2. Best Practices
- Never duplicate preexisting lesson objectives.
- Provide descriptive user hints to aid troubleshooting.
