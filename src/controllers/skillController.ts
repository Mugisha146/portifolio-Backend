// src/controllers/skillController.ts

import { Request, Response } from "express";
import Skill from "../models/Skill";

// Create a new skill
export const createSkill = async (req: Request, res: Response) => {
  try {
    const { name, percentage } = req.body;
    const skill = new Skill({ name, percentage });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all skills
export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a skill by ID
export const getSkillById = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json(skill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a skill
export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { name, percentage } = req.body;
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, percentage },
      { new: true }
    );
    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json(updatedSkill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a skill
export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
