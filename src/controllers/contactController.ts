import { Request, Response } from "express";
import { Contact } from "../models/contact";


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


export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting contact messages");
  }
};


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


export const replyToMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { replied } = req.body;
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
