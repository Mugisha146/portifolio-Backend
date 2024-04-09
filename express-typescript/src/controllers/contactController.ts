import { Request, Response } from "express";
import { Contact } from "../models/contact";

// Create a new contact message
export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating contact message");
  }
};

// Get all contact messages
export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting contact messages");
  }
};

// Get a single contact message by ID
export const getMessageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await Contact.findById(id);
    if (!message) {
      return res.status(404).send("Message not found");
    }
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting contact message");
  }
};

// Reply to a contact message
export const replyToMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { replied } = req.body; // ID of the admin who replied
    const message = await Contact.findByIdAndUpdate(
      id,
      { replied },
      { new: true }
    );
    if (!message) {
      return res.status(404).send("Message not found");
    }
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error replying to contact message");
  }
};

// Delete a contact message
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).send("Message not found");
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting contact message");
  }
};
