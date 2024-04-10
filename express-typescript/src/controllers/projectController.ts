//src/controlller/projectController.ts;

import { Request, Response } from "express";
import Project, { ProjectDocument } from "../models/Project";

// Create a new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, image } = req.body;
    const project = new Project({ name, description, image });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const { name, description, image } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { name, description, image },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
